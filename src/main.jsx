import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import StudentDashboard from './Pages/StudentDashboard.jsx';

const router = createBrowserRouter([
  { 
    path: "/",
    element: <StudentDashboard />,
    children: [
      { index: true, element: <StudentDashboard /> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
