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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {  Modal } from 'react-bootstrap';
 
  export const AccountProfile = () => {
    const [user,setuser]=useState("");
    const [show,setShow]=useState("");
    const [image,setimage]=useState("");
    const [open,setopen]=useState(false);
    useEffect(()=>{
      axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(res=>{setuser(res.data)}).catch(err=>{console.log(err)})
    },[]);
    const handleShow   = () => {
      setShow(true);
    };
    const handleClose = () => {
      setShow("");
    };
    const convertimage=(e)=>{
      console.log(e);
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=>{
        console.log(reader.result);
        setimage(reader.result);
      }
      reader.onerror =err=>{
        console.log(err);
      }
    }
    const uploadimage=()=>{
      axios.post("http://localhost:4000/uploadimage",{email:user.email,image:image}).then(res=>{if(res.data.status==="ok"){setopen(true);}else{alert("somthing went wrong");}}).catch(err=>{console.log(err);})
    }
    return(
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
        picture uploaded seccessfully reload the page or close this alert to see the changes
        </Alert>
      </Collapse>
    </Box>
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
            src={user.image}
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
          onClick={handleShow}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
    <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">choose your profile picture</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form>
                    <div class="mb-3">
                        
                        <input type='file' accept='image/*' class="form-control" onChange={convertimage} />
                        
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose();uploadimage();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer></Modal>
</div>

  );
  }