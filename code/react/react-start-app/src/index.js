import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ManagingState from "./page/ManagingState/ManagingState";
import EscapeHatches from "./page/EscapeHatches/EscapeHatches";
import Polling from "./page/agent/Polling";
import Performance from "./page/Performance/Performance";
import Pattern from './page/Pattern/Pattern';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'managing-state',
    element: <ManagingState />,
  },
  {
    path: 'escape-hatches',
    element: <EscapeHatches />,
  },
  {
    path: 'agent',
    element: <Polling />,
  },
  {
    path: 'performance',
    element: <Performance />,
  },
  {
    path: 'pattern',
    element: <Pattern />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
