import { matrixShape } from './dotmatrix';

describe('matrixShape should:', () => {
  it('have a radius of', () => {
    const shape = matrixShape();
    expect(shape.pixel.radius).toEqual(10);
  });
});
