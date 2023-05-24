import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import axios from 'axios';
import { Icon } from '@iconify/react';
import reloadIcon from '@iconify-icons/mdi/reload';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  users:PropTypes.array,
  alerts:PropTypes.func,
  reload:PropTypes.func,
  selec:PropTypes.func,
};



export default function UserListToolbar({ numSelected, filterName, onFilterName,users,alerts,reload,selec}) {
  
  const deleteusers=()=>{
    if(window.confirm("do you want to delete")){
    axios.post("http://localhost:4000/deletecars",{data:users}).then(res=>{if(res.data.status==="ok"){alerts(users);selec();reload();}else alert(res.data.message);}).catch(err=>{console.log(err)})
  }}
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
           value={filterName}
          onChange={onFilterName}
          placeholder="Search car..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteusers}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Reaload cars">
          <IconButton onClick={()=>{reload()}}>
          <Icon icon={reloadIcon} />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
