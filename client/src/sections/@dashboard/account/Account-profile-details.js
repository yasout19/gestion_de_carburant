import { useCallback, useState,useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
const city = [
  {
    value: 'agadir',
    label: 'Agadir'
  },
  {
    value: 'rabat',
    label: 'Rabat'
  },
  {
    value: 'casa',
    label: 'Casa'
  },
  {
    value: 'tanger',
    label: 'Tanger'
  }
];

export const AccountProfileDetails = () => {
  const [open,setopen]=useState("")
  const [values, setValues] = useState({firstName: "  ",
    lastName: " ",
    email: " ",
    phone: 0,
    state: ' ',
    country:" ",});
  useEffect(()=>{
    axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(res=>{setValues({firstName: res.data.name,
    lastName: res.data.name,
    email: res.data.email,
    phone: res.data.phone,
    state: res.data.city,
    country: res.data.country,})}).catch(err=>{console.log(err);})
  },
  
  [])
  

  const handleChange = useCallback(
    (event) => {
      if(!event.target.disabled){
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));}
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );
  const update=()=>{
    axios.post("http://localhost:4000/updateadmin",{name:values.firstName,email:values.email,phone:values.phone,country:values.country,city:values.state}).then(res=>{if(res.data.status==="ok"){setopen(true);}else{ alert("something went wrong");}}).catch(err=>{console.log(err);})
  }

  return (
    <div>
       <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setopen(false);
                window.location.reload();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         user updated reload the page or close this alert to see the changes
        </Alert>
      </Collapse>
    </Box>
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  disabled
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select city"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {city.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={update}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form></div>
  );
};
