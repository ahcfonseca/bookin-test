import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --primary-color: #7d3eb3;
  --primary-color-light: #cf97c1;
  --primary-color-dark: #5a2884;
  --secondary-color: #801c70;
  --secondary-color-light: #b48ead;
  --background-color: #262e3c;
  --background-color-light: #f2eeee;
  --text-color: #2e3440;
  --white: #fff;
}

body {
    background-color: var(--background-color);
    margin: 0;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }

  input, select {
    font-family: "Inter", sans-serif;
  }
`;

export default GlobalStyles;
