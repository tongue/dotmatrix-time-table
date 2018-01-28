import React from 'react';
import { createComponent } from 'react-fela';

const Canvas = createComponent(
  ({ width, height, theme }) => ({
    width,
    height,
    backgroundColor: theme.color.black
  }),
  'canvas',
  ['width', 'height']
);

type Props = {
  width: number | string,
  height: number | string,
  innerRef?: Function
};

export default (props: Props) => <Canvas {...props} />;
