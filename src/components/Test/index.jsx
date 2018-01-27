// @flow

import React from 'react';
import { createComponent } from 'react-fela';

export type Props = {
  primary?: boolean,
  children: string
};

const test = ({ primary }: Props) => ({
  color: primary ? 'hotpink' : 'maroon'
});
const Test = createComponent(test);

export default ({ primary, children }: Props) => (
  <Test primary={primary}>{children}</Test>
);
