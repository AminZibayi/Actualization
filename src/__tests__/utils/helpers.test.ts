import { generateId, getRandomRotation, deepClone } from '@/utils/helpers';

describe('generateId', () => {
  it('returns a string', () => {
    expect(typeof generateId()).toBe('string');
  });

  it('returns a 9-character string', () => {
    const id = generateId();
    expect(id.length).toBe(9);
  });

  it('returns unique values on multiple calls', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });

  it('contains only alphanumeric characters', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe('getRandomRotation', () => {
  it('returns a number', () => {
    expect(typeof getRandomRotation()).toBe('number');
  });

  it('returns values between -3 and 3 inclusive', () => {
    for (let i = 0; i < 100; i++) {
      const rotation = getRandomRotation();
      expect(rotation).toBeGreaterThanOrEqual(-3);
      expect(rotation).toBeLessThanOrEqual(3);
    }
  });

  it('returns integer values', () => {
    for (let i = 0; i < 50; i++) {
      const rotation = getRandomRotation();
      expect(Number.isInteger(rotation)).toBe(true);
    }
  });
});

describe('deepClone', () => {
  it('creates a new object reference', () => {
    const original = { a: 1 };
    const cloned = deepClone(original);
    expect(cloned).not.toBe(original);
  });

  it('clones nested objects', () => {
    const original = { a: { b: { c: 1 } } };
    const cloned = deepClone(original);
    expect(cloned.a.b.c).toBe(1);
    expect(cloned.a).not.toBe(original.a);
  });

  it('clones arrays', () => {
    const original = { items: [1, 2, 3] };
    const cloned = deepClone(original);
    expect(cloned.items).toEqual([1, 2, 3]);
    expect(cloned.items).not.toBe(original.items);
  });

  it('modifications to clone do not affect original', () => {
    const original = { a: 1, nested: { b: 2 } };
    const cloned = deepClone(original);
    cloned.a = 99;
    cloned.nested.b = 88;
    expect(original.a).toBe(1);
    expect(original.nested.b).toBe(2);
  });
});
