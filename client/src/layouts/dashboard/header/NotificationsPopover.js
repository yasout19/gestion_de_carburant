import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fToNow } from '../../../utils/formatTime';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
// import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    name: "",
    email:"",
    message:"",
    isUnRead: false,
    createdAt:"",
  },
  
];

export default function NotificationsPopover() {

  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:4000/notification")
        .then(res => {
          setNotifications(res.data.reverse());
        })
        .catch(err => {
          console.log(err);
        });
    }, 5000);
  
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);
  

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
    axios.post("http://localhost:4000/markread").catch(err=>{console.log(err)})
 
  };
  const markasread=(id)=>{
    axios.post("http://localhost:4000/markreadone",{id:id}).catch(err=>{console.log(err)})
  }

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            { notifications.filter((item) => item.isUnRead === true).map((notification) => (
              <Link to="http://localhost:3000/dashboard/blog" onClick={()=>{markasread(notification._id);setOpen(null);notification.isUnRead=false}}> <NotificationItem key={notification._id} notification={notification} /></Link>
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            { notifications.filter((item) => item.isUnRead === false).slice(0,3).map((notification) => (
              <Link to="http://localhost:3000/dashboard/blog" onClick={()=>{setOpen(null)}}><NotificationItem key={notification._id} notification={notification} /></Link>
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string,
    isUnRead: PropTypes.bool,
    name: PropTypes.string,
    email:PropTypes.string,
    message: PropTypes.string,
   
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
             <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
            
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
     you have message from {notification.name}:
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.message)}
      </Typography>
    </Typography>
  );
  return {avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,title:title};
}
