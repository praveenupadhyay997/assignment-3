import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${({ theme }) => theme.spacings.md};
    line-height: 1.2;
  }

  h1 {
    ${({ theme }) => css(theme.typography.h1)};
  }

  h2 {
    ${({ theme }) => css(theme.typography.h2)};
  }

  h3 {
    ${({ theme }) => css(theme.typography.h3)};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacings.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding: 0;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.default};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.divider};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;
