import { serializeToYaml, parseYaml, isValidYaml } from '@/utils/yaml';
import { CanvasData } from '@/types';
import { DEFAULT_DATA } from '@/constants';

// Mock js-yaml
jest.mock('js-yaml', () => ({
  dump: jest.fn((obj) => {
    return `meta:\n  title: ${obj.meta.title}\n  caption: ${obj.meta.caption}\nblocks: {}`;
  }),
  load: jest.fn((str) => {
    if (str.includes('invalid')) {
      throw new Error('Invalid YAML');
    }
    return {
      meta: { title: 'Test', caption: 'Test Caption', logoUrl: '' },
      blocks: {
        problem: [{ title: 'Test Note', body: 'Test Body', color: 'yellow' }],
      },
    };
  }),
}));

describe('serializeToYaml', () => {
  it('returns a string', () => {
    const result = serializeToYaml(DEFAULT_DATA);
    expect(typeof result).toBe('string');
  });

  it('includes meta title in output', () => {
    const result = serializeToYaml(DEFAULT_DATA);
    expect(result).toContain(DEFAULT_DATA.meta.title);
  });

  it('includes meta caption in output', () => {
    const result = serializeToYaml(DEFAULT_DATA);
    expect(result).toContain(DEFAULT_DATA.meta.caption);
  });
});

describe('parseYaml', () => {
  it('returns updated data with parsed notes', () => {
    const yamlStr = 'valid yaml';
    const result = parseYaml(yamlStr, DEFAULT_DATA);
    expect(result).not.toBeNull();
    expect(result?.blocks.problem.notes).toHaveLength(1);
    expect(result?.blocks.problem.notes[0].title).toBe('Test Note');
  });

  it('returns null for invalid YAML', () => {
    const result = parseYaml('invalid yaml content', DEFAULT_DATA);
    expect(result).toBeNull();
  });

  it('preserves block structure from existing data', () => {
    const yamlStr = 'valid yaml';
    const result = parseYaml(yamlStr, DEFAULT_DATA);
    expect(result?.blocks.suppliers).toBeDefined();
    expect(result?.blocks.solution).toBeDefined();
  });

  it('generates new IDs for parsed notes', () => {
    const yamlStr = 'valid yaml';
    const result = parseYaml(yamlStr, DEFAULT_DATA);
    const note = result?.blocks.problem.notes[0];
    expect(note?.id).toBeDefined();
    expect(note?.id.length).toBeGreaterThan(0);
  });
});

describe('isValidYaml', () => {
  it('returns true for valid YAML', () => {
    expect(isValidYaml('valid: yaml')).toBe(true);
  });

  it('returns false for invalid YAML', () => {
    expect(isValidYaml('invalid yaml content')).toBe(false);
  });
});
