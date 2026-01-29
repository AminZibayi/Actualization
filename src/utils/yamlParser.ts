import yaml, { YAMLException } from 'js-yaml';
import { CanvasData, YamlError, YamlParseResult } from '@/types';
import { BLOCK_IDS } from '@/constants';
import { generateId } from './helpers';
import { CanvasYamlSchema, VALID_BLOCK_IDS, ParsedCanvasYaml } from './yamlSchema';

/**
 * Find the line number for a given path in YAML text
 * e.g., "blocks.problem[0].color" -> line number
 */
function findLineForPath(yamlText: string, path: string): number {
  const lines = yamlText.split('\n');
  const pathParts = path.split('.');

  let currentIndent = 0;
  let lineNum = 1;

  for (const part of pathParts) {
    // Handle array notation like "problem[0]"
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    const searchKey = arrayMatch ? arrayMatch[1] : part;

    for (let i = lineNum - 1; i < lines.length; i++) {
      const line = lines[i];
      const lineIndent = line.search(/\S/);

      // Check if this line contains our key at approximately the right indent level
      if (lineIndent >= currentIndent) {
        const keyPattern = new RegExp(`^\\s*-?\\s*${searchKey}\\s*:`);
        if (keyPattern.test(line) || line.trim().startsWith(`- ${searchKey}:`)) {
          lineNum = i + 1;
          currentIndent = lineIndent + 2;
          break;
        }
        // For array items, look for the dash
        if (arrayMatch && line.trim().startsWith('-')) {
          const arrayIndex = parseInt(arrayMatch[2], 10);
          let dashCount = 0;
          for (let j = i; j < lines.length; j++) {
            if (lines[j].trim().startsWith('-') && lines[j].search(/\S/) === lineIndent) {
              if (dashCount === arrayIndex) {
                lineNum = j + 1;
                currentIndent = lineIndent + 2;
                break;
              }
              dashCount++;
            }
          }
          break;
        }
      }
    }
  }

  return lineNum;
}

/**
 * Convert Zod error path to string
 */
function zodPathToString(path: (string | number)[]): string {
  return path
    .map((p, i) => {
      if (typeof p === 'number') {
        return `[${p}]`;
      }
      return i === 0 ? p : `.${p}`;
    })
    .join('');
}

/**
 * Parse YAML with full diagnostics including Zod validation and linting
 */
export function parseYamlWithDiagnostics(
  yamlText: string,
  existingData: CanvasData
): YamlParseResult {
  const errors: YamlError[] = [];

  // Step 1: Parse YAML syntax
  let rawParsed: unknown;
  try {
    rawParsed = yaml.load(yamlText);
  } catch (e) {
    if (e instanceof YAMLException) {
      errors.push({
        line: e.mark?.line ? e.mark.line + 1 : 1,
        column: e.mark?.column,
        message: e.reason || 'Invalid YAML syntax',
        severity: 'error',
      });
    } else {
      errors.push({
        line: 1,
        message: 'Failed to parse YAML',
        severity: 'error',
      });
    }
    return { success: false, data: null, errors };
  }

  // Empty or non-object YAML
  if (!rawParsed || typeof rawParsed !== 'object') {
    return { success: true, data: existingData, errors: [] };
  }

  // Step 2: Validate with Zod schema
  const zodResult = CanvasYamlSchema.safeParse(rawParsed);

  if (!zodResult.success) {
    for (const issue of zodResult.error.issues) {
      const pathArray = issue.path.map((p) => (typeof p === 'symbol' ? String(p) : p)) as (
        | string
        | number
      )[];
      const path = zodPathToString(pathArray);
      errors.push({
        line: findLineForPath(yamlText, path),
        message: `${issue.message}`,
        severity: 'error',
        path,
      });
    }
    // Try to continue with partial data if possible
  }

  const parsed = (zodResult.success ? zodResult.data : rawParsed) as ParsedCanvasYaml;

  // Step 3: Lint - check for unknown block IDs (warnings)
  if (parsed.blocks) {
    for (const blockId of Object.keys(parsed.blocks)) {
      if (!VALID_BLOCK_IDS.has(blockId)) {
        errors.push({
          line: findLineForPath(yamlText, `blocks.${blockId}`),
          message: `Unknown block ID "${blockId}". Valid blocks: ${BLOCK_IDS.join(', ')}`,
          severity: 'warning',
          path: `blocks.${blockId}`,
        });
      }
    }
  }

  // Step 4: Build the merged data
  try {
    const newBlocks = { ...existingData.blocks };

    if (parsed.blocks) {
      for (const [key, notes] of Object.entries(parsed.blocks)) {
        if (newBlocks[key] && Array.isArray(notes)) {
          newBlocks[key] = {
            ...newBlocks[key],
            notes: notes.map((n) => ({
              id: generateId(),
              title: n.title || '',
              body: n.body || '',
              color: n.color || 'yellow',
            })),
          };
        }
      }
    }

    // Carefully merge meta to avoid type incompatibilities
    const parsedMeta = parsed.meta;
    const mergedData: CanvasData = {
      ...existingData,
      meta: parsedMeta
        ? {
            ...existingData.meta,
            title: parsedMeta.title ?? existingData.meta.title,
            caption: parsedMeta.caption ?? existingData.meta.caption,
            logoUrl: parsedMeta.logoUrl ?? existingData.meta.logoUrl,
            canvasSize: parsedMeta.canvasSize ?? existingData.meta.canvasSize,
            backgroundPattern: parsedMeta.backgroundPattern ?? existingData.meta.backgroundPattern,
            noteColumns: parsedMeta.noteColumns ?? existingData.meta.noteColumns,
          }
        : existingData.meta,
      blocks: newBlocks,
    };

    return {
      success: errors.filter((e) => e.severity === 'error').length === 0,
      data: mergedData,
      errors,
    };
  } catch {
    errors.push({
      line: 1,
      message: 'Failed to merge parsed data',
      severity: 'error',
    });
    return { success: false, data: null, errors };
  }
}

/**
 * Quick check if YAML is syntactically valid
 */
export function isValidYamlSyntax(str: string): boolean {
  try {
    yaml.load(str);
    return true;
  } catch {
    return false;
  }
}
