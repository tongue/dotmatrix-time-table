import React, { Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import createRenderer from './createFelaRenderer';
import createFontRenderer from './createFontRenderer';

// should be from another file. Use this to drive theme config.
import defaultTheme from './../theme/defaultTheme';

// Use the below function to customize dev/prod mode plugins
const felaRenderer = createRenderer();

class StyleProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    renderer: PropTypes.object
  };

  static defaultProps = {
    theme: defaultTheme,
    renderer: null
  };

  render() {
    // props can contain a passed renderer. Useful for SSR.
    const { children, theme, renderer, ...otherProps } = this.props;
    const child = Children.only(children);
    // render all the fonts
    createFontRenderer(renderer || felaRenderer, theme);

    const content = isValidElement(child)
      ? cloneElement(child, { ...otherProps })
      : child;

    return (
      <FelaProvider renderer={renderer || felaRenderer}>
        <ThemeProvider theme={theme}>{content}</ThemeProvider>
      </FelaProvider>
    );
  }
}

export default StyleProvider;
