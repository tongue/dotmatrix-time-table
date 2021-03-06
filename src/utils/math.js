import theme from './../theme/defaultTheme';

export const ratioSizePx = (
  fontSize: number,
  currentWidth: number,
  referenceWidth: number = theme.referenceWidth
) => parseInt(fontSize / referenceWidth * currentWidth, 10);
