import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import AddBook from '@/pages/AddBook';
import PrivateRoute from './private';
import EditBook from '@/pages/EditBook';

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
        path: 'books/:id',
        element: <BookDetails />,
      },
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit-book/:id',
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
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
