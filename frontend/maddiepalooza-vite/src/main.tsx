import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure there is a DOM element with the ID 'root'.");
}
