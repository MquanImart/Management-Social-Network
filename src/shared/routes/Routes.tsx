import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import UserManagementPage from '../../features/management-user/containers/management-user/UserManagementPage';
import DashboardPage from '../../features/dashboard/containers/dashboard/DashboardPage';
import PostManagement from '../../features/management-news-feed/containers/post-management/PostManagement';
import ManagementGroups from '../../features/management-group/containers/group/ManagementGroups';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

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
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      ),
    },
    {
      path: '/management-user',
      element: (
        <PrivateRoute>
          <UserManagementPage />
        </PrivateRoute>
      ),
    },
    {
      path: '/management-news-feed',
      element: (
        <PrivateRoute>
          <PostManagement />
        </PrivateRoute>
      ),
    },
    {
      path: '/groups',
      element: (
        <PrivateRoute>
          <ManagementGroups />
        </PrivateRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
