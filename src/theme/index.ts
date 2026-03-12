/**
 * Estilos base compartidos: colores, tipografía, espaciado.
 * Agnóstico; variantes por país pueden sobreescribir si hace falta.
 */
export const colors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#820AD1',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  x2: 8,
  x3: 12,
  x4: 16,
  x5: 20,
  x6: 24,
} as const;

/** Padding horizontal del nav/top bar (Figma: 32). */
export const navPaddingHorizontal = 32;
/** Espacio entre ícono back y dropdown (Figma: 77.5). */
export const headerBackToDropdownGap = 77.5;
/** Padding vertical del contenedor del header (Figma: 10). */
export const headerRowPaddingVertical = 10;
/** Altura del área del header/nav en Figma (content 375 x 108). */
export const headerContentHeight = 108;

/** Fuentes Graphik — tipografía del design system Nu. */
export const fonts = {
  /** Título / Display – Medium 500 */
  display: 'Graphik-Medium',
  /** Cuerpo / Text – Regular 400 */
  text: 'Graphik-Regular',
  /** Labels / Semibold 600 */
  label: 'Graphik-Semibold',
} as const;
