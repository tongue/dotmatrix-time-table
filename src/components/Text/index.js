// @flow

import React from 'react';
import { renderMatrix } from './../../utils/dotmatrix';
import { ratioSizePx } from './../../utils/math';
import Canvas from './../Canvas';

type TextProps = {
  baseWidth: number,
  children: string
};

type TextState = {
  width: number,
  height: number
};

class Text extends React.Component<TextProps, TextState> {
  el: ?HTMLCanvasElement = null;

  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    this.updateDimensions();
  }

  componentWillUpdate() {
    this.updateDimensions();
  }

  componentDidUpdate() {
    if (this.el) {
      const { children } = this.props;
      const { width, height } = this.state;
      renderMatrix({
        context: this.el.getContext('2d'),
        text: children,
        width,
        height
      });
    }
  }

  updateDimensions() {
    const { baseWidth } = this.props;
    if (this.state.width !== baseWidth) {
      this.setState({
        width: baseWidth,
        height: ratioSizePx(64, baseWidth)
      });
    }
  }

  render() {
    const { height, width } = this.state;

    return (
      <Canvas width={width} height={height} innerRef={ref => (this.el = ref)} />
    );
  }
}

export default Text;
