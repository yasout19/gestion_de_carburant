import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboardadmin';
import DashboardLayout2 from './layouts/dashboarduser';
import SimpleLayout from './layouts/simple';
//
import NotificationPage from './pages/NotificationPage';
import TripPage from'./pages/TripPage';
import CarPage from './pages/CarPage';
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
  const admin=window.localStorage.getItem("admin")
  const routes = useRoutes([
    { path: '', 
      element:  logged? <User/>:<Web_site/>,
      children: [
        {element: <Navigate to="" />, index: true },
      ],
    },
    {
      path: '/dashboard',
      element: (admin==='true')?<DashboardLayout />:<Navigate to="/dashboard2" />,
      children: (admin==='true')?[
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'Profile', element: <ProfilePage/> },
      ]:[
        { element: <Navigate to="/dashboard2/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'cars', element: <CarPage /> },
        { path: 'trip', element: <TripPage /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'Profile', element: <ProfilePage/> },
      ],
    },
    {
      path: '/dashboard2',
      element: <DashboardLayout2 />,
      children: [
        { element: <Navigate to="/dashboard2/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'cars', element: <CarPage /> },
        { path: 'trip', element: <TripPage /> },
        { path: 'notification', element: <NotificationPage /> },
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
