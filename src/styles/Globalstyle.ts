import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
   ${reset}
   *{
      box-sizing:border-box;
   }
   body{
      background-color:#ffffff;
      font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
   }
   a{
      color: inherit;
      text-decoration : none;
      cursor: pointer;
   }
`;
