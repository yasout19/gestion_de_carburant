import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './login_stuff/Login';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProfilePage from './pages/ProfilePage';
import Register from './login_stuff/Register';
import Reset from './login_stuff/Reset';
import User from './login_stuff/User';
import Web_site from './pages/Home';

// ----------------------------------------------------------------------

export default function Router() {
  const logged=Boolean(window.localStorage.getItem("logged"));
  const routes = useRoutes([
    { path: '', 
      element:  logged? <User/>:<Web_site/>,
      children: [
        {element: <Navigate to="" />, index: true },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'Profile', element: <ProfilePage/> },
      ],
    },
    {
      path: 'login',
      element: logged? <User/>:<LoginPage />,
    },
    {
      path: 'register',
      element: logged? <User/>:<Register/>,
    },
    {
      path: 'reset',
      element: logged? <User/>:<Reset/>,
    },
    {
      path: 'user',
      element: <User/>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);



  return routes;
}
