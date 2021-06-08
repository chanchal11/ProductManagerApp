import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getProductDetailsAPI } from '../../API';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1 
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    paddingRight: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ProductDetailReducer.products);
  const loading = useSelector((state) => state.ProductDetailReducer.loading);

  const debounceSearch = useRef(
    debounce(searchTerm => {
      dispatch({ type: "PRODUCT_SET_LOADING" });
      dispatch({ type: "PRODUCT_SET_LAST_SEARCH", payload: {lastSearchString: searchTerm } });
      getProductDetailsAPI(searchTerm,1, products.limit).then((result)=> {
          //console.log(searchTerm,result.data);
          if(result.status == 200){
              dispatch({ type: "PRODUCT_SET_RESULTS", payload: result.data });
              dispatch({ type: "PRODUCT_RESET_LOADING" });
          }
          dispatch({ type: "PRODUCT_RESET_LOADING" });
      }).catch((error)=>{
        dispatch({ type: "PRODUCT_RESET_LOADING" });
      });
    }, 500)
  );

  useEffect(
    () => {
      if (searchTerm) {
        debounceSearch.current(searchTerm);
      }else{
        debounceSearch.current('');
      }
    },
    [searchTerm]
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Product Manager
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress /> }
    </div>
  );
}
