import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Books from '@/pages/Books';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        // element: <BookDetails />,
      },
      {
        path: '/add-book',
        // element: <PrivateRoute>{/* <AddBook /> */}</PrivateRoute>,
        // element: <AddBook/>
      },
      {
        path: '/edit-book',
        // element: <PrivateRoute>{/* <EditBook /> */}</PrivateRoute>,
        // element: <EditBook/>
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
