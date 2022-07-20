import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StaticWrapper from './Routes/StaticWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StaticWrapper>
      <App />
    </StaticWrapper>
  </React.StrictMode>
);
