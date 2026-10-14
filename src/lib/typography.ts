/**
 * Typography System — Auto-generated from Figma text styles.
 *
 * Every token maps 1-to-1 with a Figma text style.
 * CSS utility classes are defined in globals.css as `text-<token-key>`
 * (e.g. `text-hero-title`, `text-h1-bold`).
 */

export interface TypographyToken {
  /** Display name from Figma */
  name: string;
  /** CSS class name (use in className) */
  className: string;
  /** font-size in rem */
  fontSize: string;
  /** font-size in px (original Figma value) */
  fontSizePx: number;
  /** unitless line-height (e.g. 1.4) */
  lineHeight: number;
  /** CSS font-weight */
  fontWeight: number;
}

export const typographyTokens = {
  // ── Hero ──────────────────────────────────────────
  'hero-title':        { name: 'Hero title',          className: 'text-hero-title',        fontSize: '3.9625rem',  fontSizePx: 63.4, lineHeight: 1.06, fontWeight: 400 },

  // ── H1 ───────────────────────────────────────────
  'h1':                { name: 'H1',                  className: 'text-h1',                fontSize: '3rem',       fontSizePx: 48,   lineHeight: 1.4,  fontWeight: 400 },
  'h1-bold':           { name: 'H1 Bold',             className: 'text-h1-bold',           fontSize: '3rem',       fontSizePx: 48,   lineHeight: 1.25, fontWeight: 700 },
  'h1-semibold':       { name: 'H1 SemiBold',         className: 'text-h1-semibold',       fontSize: '3rem',       fontSizePx: 48,   lineHeight: 1.25, fontWeight: 600 },
  'h1-medium':         { name: 'H1 Medium',           className: 'text-h1-medium',         fontSize: '3rem',       fontSizePx: 48,   lineHeight: 1.25, fontWeight: 500 },

  // ── H2 ───────────────────────────────────────────
  'h2':                { name: 'H2',                  className: 'text-h2',                fontSize: '2.5rem',     fontSizePx: 40,   lineHeight: 1.4,  fontWeight: 400 },
  'h2-bold':           { name: 'H2 Bold',             className: 'text-h2-bold',           fontSize: '2.5rem',     fontSizePx: 40,   lineHeight: 1.4,  fontWeight: 700 },
  'h2-semibold':       { name: 'H2 SemiBold',         className: 'text-h2-semibold',       fontSize: '2.5rem',     fontSizePx: 40,   lineHeight: 1.4,  fontWeight: 600 },
  'h2-medium':         { name: 'H2 Medium',           className: 'text-h2-medium',         fontSize: '2.5rem',     fontSizePx: 40,   lineHeight: 1.4,  fontWeight: 500 },

  // ── H3 ───────────────────────────────────────────
  'h3':                { name: 'H3',                  className: 'text-h3',                fontSize: '2.0625rem',  fontSizePx: 33,   lineHeight: 1.4,  fontWeight: 400 },
  'h3-bold':           { name: 'H3 Bold',             className: 'text-h3-bold',           fontSize: '2.0625rem',  fontSizePx: 33,   lineHeight: 1.4,  fontWeight: 700 },
  'h3-semibold':       { name: 'H3 SemiBold',         className: 'text-h3-semibold',       fontSize: '2.0625rem',  fontSizePx: 33,   lineHeight: 1.4,  fontWeight: 600 },
  'h3-medium':         { name: 'H3 Medium',           className: 'text-h3-medium',         fontSize: '2.0625rem',  fontSizePx: 33,   lineHeight: 1.4,  fontWeight: 500 },

  // ── H4 ───────────────────────────────────────────
  'h4':                { name: 'H4',                  className: 'text-h4',                fontSize: '1.75rem',    fontSizePx: 28,   lineHeight: 1.4,  fontWeight: 400 },
  'h4-bold':           { name: 'H4 Bold',             className: 'text-h4-bold',           fontSize: '1.75rem',    fontSizePx: 28,   lineHeight: 1.4,  fontWeight: 700 },
  'h4-semibold':       { name: 'H4 SemiBold',         className: 'text-h4-semibold',       fontSize: '1.75rem',    fontSizePx: 28,   lineHeight: 1.25, fontWeight: 600 },
  'h4-medium':         { name: 'H4 Medium',           className: 'text-h4-medium',         fontSize: '1.75rem',    fontSizePx: 28,   lineHeight: 1.4,  fontWeight: 500 },

  // ── H5 ───────────────────────────────────────────
  'h5-semibold':       { name: 'H5 SemiBold',         className: 'text-h5-semibold',       fontSize: '1.4375rem',  fontSizePx: 23,   lineHeight: 1.4,  fontWeight: 600 },
  'h5-medium':         { name: 'H5 Medium',           className: 'text-h5-medium',         fontSize: '1.4375rem',  fontSizePx: 23,   lineHeight: 1.4,  fontWeight: 500 },

  // ── Title 19px ───────────────────────────────────
  'title-1':           { name: 'Title 1',             className: 'text-title-1',           fontSize: '1.1875rem',  fontSizePx: 19,   lineHeight: 1.4,  fontWeight: 400 },
  'title-7-bold':      { name: 'Title 7 Bold',        className: 'text-title-7-bold',      fontSize: '1.1875rem',  fontSizePx: 19,   lineHeight: 1.4,  fontWeight: 700 },
  'title-5-semibold':  { name: 'Title 5 SemiBold',    className: 'text-title-5-semibold',  fontSize: '1.1875rem',  fontSizePx: 19,   lineHeight: 1.4,  fontWeight: 600 },
  'title-3-medium':    { name: 'Title 3 Medium',      className: 'text-title-3-medium',    fontSize: '1.1875rem',  fontSizePx: 19,   lineHeight: 1.4,  fontWeight: 500 },

  // ── Title 16px ───────────────────────────────────
  'title-2':           { name: 'Title 2',             className: 'text-title-2',           fontSize: '1rem',       fontSizePx: 16,   lineHeight: 1.4,  fontWeight: 400 },
  'title-8-bold':      { name: 'Title 8 Bold',        className: 'text-title-8-bold',      fontSize: '1rem',       fontSizePx: 16,   lineHeight: 1.4,  fontWeight: 700 },
  'title-6-semibold':  { name: 'Title 6 SemiBold',    className: 'text-title-6-semibold',  fontSize: '1rem',       fontSizePx: 16,   lineHeight: 1.4,  fontWeight: 600 },
  'title-4-medium':    { name: 'Title 4 Medium',      className: 'text-title-4-medium',    fontSize: '1rem',       fontSizePx: 16,   lineHeight: 1.4,  fontWeight: 500 },

  // ── Body 14px ────────────────────────────────────
  'body':              { name: 'Body',                className: 'text-body',              fontSize: '0.875rem',   fontSizePx: 14,   lineHeight: 1.4,  fontWeight: 400 },
  'body-bold':         { name: 'Body Bold',           className: 'text-body-bold',         fontSize: '0.875rem',   fontSizePx: 14,   lineHeight: 1.4,  fontWeight: 700 },
  'body-semibold':     { name: 'Body SemiBold',       className: 'text-body-semibold',     fontSize: '0.875rem',   fontSizePx: 14,   lineHeight: 1.4,  fontWeight: 600 },
  'body-medium':       { name: 'Body Medium',         className: 'text-body-medium',       fontSize: '0.875rem',   fontSizePx: 14,   lineHeight: 1.4,  fontWeight: 500 },

  // ── Caption 11px ─────────────────────────────────
  'caption':           { name: 'Caption',             className: 'text-caption',           fontSize: '0.6875rem',  fontSizePx: 11,   lineHeight: 1.4,  fontWeight: 400 },
  'caption-bold':      { name: 'Caption Bold',        className: 'text-caption-bold',      fontSize: '0.6875rem',  fontSizePx: 11,   lineHeight: 1.4,  fontWeight: 700 },
} as const satisfies Record<string, TypographyToken>;

export type TypographyKey = keyof typeof typographyTokens;

/**
 * Ordered groups for the preview page and documentation.
 */
export const typographyGroups: { group: string; keys: TypographyKey[] }[] = [
  { group: 'Hero',            keys: ['hero-title'] },
  { group: 'H1',              keys: ['h1', 'h1-bold', 'h1-semibold', 'h1-medium'] },
  { group: 'H2',              keys: ['h2', 'h2-bold', 'h2-semibold', 'h2-medium'] },
  { group: 'H3',              keys: ['h3', 'h3-bold', 'h3-semibold', 'h3-medium'] },
  { group: 'H4',              keys: ['h4', 'h4-bold', 'h4-semibold', 'h4-medium'] },
  { group: 'H5',              keys: ['h5-semibold', 'h5-medium'] },
  { group: 'Title (19px)',    keys: ['title-1', 'title-7-bold', 'title-5-semibold', 'title-3-medium'] },
  { group: 'Title (16px)',    keys: ['title-2', 'title-8-bold', 'title-6-semibold', 'title-4-medium'] },
  { group: 'Body (14px)',     keys: ['body', 'body-bold', 'body-semibold', 'body-medium'] },
  { group: 'Caption (11px)',  keys: ['caption', 'caption-bold'] },
];
