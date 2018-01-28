// @flow

import React from 'react';
import Wrapper from './../Wrapper';
import Sign from './../Sign';
import Text from './../Text';

type State = {
  baseWidth: ?number
};

class Station extends React.Component<{}, State> {
  wrapper: ?HTMLDivElement = null;

  state = {
    baseWidth: null
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
      this.setState({
        baseWidth: parseInt(this.wrapper.clientWidth, 10)
      });
    }
  };

  render() {
    const { baseWidth } = this.state;

    return (
      <Wrapper innerRef={ref => (this.wrapper = ref)}>
        {baseWidth && (
          <div>
            <Sign baseWidth={baseWidth} color="#D63633">
              Östermalmstorg
            </Sign>
            <Text baseWidth={baseWidth}>A</Text>
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Station;
