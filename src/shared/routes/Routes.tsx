import { RouterProvider, createBrowserRouter, useSearchParams } from 'react-router-dom';
import Login from '../../features/user-authentication/containers/login/Login';
import UserManagementPage from '../../features/management-user/containers/management-user/UserManagementPage'
import DashboardPage from '../../features/dashboard/containers/dashboard/DashboardPage'
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
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;