import { z } from 'zod/v4';
import { BLOCK_IDS } from '@/constants';

/**
 * Valid note colors
 */
export const NoteColorSchema = z.enum(['yellow', 'blue', 'green', 'pink', 'red']);

/**
 * Valid canvas sizes
 */
export const CanvasSizeSchema = z.enum(['A4', 'A3', 'A2', 'A1']);

/**
 * Note schema - each note in a block
 */
export const NoteSchema = z.object({
  title: z.string().default(''),
  body: z.string().default(''),
  color: NoteColorSchema.default('yellow'),
});

/**
 * Block schema - array of notes
 */
export const BlockSchema = z.array(NoteSchema).default([]);

/**
 * Canvas fonts schema
 */
export const FontsSchema = z
  .object({
    canvasTitle: z.string().optional(),
    canvasCaption: z.string().optional(),
    blockTitle: z.string().optional(),
    noteTitle: z.string().optional(),
    noteBody: z.string().optional(),
  })
  .optional();

/**
 * Advanced settings schema
 */
export const AdvancedSchema = z
  .object({
    exportScale: z.number().min(0.1).max(10).optional(),
  })
  .optional();

/**
 * Meta schema - canvas metadata
 */
export const MetaSchema = z.object({
  title: z.string().default(''),
  caption: z.string().default(''),
  logoUrl: z.string().default(''),
  canvasSize: CanvasSizeSchema.optional(),
  backgroundPattern: z.string().optional(),
  noteColumns: z.number().min(1).max(4).optional(),
  fonts: FontsSchema,
  advanced: AdvancedSchema,
});

/**
 * Blocks schema - record of block ID to notes
 */
export const BlocksSchema = z.record(z.string(), BlockSchema).optional();

/**
 * Main canvas YAML schema
 */
export const CanvasYamlSchema = z.object({
  meta: MetaSchema.optional(),
  blocks: BlocksSchema,
});

/**
 * Valid block IDs as a Set for quick lookup
 */
export const VALID_BLOCK_IDS = new Set<string>(BLOCK_IDS);

/**
 * Type inference from schema
 */
export type ParsedCanvasYaml = z.infer<typeof CanvasYamlSchema>;
export type ParsedNote = z.infer<typeof NoteSchema>;
export type ParsedMeta = z.infer<typeof MetaSchema>;
