import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Layout from './Layout.jsx';
import StudentDashboard from './Pages/StudentDashboard.jsx';
import Login from './Pages/Login.jsx';
import Blog from './Pages/Blog.jsx';

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
      { path:"/", element: <StudentDashboard /> },
      {path: "/blog", element: <Blog />}
    ]
  },
       {
        path: "/login",
        element: <Login />
      }
]);

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
