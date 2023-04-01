import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import {  Modal } from 'react-bootstrap';
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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
 import 'bootstrap/dist/css/bootstrap.min.css';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import axios from 'axios';

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
  const [Age, setage] = useState([]);
  const [Email, setemail] = useState([]);
  const [Nom, setnom] = useState([]);
  const [Role, setrole] = useState([]);
  const [Pwd, setpwd] = useState([]);
  const[show,setShow]=useState("");
  const[em,setem]=useState("");
  const[show2,setShow2]=useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(()=>{
    axios.get("http://localhost:4000/users").then(res=>{SETUSER(res.data)}).catch(err=>{console.log(err)})
}, [])
console.log(USER);
  const USERLIST=USER && USER.map((data)=>({
    id:data.id,
    email:data.email,
    name:data.name,
    age:data.age,
    role:data.role,
  }))

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
    const handleShow   = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow("");
  };
  const handleShow2  = () => {
    setShow2(true);
  };
  const handleClose2 = () => {
    setShow2(false);

  };
  const createuser=()=>{
    axios.post('http://localhost:4000/createuser',{name:Nom,email:Email,pwd:Pwd,age:Age,role:Role,}).then(res=>{if(res.data.status==="ok"){alert("user created");window.location.reload();}else alert(res.data.msg);}).catch(err=>{console.log(err)})
  }
  const deleteuser=()=>{
    axios.post(`http://localhost:4000/deleteuser`,{email:em}).then(res=>{if(res.data.status==="ok"){alert("user deleted");window.location.reload()}else alert("somthing went wrong");}).catch(err=>{console.log(err);})
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const deletee=(eml)=>{
    setem(eml);
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
          <Button variant="contained" onClick={handleShow}>
            New User
          </Button>
        </Stack>
           <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '700px'}}>
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
                        <label class="form-label">role</label>
                        <input type="text" class="form-control" onChange={e=>setrole(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose();createuser();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer>
          </Modal>
          <Modal show={show2} onHide={handleClose2} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body >
             <p>are you sure you want to delete user having email : {em}</p>   
           </Modal.Body>
           <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose2();deleteuser();}}> Yes  </Button>
                <Button variant="contained" color="error" onClick={handleClose2}> Close </Button>
           </Modal.Footer>
          </Modal>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                    const { id, name,email,role, avatarUrl, age} = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{age}</TableCell>
                        <TableCell align="right" onClick={()=>{deletee(email)}}>
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
                            <strong>&quot;{filterName}&quot;</strong>.
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
        <MenuItem onClick={handleShow2}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={()=>{ handleCloseMenu();handleShow2();}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
