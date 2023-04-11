import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
 
  export const AccountProfile = () => {
    const [user,setuser]=useState("");
    useEffect(()=>{
      axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(res=>{setuser(res.data)}).catch(err=>{console.log(err)})
    },[]);
    return(
      <div>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.role} {user.country}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card></div>
  );
  }