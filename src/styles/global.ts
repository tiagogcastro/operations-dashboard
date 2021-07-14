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
    background: #F4F4F4;
    color: #334155;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, button {
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
    font-size: 1rem;
  }
  
  button, a {
    cursor: pointer;
    color: #F4F4F4;
  }
`