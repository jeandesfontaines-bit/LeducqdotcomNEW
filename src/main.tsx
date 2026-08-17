import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeMonitoring } from '@/utils/monitoring';
import './index.css';

// Initialize monitoring
initializeMonitoring({
  enabled: true,
  environment: import.meta.env.MODE,
});

creatRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
