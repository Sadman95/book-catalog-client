import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import AddBook from '@/pages/AddBook';
import PrivateRoute from './private';

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
        path: 'books',
        element: <Books />,
      },
      {
        path: 'book-details/:id',
        element: <BookDetails />,
      },
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
            <AddBook />{' '}
          </PrivateRoute>
        ),
      },
      {
        path: 'edit-book',
        // element: <PrivateRoute>{/* <EditBook /> */}</PrivateRoute>,
        // element: <EditBook/>
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
