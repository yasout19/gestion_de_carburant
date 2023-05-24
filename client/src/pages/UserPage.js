import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import {  Modal } from 'react-bootstrap';
import { yellow} from '@mui/material/colors';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
 import 'bootstrap/dist/css/bootstrap.min.css';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'age', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const[USER,SETUSER]=useState([]);
  const [open, setOpen] = useState("");
  const [Age, setage] = useState("");
  const [Email, setemail] = useState("");
  const [Nom, setnom] = useState("");
  const [Role, setrole] = useState("");
  const [upage, setupage] = useState("");
  const [upemail, setupemail] = useState("");
  const [upnom, setupnom] = useState("");
  const [uprole, setuprole] = useState("");
  const [Pwd, setpwd] = useState("");
  const[show,setShow]=useState("");
  const[showupdate,setShowupdate]=useState("");
  const[em,setem]=useState("");
  const[show2,setShow2]=useState(false);
  const [page, setPage] = useState(0);
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState([]);


  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  
  const [search, setsearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(()=>{
    axios.get("http://localhost:4000/users").then(res=>{SETUSER(res.data)}).catch(err=>{console.log(err)})
}, [])
const reloadusers=()=>{
  axios.get("http://localhost:4000/users").then(res=>{SETUSER(res.data)}).catch(err=>{console.log(err)})
}
  const USERLIST=USER && USER.map((data)=>({
    id:data.id,
    email:data.email,
    name:data.name,
    age:data.age,
    role:data.role,
    image:data.image,
  }))

  const handleOpenMenu = (event) => {
    handleCloseupdate();
    handleclose2();
    handleClose();
    setOpen(event.currentTarget);
  };
  const clearvar=()=>{
    setemail("");
    setnom("");
    setpwd("");
    setrole("user");
    setage("");
  }
  const handleCloseMenu = () => {
    setOpen("");
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handlesearch = (event) => {
    setPage(0);
    setsearch(event.target.value);
    console.log(event.target.value);
  };
    const handleShow   = () => {
      clearvar();
    setShow(true);
  };
  const handleClose = () => {
    setShow("");
  };
  const handleShow2  = () => {
    handleCloseMenu();
    setTimeout(() => {
      setShow2(true);
    }, 100);
   
  };
  const handleclose2 = () => {
    setShow2(false);


  };
  const handleShowupdate = () => {
    handleCloseMenu();
    setTimeout(() => {
      setShowupdate(true);
    }, 100); // Delay in milliseconds
  };
  const handleCloseupdate = () => {
    setShowupdate("");

  };
  const createuser=()=>{
    axios.post('http://localhost:4000/createuser',{name:Nom,email:Email,pwd:Pwd,age:Age,role:Role,}).then(res=>{if(res.data.status==="ok"){setalert2(true);reloadusers()}else alert(res.data.msg);}).catch(err=>{console.log(err)})
  }
  const deleteuser=()=>{
    axios.post(`http://localhost:4000/deleteuser`,{email:em}).then(res=>{if(res.data.status==="ok"){setalert1(em);reloadusers()}else alert("somthing went wrong");}).catch(err=>{console.log(err);})
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), search);

  const isNotFound = !filteredUsers.length && !!search;
  const deletee=(eml)=>{
    setem(eml);
  }
  const setup=(nm,em,rl,ag)=>{
    setupemail(em);
    setupage(ag);
    setupnom(nm);
    setuprole(rl);
  }
  const updateuser=()=>{
    axios.post("http://localhost:4000/updateuser",{email1:em,name:upnom,email:upemail,age:upage,role:uprole,}).then(res=>{if(res.data.status==="ok"){setalert3(true);reloadusers()}else{alert("something went wrong");}}).catch(err=>{console.log(err)})
  }
  const handlealert4=(value)=>{
    setalert4(value);
  }
  const cancelselec=()=>{
    setSelected([]);
  }
  return (
    <>
      <Helmet>
        <title> Users </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User 
          </Typography>
          <Button variant="contained" style={{width:'100px', }} onClick={handleShow}>New User</Button>
        </Stack>
        <Box sx={{ width: '100%' }}>
          
      <Collapse in={alert1}>
        <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert1(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          
        >
         user having email:"{alert1}" is deleted 
        </Alert>
      </Collapse>
      <Collapse in={alert2}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert2(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         user created successfully
        </Alert>
      </Collapse>
      <Collapse in={alert3}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert3(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         user updated successfully
        </Alert>
      </Collapse>
      <Collapse in={alert4.length}>
        <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               setalert4([]);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          
        >
         users having email:{alert4.join('| ')} deleted 
        </Alert>
      </Collapse>
    </Box>
           <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form>
                    <div class="mb-3">
                        <label  class="form-label">nom</label>
                        <input type="text" class="form-control" onChange={e=>setnom(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">email</label>
                        <input type="text" class="form-control" onChange={e=>setemail(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">password</label>
                        <input type="text" class="form-control" onChange={e=>setpwd(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">age</label>
                        <input type="text" class="form-control" onChange={e=>setage(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                      <select class="form-control" onChange={e=>setrole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose();createuser();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer>
          </Modal>
        <Modal show={show2} onHide={handleclose2} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body >
             <p>are you sure you want to delete user having email : {em}</p>   
           </Modal.Body>
           <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleclose2();deleteuser();}}> Yes  </Button>
                <Button variant="contained" color="error" onClick={handleclose2}> Close </Button>
           </Modal.Footer>
          </Modal>
          <Modal show={showupdate} onHide={handleCloseupdate} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">update user</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form>
                    <div class="mb-3">
                        <label  class="form-label">nom</label>
                        <input type="text" class="form-control" value={upnom} onChange={e=>setupnom(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">email</label>
                        <input type="text" class="form-control" value={upemail} onChange={e=>setupemail(e.target.value)} disabled/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">age</label>
                        <input type="text" class="form-control" value={upage} onChange={e=>setupage(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                      <select class="form-control" value={uprole} onChange={e=>setuprole(e.target.value)}>
                         <option value="user">User</option>
                          <option value="admin">Admin</option>
                      </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleCloseupdate();updateuser();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleCloseupdate}> Close </Button>
           </Modal.Footer>
          </Modal>
          <UserListToolbar numSelected={selected.length} filterName={search} onFilterName={handlesearch} users={selected} alerts={handlealert4} reload={reloadusers} selec={cancelselec}/>
          <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name,email,role, image, age} = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={image} />
                            <Typography variant="subtitle2" noWrap>
                            {name?name:<Label color={'default'}>{sentenceCase("vide")}</Label>}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role?role:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell align="left">
                        {age?age:<Label color={'default'}>{sentenceCase("vide")}</Label>}
                        </TableCell>
                        <TableCell align="right" onClick={()=>{deletee(email);setup(name,email,role,age);}}>
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}> 
                            <Iconify icon={'eva:more-vertical-fill'}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{search}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={()=>handleShowupdate()}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={()=>{handleShow2();}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
