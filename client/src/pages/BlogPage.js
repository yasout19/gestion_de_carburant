import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Paper, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { filter } from 'lodash';
// mock

import axios from 'axios';
import { useEffect,useState } from 'react';
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
    const dateA = new Date(a[0].createdAt);
    const dateB = new Date(b[0].createdAt);
    return comparator(dateA, dateB);
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


// -------------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'oldest', label: 'Oldest' },
  { value: 'latest', label: 'Latest' },
];
const NOTIFICATIONS = [
  {
    name: "wait",
    email:"wait",
    message:"wait",
    isUnRead: false,
    createdAt:"",
  },
  
];
// ----------------------------------------------------------------------

export default function BlogPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [search, setsearch] = useState("");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filtrednotifications, setFiltredNotifications] = useState(NOTIFICATIONS);
  useEffect(() => {
      axios.get("http://localhost:4000/notification")
        .then(res => {
          setNotifications(res.data);
        })
        .catch(err => {
          console.log(err);
        });
   
  }, []);
  const handlesearch = (event) => {
    setsearch(event.target.value);
  };
  const handlereverse=()=>{
    const reversedNotifications = [...filtrednotifications].reverse(); // Reverse the filtered notifications array
    setFiltredNotifications(reversedNotifications); // Update the state with the reversed array
  }
  useEffect(() => {
    const sortedAndFilteredNotifications = applySortFilter(notifications, getComparator(order, orderBy), search);
    setFiltredNotifications(sortedAndFilteredNotifications); // Update the state with the sorted and filtered array
  }, [notifications, order, orderBy, search]);
  const isNotFound = !filtrednotifications.length && !!search;
 

  return (
    <>
      <Helmet>
        <title> Notifications</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            feedbacks
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch filterName={search} onFilterName={handlesearch} />
          <BlogPostsSort options={SORT_OPTIONS} onSort={handlereverse}/>
        </Stack>

        <Grid container spacing={3}>
          {filtrednotifications.map((post, index) => (
            <BlogPostCard key={post._id} post={post} index={index} />
          ))}
        </Grid>
        {isNotFound&&(<Paper
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
                        </Paper>)}
      </Container>
    </>
  );
}
