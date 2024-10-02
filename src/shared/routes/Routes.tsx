import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import UserManagementPage from '../../features/management-user/containers/management-user/UserManagementPage'
import DashboardPage from '../../features/dashboard/containers/dashboard/DashboardPage'
import ManagementNewsFeed from '../../features/management-news-feed/containers/management-news-feed/ManagementNewsFeed';
import DetailNewsFeed from '../../features/management-news-feed/containers/detail-news-feed/DetailNewsFeed';
const Routes = () => {

  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
        path: '/management-user',
        element: <UserManagementPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
    {
      path: '/management-news-feed',
      element: <ManagementNewsFeed />,
    },
    {
      path: '/detail-news-feed/:id',
      element: <DetailNewsFeed />,
   },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;