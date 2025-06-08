/**
 * src/colors.ts
 *
 * A built-in palette of colors for embeds.
 */
export const COLORS = {
  TEAL:   0x1ABC9C,
  RED:    0xE74C3C,
  BLUE:   0x3498DB,
  GREEN:  0x2ECC71,
  YELLOW: 0xF1C40F,
  PURPLE: 0x9B59B6,
  GRAY:   0x95A5A6,
} as const;

/** The palette keys (all uppercase). */
export type ColorName = keyof typeof COLORS;
