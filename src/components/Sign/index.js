// @flow

import React from 'react';
import { createComponent } from 'react-fela';
import { ratioSizePx } from './../../utils/math';
import defaultTheme from './../../theme/defaultTheme';

const Sign = createComponent(
  ({ color = defaultTheme.color.fallback, baseWidth, theme }) => ({
    ...theme.typography.heading,
    borderStyle: 'solid',
    borderWidth: ratioSizePx(2, baseWidth),
    borderColor: theme.color.black,
    paddingTop: ratioSizePx(24, baseWidth),
    paddingBottom: ratioSizePx(12, baseWidth),
    fontSize: ratioSizePx(48, baseWidth),
    color: theme.color.white,
    margin: 0,
    backgroundImage: `
			linear-gradient(
				to bottom,
				${color} 0%,
				${color} 13%,
				${theme.color.gunPowder} 13%,
				${theme.color.gunPowder} 100%
			)
		`,
    backgroundRepeat: 'no-repeat',
    textAlign: 'center'
  }),
  'h1'
);

type Props = {
  children: any,
  color: string,
  baseWidth: number
};

export default (props: Props) => <Sign {...props} />;
