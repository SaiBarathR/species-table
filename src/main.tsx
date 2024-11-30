// Import necessary modules from React and ReactDOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import the main App component and global CSS
import App from './App.tsx';
import './index.css';

// Create a root element and render the App component within StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
