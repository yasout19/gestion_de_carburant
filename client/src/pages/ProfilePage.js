import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import DashboardLayout from '../layouts/dashboard';
import { AccountProfile } from '../sections/@dashboard/account/Account-profile';
import { AccountProfileDetails} from '../sections/@dashboard/account/Account-profile-details';
import axios from 'axios';
import { useState,useEffect } from 'react';
const ProfilePage = () => {
  const [name,setname]=useState("");
  useEffect(()=>{
    axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(res=>{setname(res.data.name)}).catch(err=>{console.log(err)})
  },[]);
  return(
  <>
    <Helmet>
      <title> Profile | {name}   </title>
    </Helmet>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);
    }
ProfilePage.getLayout = (ProfilePage) => (
  <DashboardLayout>
    {ProfilePage}
  </DashboardLayout>
);

export default ProfilePage;