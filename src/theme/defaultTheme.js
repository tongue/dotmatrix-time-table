export default {
  fonts: {
    Roboto: [
      {
        files: [
          'https://fonts.gstatic.com/s/roboto/v18/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2'
        ],
        options: {
          'font-style': 'normal',
          'font-weight': '700',
          localAlias: ['Roboto-Bold']
        }
      }
    ]
  },
  referenceWidth: 640,
  typography: {
    heading: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '700',
      fontStyle: 'normal'
    }
  },
  color: {
    white: '#ffffff',
    gunPowder: '#484652',
    black: '#000000',
    fallback: 'hotpink'
  },
  sign: {
    fontSizeRatio: 0.07,
    borderSizeRatio: 0.003
  }
};
