import "./scss/app.scss"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import Cart from './pages/Cart'
import NotFound from "./pages/NotFound"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
