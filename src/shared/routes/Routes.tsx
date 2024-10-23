import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import UserManagementPage from '../../features/management-user/containers/management-user/UserManagementPage';
import DashboardPage from '../../features/dashboard/containers/dashboard/DashboardPage';
import ManagementNewsFeed from '../../features/management-news-feed/containers/management-news-feed/ManagementNewsFeed';
import DetailNewsFeed from '../../features/management-news-feed/containers/detail-news-feed/DetailNewsFeed';
import ProfilePost from '../../features/management-user/containers/profile/personal-page/ProfilePost';
import Profile from '../../features/management-user/containers/profile/Profile';
import ProfileCollection from '../../features/management-user/containers/profile/personal-collection/ProfileCollection';
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
          <ManagementNewsFeed />
        </PrivateRoute>
      ),
    },
    {
      path: '/detail-news-feed/:id',
      element: (
        <PrivateRoute>
          <DetailNewsFeed />
        </PrivateRoute>
      ),
    },
    {
      path: '/profile/:userID',
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
      children: [
        {
          path: '',
          element: <ProfilePost />,
        },
        {
          path: 'personal-collection',
          element: <ProfileCollection />,
        },
      ],
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
