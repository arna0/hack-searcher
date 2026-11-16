import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {installBrowserServer} from './demo/browserServer';

// GitHub Pages has no server: run the API inside the browser (data stays in this browser).
const ready = import.meta.env.VITE_STATIC_DEMO === 'true' ? installBrowserServer() : Promise.resolve();

ready.finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
