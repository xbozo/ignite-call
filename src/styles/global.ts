import { globalCss } from '@ignite-ui/react';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    WebkitFontSmoothing: 'antialiased',
  },

  /** Scroll Bar */
  '::-webkit-scrollbar': {
    width: '4px',
  },

  '::-webkit-scrollbar-thumb': {
    background: 'rgb(77, 77, 87)',
  },

  '::-webkit-scrollbar-thumb:hover': {
    background: '#bbb',
  },

  '::-webkit-scrollbar-track': {
    background: 'rgb(18, 18, 20)',
  },
});
