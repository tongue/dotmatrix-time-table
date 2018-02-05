// @flow

import CHARSET from './charset';
import { rgba } from './cssFunctions';

type matrixShapeType = {
  panel: {
    height: number,
    rows: number,
    cols: number,
    padding: number
  },
  pixel: {
    padding: number,
    radius: number,
    offset: number,
    distance: number
  },
  color: {
    on: string,
    off: string
  }
};

export const matrixShape = (
  height: number = 80,
  rows: number = 14,
  cols: number = 8,
  padding: number = 0
): matrixShapeType => {
  const pixelPadding = 0.15;

  const a = height / rows;
  const pixelRadius = (a - a * pixelPadding) / 2;
  const pixelOffset = pixelRadius;
  const pixelDistance = a;

  const on = '#ffae00';
  const off = rgba(on, 0.5);

  return {
    panel: {
      height,
      rows,
      cols,
      padding
    },
    pixel: {
      padding: pixelPadding,
      radius: pixelRadius,
      offset: pixelOffset,
      distance: pixelDistance
    },
    color: {
      on,
      off
    }
  };
};

type renderTextObject = {
  context: CanvasRenderingContext2D,
  text: string,
  height: number,
  width: number
};

export function renderMatrix({
  context,
  height,
  width,
  text
}: renderTextObject): number {
  const shape = matrixShape(height);

  context.clearRect(0, 0, width, height);

  const MAX_COLUMNS = 20;

  const CHARACTER_WIDTH = shape.pixel.distance * shape.panel.cols;

  let characters = [];
  for (let i = 0; i < MAX_COLUMNS; i++) {
    characters.push(text[i] || ' ');
  }

  for (let character = 0; character < characters.length; character++) {
    const char = CHARSET[characters[character] || CHARSET['?']];
    let x = CHARACTER_WIDTH * character + shape.pixel.distance;
    let y = shape.pixel.offset;

    for (let row = 0; row < char.length; row++) {
      for (
        let column = 0;
        column < char[row].length;
        column++, x += shape.pixel.distance
      ) {
        const state = char[row].charAt(column) === '.' ? 'on' : 'off';
        const obj = {
          character,
          row,
          column,
          x,
          y,
          state
        };
        renderPixel(context, shape, x, y, shape.color[state]);
      }

      x = CHARACTER_WIDTH * character + shape.pixel.distance;
      y += shape.pixel.distance;
    }
  }

  return 0;
}

export function renderPixel(
  context: CanvasRenderingContext2D,
  shape: matrixShapeType,
  x: number,
  y: number,
  state: string
): void {
  context.beginPath();
  context.arc(x, y, shape.pixel.radius, 0, 2 * Math.PI);
  context.fillStyle = state;
  context.fill();
  context.closePath();
}
