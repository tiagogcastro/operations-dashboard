import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    border: none;
    text-decoration: none;
    list-style: none;
    font-family: 'Roboto', sans-serif;
    font-size: 62.5%;
  }
  :root {
    --dark-blue: #081DB4;
    --semi-blue: #1690F4;
    --semi-white: #EFEFEF;
    --full-white: #FFFFFF;
    --dark-blue: #000000;
    --cyan: #23DEFF;
    --font-cyan-blue: #334155;
    --tomato: #FF6347;
  }

  #root {
    width: 100%;
    height: 100vh;
  }

  #close_dropdown {
    width: 100%;
    height: 100vh;
    position: absolute;
  }

  body {
    background: var(--semi-white);
    color: var(--font-cyan-blue);
    height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
   
  body, input, button {
    font-size: 1rem;
  }
  
  button, a {
    cursor: pointer;
    color: var(--semi-white);
  }

  .disabled {
    cursor: no-drop;
  }
`