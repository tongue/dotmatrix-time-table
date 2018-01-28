// @flow

import React from 'react';
import Sign from './../Sign';
import { createComponent } from 'react-fela';

const Wrapper = createComponent(
  () => ({
    display: 'block',
    width: '100%'
  }),
  'div'
);

type State = {
  width: ?number,
  height: ?number
};

class Station extends React.Component<{}, State> {
  wrapper: ?HTMLDivElement = null;
  ratio: number = 0.1875;

  state = {
    width: null,
    height: null
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (this.wrapper) {
      const width = this.wrapper.clientWidth;
      this.setState({
        width,
        height: width * this.ratio
      });
    }
  };

  render() {
    const { width, height } = this.state;

    return (
      <Wrapper innerRef={ref => (this.wrapper = ref)}>
        {width &&
          height && (
            <Sign baseWidth={width} color="#D63633">
              Östermalmstorg
            </Sign>
          )}
      </Wrapper>
    );
  }
}

export default Station;
