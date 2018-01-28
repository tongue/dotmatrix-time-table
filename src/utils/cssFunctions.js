// @flow

export const linearGradient = (
  directionOrAngle: string,
  colorStops: string[][]
) =>
  `linear-gradient(${directionOrAngle}, ${colorStops
    .map(stop => stop.join(' '))
    .join(',')})`;
