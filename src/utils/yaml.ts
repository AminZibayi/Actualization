import yaml from 'js-yaml';
import { CanvasData, Note } from '@/types';
import { generateId } from './helpers';

interface SimplifiedBlock {
  title: string;
  body: string;
  color: string;
}

interface SimplifiedData {
  meta: {
    title: string;
    caption: string;
    logoUrl: string;
  };
  blocks: Record<string, SimplifiedBlock[]>;
}

/**
 * Serialize CanvasData to YAML string
 */
export const serializeToYaml = (data: CanvasData): string => {
  const simpleObj: SimplifiedData = {
    meta: data.meta,
    blocks: Object.entries(data.blocks).reduce(
      (acc, [key, val]) => {
        acc[key] = val.notes.map((n) => ({
          title: n.title,
          body: n.body,
          color: n.color,
        }));
        return acc;
      },
      {} as Record<string, SimplifiedBlock[]>
    ),
  };
  return yaml.dump(simpleObj);
};

/**
 * Parse YAML string and merge with existing data
 */
export const parseYaml = (yamlString: string, existingData: CanvasData): CanvasData | null => {
  try {
    const parsed = yaml.load(yamlString) as SimplifiedData;

    if (!parsed || !parsed.blocks) {
      return null;
    }

    const newBlocks = { ...existingData.blocks };

    Object.keys(parsed.blocks).forEach((key) => {
      if (newBlocks[key]) {
        newBlocks[key] = {
          ...newBlocks[key],
          notes: Array.isArray(parsed.blocks[key])
            ? parsed.blocks[key].map((n) => ({
                id: generateId(),
                title: n.title || '',
                body: n.body || '',
                color: (n.color as Note['color']) || 'yellow',
              }))
            : [],
        };
      }
    });

    return {
      ...existingData,
      meta: { ...existingData.meta, ...parsed.meta },
      blocks: newBlocks,
    };
  } catch {
    return null;
  }
};

/**
 * Check if a string is valid YAML
 */
export const isValidYaml = (str: string): boolean => {
  try {
    yaml.load(str);
    return true;
  } catch {
    return false;
  }
};
