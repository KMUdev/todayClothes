import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontColors: {
      [index: string]: string;
      primaryText: string;
      accentText: string;
      whiteText: string;
    };
    fontSizes: {
      [index: string]: string;
      base: string;
      lg: string;
      xl: string;
      xl2: string;
    };
  }
}
