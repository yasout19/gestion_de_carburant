import PropTypes from 'prop-types';

// @mui
import { styled ,alpha} from '@mui/material/styles';
import { InputAdornment, Popper, OutlinedInput } from '@mui/material';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
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

export default function BlogPostsSearch({ filterName, onFilterName, }) {
  return (
    
      <StyledSearch
       value={filterName}
       onChange={onFilterName}
       placeholder="Search name ..."
       startAdornment={
         <InputAdornment position="start">
           <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
         </InputAdornment>
       }
     />
    
  );
}
