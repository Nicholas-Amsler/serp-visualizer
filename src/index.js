import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// ⬇️ Swap App for LandingPage
import LandingPage from './LandingPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

reportWebVitals();

