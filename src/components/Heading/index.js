// @flow

import React from 'react';
import { createComponent } from 'react-fela';

const bgColor = '#484652';
const borderColor = '#000';

const heading = ({ lineColor }) => ({
  border: `2px solid ${borderColor}`,
  padding: '0.4875em 0 0.1625em',
  textAlign: 'center',
  fontSize: '5em',
  color: '#fff',
  margin: 0,
  background: `
		linear-gradient(
			to bottom,
			${lineColor} 0%,
			${lineColor} 13%,
			${bgColor} 13%,
			${bgColor} 100%
		)
	`,
  backgroundRepeat: 'no-repeat',
  fontWeight: 'normal',
  fontFamily: 'Roboto, sans-serif'
});

const Heading = createComponent(heading, 'h1');

type Props = {
  lineColor: string,
  children: any
};

export default ({ lineColor, children }: Props) => (
  <Heading lineColor={lineColor}>{children}</Heading>
);
