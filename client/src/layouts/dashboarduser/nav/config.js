// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard2/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'cars',
    path: '/dashboard2/cars',
    icon: icon('ic_car'),
  },
  {
    title: 'trip',
    path: '/dashboard2/trip',
    icon: icon('ic_fuel'),
  },
  {
    title: 'profile',
    path: '/dashboard2/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'notification',
    path: '/dashboard2/notification',
    icon: icon('ic_notification'),
  },

  
];

export default navConfig;
