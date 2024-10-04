import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import UserManagementPage from '../../features/management-user/containers/management-user/UserManagementPage'
import DashboardPage from '../../features/dashboard/containers/dashboard/DashboardPage'
import ManagementNewsFeed from '../../features/management-news-feed/containers/management-news-feed/ManagementNewsFeed';
import DetailNewsFeed from '../../features/management-news-feed/containers/detail-news-feed/DetailNewsFeed';
import ProfilePost from '../../features/management-user/containers/profile/personal-page/ProfilePost';
import Profile from '../../features/management-user/containers/profile/Profile';
import ProfileCollection from '../../features/management-user/containers/profile/personal-collection/ProfileCollection';
import ManagementGroups from '../../features/management-group/containers/group/ManagementGroups';
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
    {
      path: '/profile/:userID',
      element: <Profile />,
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
      element: <ManagementGroups />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;