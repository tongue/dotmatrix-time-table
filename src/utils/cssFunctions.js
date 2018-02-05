// @flow

export const linearGradient = (
  directionOrAngle: string,
  colorStops: string[][]
) =>
  `linear-gradient(${directionOrAngle}, ${colorStops
    .map(stop => stop.join(' '))
    .join(',')})`;

export const rgba = (value: number[] | string, opacity: number = 1) => {
  let red;
  let green;
  let blue;

  if (Array.isArray(value)) {
    red = value[0];
    green = value = [1];
    blue = value = [2];
  } else {
    const isValidHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    if (!isValidHex.test(value)) {
      console.error(`Not a valid hex color: ${value}`);
      return;
    }
    const result = /^#?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/i.exec(
      value
    );
    red = parseInt(result[1], 16);
    green = parseInt(result[2], 16);
    blue = parseInt(result[3], 16);
  }

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
