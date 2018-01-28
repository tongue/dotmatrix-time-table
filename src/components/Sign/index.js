// @flow

import React from 'react';
import { createComponent } from 'react-fela';
import { ratioSizePx } from './../../utils/math';
import { linearGradient } from './../../utils/cssFunctions';
import defaultTheme from './../../theme/defaultTheme';

const Sign = createComponent(
  ({ color = defaultTheme.color.fallback, baseWidth, theme }) => ({
    margin: 0,
    borderStyle: 'solid',
    borderWidth: ratioSizePx(2, baseWidth),
    borderColor: theme.color.black,
    paddingTop: ratioSizePx(24, baseWidth),
    paddingBottom: ratioSizePx(12, baseWidth),
    fontSize: ratioSizePx(36, baseWidth),
    color: theme.color.white,
    backgroundImage: linearGradient('to bottom', [
      [color, '0%'],
      [color, '13%'],
      [theme.color.gunPowder, '13%'],
      [theme.color.gunPowder, '100%']
    ]),
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    ...theme.typography.heading
  }),
  'h1'
);

type Props = {
  children: string,
  color: string,
  baseWidth: number
};

export default (props: Props) => <Sign {...props} />;
