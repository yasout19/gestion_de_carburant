import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort }) {
  const[op,setop]=useState("oldest")
  return (
    <TextField select size="small" value={op} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} onClick={()=>{setop(option.value)}} >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
