// @flow

import React from 'react';
import { createComponent } from 'react-fela';

const Wrapper = createComponent(
  ({ theme }) => ({
    display: 'block',
    width: '100%',
    backgroundColor: theme.color.fallback,
    minHeight: 40
  }),
  'div'
);

type Props = {
  children?: React$Node,
  innerRef?: Function
};

export default (props: Props) => <Wrapper {...props} />;
