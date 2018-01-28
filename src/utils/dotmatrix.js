// @flow

import CHARSET from './charset';

export function hex2rgba(hex: string, opacity: number = 1): string {
  const result = /^#?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return ['rgba', '(', r, ',', g, ',', b, ',', opacity, ')'].join('');
}

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
  rows: number = 7,
  cols: number = 5,
  padding: number = 2
): matrixShapeType => {
  const intHeight = parseInt(height, 10);
  const intRows = parseInt(rows, 10);
  const intCols = parseInt(cols, 10);
  const intPadding = parseInt(padding, 10);

  const pixelPadding = 0.5;
  const pixelRadius = parseInt(
    height / (2 * (rows + 2 * padding)) - pixelPadding,
    10
  );
  const pixelOffset = parseInt(pixelPadding + pixelRadius, 10);
  const pixelDistance = parseInt(2 * pixelOffset, 10);

  const on = '#ffae00';
  const off = hex2rgba(on, 0.3);

  return {
    panel: {
      height: intHeight,
      rows: intRows,
      cols: intCols,
      padding: intPadding
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

export function renderPanel(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  realHeight: number
): void {
  const shape = matrixShape(height);

  context.clearRect(0, 0, width, realHeight);
  for (let x = shape.pixel.offset; x < width; x += shape.pixel.distance) {
    for (
      let y = shape.pixel.offset;
      y < realHeight;
      y += shape.pixel.distance
    ) {
      renderPixel(context, shape, x, y, shape.color.off);
    }
  }
}

type renderTextObject = {
  context: CanvasRenderingContext2D,
  text: string,
  width: number,
  height: number,
  frame?: number
};

export function renderMatrix({
  context,
  text,
  width,
  height,
  frame
}: renderTextObject): number {
  const shape = matrixShape(height);

  context.clearRect(0, 0, width, height);

  let pos = frame
    ? width - shape.pixel.distance * frame
    : shape.pixel.offset + shape.pixel.distance;
  let textX = pos;
  let textY = shape.pixel.offset;

  for (let x = shape.pixel.offset; x < width; x += shape.pixel.distance) {
    if (x === textX) {
      for (let i = 0; i < text.length; i++) {
        let char = CHARSET[text.charAt(i)] || CHARSET['?'];

        for (let j = 0; j < char.length; j++) {
          for (
            let k = 0;
            k < char[j].length && textX < width;
            k++, textX += shape.pixel.distance
          ) {
            if (char[j].charAt(k) === '.') {
              renderPixel(context, shape, textX, textY, shape.color.on);
            }
          }

          textX = pos;
          textY += shape.pixel.distance;
        }

        pos += shape.pixel.distance * (shape.panel.cols + 1);
        textX = pos;
        textY = shape.pixel.offset;
      }
      textX = -1;
    }
    for (let y = shape.pixel.offset; y < height; y += shape.pixel.distance) {
      renderPixel(context, shape, x, y, shape.color.off);
    }
  }

  const nextFrame = pos < 0 ? 0 : frame + 1;

  return nextFrame;
}

export function renderText({
  context,
  text,
  width,
  height,
  frame
}: renderTextObject): number {
  const shape = matrixShape(height);

  context.clearRect(0, 0, width, height);

  let pos = frame ? width - shape.pixel.distance * frame : shape.pixel.distance;
  let x = pos;
  let y = shape.pixel.offset;

  for (let i = 0; i < text.length; i++) {
    let char = CHARSET[text.charAt(i)] || CHARSET['?'];

    for (let j = 0; j < char.length; j++) {
      for (
        let k = 0;
        k < char[j].length && x < width;
        k++, x += shape.pixel.distance
      ) {
        if (char[j].charAt(k) === '.') {
          renderPixel(context, shape, x, y, shape.color.on);
        }
      }

      x = pos;
      y += shape.pixel.distance;
    }

    pos += shape.pixel.distance * (shape.panel.cols + 1);
    x = pos;
    y = shape.pixel.offset;
  }

  const nextFrame = pos < 0 ? 0 : frame + 1;

  return nextFrame;
}

function renderPixel(
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
