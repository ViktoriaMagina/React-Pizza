import './scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layouts/App';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import FullPizza from './pages/FullPizza';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'pizza/:id',
        element: <FullPizza />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>

);
