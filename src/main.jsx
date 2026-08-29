import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setup } from 'goober';
import { createGlobalStyles } from 'goober/global';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { theme } from './theme.js';

// goober needs React.createElement registered once at startup.
setup(React.createElement);

const GlobalStyles = createGlobalStyles`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: ${theme.font.body};
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { font-family: ${theme.font.heading}; margin: 0; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
`;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
