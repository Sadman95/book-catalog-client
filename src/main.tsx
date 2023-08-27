import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/index.tsx';
import './index.css';
import ReduxProvider from './redux/provider.tsx';
import { Toaster } from './components/ui/Toaster.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={routes} />
      <Toaster />
    </ReduxProvider>
  </React.StrictMode>
);
