import { DefaultTheme } from 'styled-components';

const Mytheme: DefaultTheme = {
  fontColors: {
    primaryText: `color: rgb(23, 23, 23)`,
    whiteText: `color: rgb(255, 255, 255)`,
    accentText: `color: rgb(247,201,83)`,
  },
  fontSizes: {
    base: `
        font-size: 1em; 
        font-weight: bold;
        line-height: 1.5em; 
    `,
    lg: `
        font-size: 1.125rem;
        font-weight: bold;
        line-height: 1.75rem;
    `,
    xl: `
        font-size: 1.375rem;
        font-weight: bold;
        line-height: 1.75rem;
    `,
    xl2: `
        font-size: 1.em;
        font-weight: bold;
        line-height: 2rem;
`,
  },
};

export { Mytheme };
