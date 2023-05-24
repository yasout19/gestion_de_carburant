import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { filter } from 'lodash'
import { sentenceCase } from 'change-case';
import { useState, useEffect} from 'react'
import Axios from 'axios'

// @mui
import {Card,Table,Stack,Paper,Button, Popover, Checkbox,TableRow, TableBody,TableCell,Container,Typography,IconButton,
TableContainer,TablePagination} from '@mui/material'
import { yellow} from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

import {  Modal } from 'react-bootstrap'
// components
import Label from '../components/label';
import Iconify from '../components/iconify'
import Scrollbar from '../components/scrollbar'
// sections
import { CarListHead, CarListToolbar } from '../sections/@dashboard/car'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'matricule', label: 'Matricule', alignRight: false },
  { id: 'marque', label: 'Marque', alignRight: false },
  { id: 'modele', label: 'Modele', alignRight: false },
  { id: "la_date_de_lassurance", label: "La date de l'assurance", alignRight: false },
  { id: "la_duree_de_lassurance", label: "La duree de l'assurance", alignRight: false },
  { id: 'type_de_carburent', label: 'Type de carburent', alignRight: false },
  { id: 'la_capacite_du_reservoir', label: 'La capacite du reservoir', alignRight: false },
  { id: "la_date_de_visite", label: "La date de la visite", alignRight: false },
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
    return filter(array, (_car) => _car.marque.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//-----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CarPage() {
  const [cars, setCars] = useState([]);
  const [matricule,setMatricule ] = useState("");
  const [marque,setMarque ] = useState("");
  const [modele,setModele ] = useState("");
  const [la_date_de_lassurance,setLa_date_de_lassurance ] = useState("");
  const [la_duree_de_lassurance,setLa_duree_de_lassurance ] = useState("");
  const [type_de_carburent,setType_de_carburent ] = useState("");
  const [la_capacite_du_reservoir,setLa_capacite_du_reservoir ] = useState("");
  const [la_date_de_visite,setLa_date_de_visite ] = useState("");
  const [open, setOpen] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('matricule');
  const [filterMarque, setFilterMarque] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [upNewMat,setUpNewMat] = useState()
  const [upOldMat,setUpOldMat] = useState()
  const [upMar,setUpMar] = useState()
  const [upMod,setUpMod] = useState()
  const [upAss_date,setUpAss_date] = useState()
  const [upAss_dur,setUpAss_dur] = useState()
  const [upType,setUpType] = useState()
  const [upRes,setUpRes] = useState()
  const [upVis,setUpVis] = useState()
  const [del_mat,setDel_mat] = useState()
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState([]);
  const [user_email, setuser_email] = useState("");

  //read car
  useEffect(() => {

    Axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")})
      .then(res => {
        setuser_email(res.data.email);
        console.log(res.data.email);
      Axios.post("http://localhost:4000/cars",{email:res.data.email})
      .then(res => {
        setCars(res.data)
      })})
  },[])
  const em=user_email;
  const reaload=()=>{ 
  Axios.post("http://localhost:4000/cars",{email:em})
  .then(res => {
    setCars(res.data)
  })}

  //create car
  const createCar = () => {
    Axios.post("http://localhost:4000/createCar",{
      matricule: matricule,
      marque: marque,
      modele: modele,
      la_date_de_lassurance: la_date_de_lassurance, 
      la_duree_de_lassurance: la_duree_de_lassurance,
      type_de_carburent: type_de_carburent,
      la_capacite_du_reservoir: la_capacite_du_reservoir,
      la_date_de_visite: la_date_de_visite,
      email:em,
    }).then(res => {
      if(res.data.status==="ok"){
      setalert2(true);reaload(); }
      else{alert(res.data.err);handleShow()}     
    })
  }
  const clearvar=()=>{
    setLa_duree_de_lassurance("")
    setLa_date_de_lassurance("")
    setModele("");
    setMarque("");
    setMatricule("");
    setType_de_carburent("");
    setLa_date_de_visite("");
    setLa_capacite_du_reservoir("");
  }
  //delete car
  const DeleteCar = () => {
    Axios.delete(`http://localhost:4000/deleteCar/${del_mat}`)
      .then(res => {
        if(res.data.status==="ok"){ 
          setalert1(true);
        reaload();}
      })  
      .catch(error => {
        if (error.response && error.response.status === 404) {
          alert('car not found');
        } else {
          console.log(error);
          alert('Error deleting Trip');
        }
      });
  }
  const deleteParametre = (Mat) => {
    setDel_mat(Mat)
  }

  //update car
  const updateCar = () => {
    Axios.post("http://localhost:4000/updateCar",{
      matricule1: upOldMat,
      matricule: upNewMat,
      marque: upMar,
      modele: upMod,
      la_date_de_lassurance: upAss_date, 
      la_duree_de_lassurance: upAss_dur,
      type_de_carburent: upType,
      la_capacite_du_reservoir: upRes,
      la_date_de_visite: upVis,
    }).then(res => {
      if(res.data.status==="ok"){
        setalert3(true);
        reaload();
      }
          
    })
  }
  const updateParametre = (old_mat,mar,mod,ass_date,ass_dur,type,res,vis) => {
    setUpOldMat(old_mat)
    setUpNewMat(old_mat)
    setUpMar(mar)
    setUpMod(mod)
    setUpAss_date(ass_date)
    setUpAss_dur(ass_dur)
    setUpType(type)
    setUpRes(res)
    setUpVis(vis)
  }


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleShow   = () => {
    clearvar();
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow1   = () => {
    handleCloseMenu();
    setTimeout(() => {
      setShow1(true);
    }, 100);
   
  };
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow2  = () => {
    handleCloseMenu();
    setTimeout(() => {
      setShow2(true);
    }, 100);
   
  };
  const handleClose2 = () => {
    setShow2(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cars.map((n) => n.matricule);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, marque) => {
    const selectedIndex = selected.indexOf(marque);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, marque);
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
  const handlealert4=(value)=>{
    setalert4(value);
  }

  const handleFilterByMarque = (event) => {
    setPage(0);
    setFilterMarque(event.target.value);
  };
  const cancelselec=()=>{
    setSelected([]);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  let filteredCars=[];
  if(cars &&cars.length){
   filteredCars = applySortFilter(cars, getComparator(order, orderBy), filterMarque);}
  else{
     filteredCars = [];
  }

  const isNotFound = !filteredCars.length && !!filterMarque;


  return (
    <>
      <Helmet>
        <title> Cars </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4"gutterBottom> 
            Car 
          </Typography>
          <Button variant="contained"  style={{width: "100px"}}  onClick={handleShow}> New Car </Button>
        </Stack>
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
         car having matricule "{del_mat}"  is deleted 
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
         car created successfully!
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
         car updated successfully!
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
         cars having matricule:{alert4.join('| ')} is deleted 
        </Alert>
      </Collapse>
          {/* create*/}
          <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a new car</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '700px'}}>
                <form>
                    <div class="mb-3">
                        <label  class="form-label">matricule</label>
                        <input type="text" class="form-control" onChange={e=>setMatricule(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">marque</label>
                        <input type="text" class="form-control" onChange={e=>setMarque(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">modele</label>
                        <input type="text" class="form-control" onChange={e=>setModele(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la date de lassurance</label>
                        <input type="date" class="form-control" onChange={e=>setLa_date_de_lassurance(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">la duree de lassurance (Month)</label>
                        <input type="text" class="form-control" onChange={e=>setLa_duree_de_lassurance(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">type de carburent</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="esence" onChange={e=>setType_de_carburent(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                        Essence
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  value="gazoil" onChange={e=>setType_de_carburent(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                        Gazoil
                        </label>
                      </div>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la capacite du reservoir</label>
                        <input type="text" class="form-control" onChange={e=>setLa_capacite_du_reservoir(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">La date de dernier visite</label>
                        <input type="date" class="form-control" onChange={e=>setLa_date_de_visite(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose() ; createCar();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer>
          </Modal>

          {/* update */}
          <Modal show={show2} onHide={handleClose2} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Update car</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '700px'}}>
                <form>
                    <div class="mb-3">
                        <label  class="form-label">matricule</label>
                        <input type="text" class="form-control" value={upNewMat}   onChange={e=>setUpNewMat(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">marque</label>
                        <input type="text" class="form-control" value={upMar} onChange={e=>setUpMar(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">modele</label>
                        <input type="text" class="form-control" value={upMod} onChange={e=>setUpMod(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la date de lassurance</label>
                        <input type="date" class="form-control" value={upAss_date} onChange={e=>setUpAss_date(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">la duree de lassurance</label>
                        <input type="text" class="form-control" value={upAss_dur} onChange={e=>setUpAss_dur(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">type de carburent</label>
                        <input type="text" class="form-control" value={upType} onChange={e=>setUpType(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la capacite du reservoir</label>
                        <input type="text" class="form-control" value={upRes} onChange={e=>setUpRes(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">La date de dernier visite</label>
                        <input type="date" class="form-control" value={upVis} onChange={e=>setUpVis(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose2() ; updateCar();}}> Save  </Button>
                <Button variant="contained" color="error"onClick={()=> {handleClose2(); }}> Close </Button>
           </Modal.Footer>
          </Modal>

          {/* delete */}
          <Modal show={show1} onHide={handleClose1} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '100px'}}>
              <Typography>Are you sure you want to delete this car having matricule :   "{del_mat}" </Typography>
            </Modal.Body>  
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose1();DeleteCar();}}> Yes  </Button>
                <Button variant="contained" color="error" onClick={()=> {handleClose1()}}> Close </Button>
            </Modal.Footer>
          </Modal>

        <Card>
          <CarListToolbar numSelected={selected.length} filterName={filterMarque} onFilterName={handleFilterByMarque} users={selected} alerts={handlealert4} reload={reaload} selec={cancelselec}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CarListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cars.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {modele, marque, matricule, type_de_carburent, la_date_de_lassurance,la_duree_de_lassurance,la_capacite_du_reservoir,la_date_de_visite } = row;
                    const selectedCar = selected.indexOf(matricule) !== -1;

                    return (
                      <TableRow hover key={matricule} tabIndex={-1} role="checkbox" selected={selectedCar}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedCar} onChange={(event) => handleClick(event, matricule)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="checkbox">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {matricule}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>{marque?marque:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell>{modele?modele:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell>{la_date_de_lassurance?la_date_de_lassurance:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell>{la_duree_de_lassurance?la_duree_de_lassurance:<Label color={'default'}>{sentenceCase("vide")}</Label>}  month</TableCell>

                        <TableCell>{type_de_carburent?type_de_carburent:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell>{la_capacite_du_reservoir?la_capacite_du_reservoir:<Label color={'default'}>{sentenceCase("vide")}</Label>}  L</TableCell> 

                      <TableCell>{la_date_de_visite?la_date_de_visite:<Label color={'default'}>{sentenceCase("vide")}</Label>}</TableCell>

                        <TableCell align="right" onClick={() => {deleteParametre(matricule); updateParametre(matricule,marque,modele,la_date_de_lassurance,la_duree_de_lassurance,type_de_carburent,la_capacite_du_reservoir,la_date_de_visite)}}>
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}> 
                            <Iconify icon={'eva:more-vertical-fill'} />
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
                            <strong>&quot;{filterMarque}&quot;</strong>.
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
            count={cars.length}
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

        <Button onClick={ () => {handleShow2(); handleCloseMenu();}}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </Button>

        <Button sx={{ color: 'error.main' }} onClick={ () => {handleShow1(); handleCloseMenu();}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}/>
          Delete
        </Button>
      </Popover>
    </>
  );
}