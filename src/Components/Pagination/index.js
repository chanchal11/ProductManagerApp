import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import Pagination from '@material-ui/lab/Pagination';

import { getProductDetailsAPI } from '../../API';
import ProductDetailComponent from '../ProductDetailComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 500,
  },
  gridContainer: {
    // paddingLeft: "15px",
    // paddingRight: "15px",
    // paddingTop: "40px"
    padding: '2% 5% 2% 5%'
  },
  pagination: {
    display: 'contents' ,
    alignItems: 'center'
  }
}));

export default function CustomPaginationActionsTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ProductDetailReducer.products);
  const loading = useSelector((state) => state.ProductDetailReducer.loading);
  const searchItems = useSelector((state) => state.ProductDetailReducer.search);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch({ type: "PRODUCT_SET_LOADING" });
    // console.log('newpage=',newPage);
    getProductDetailsAPI(searchItems.lastSearchString,newPage, products.limit).then((result)=> {

        if(result.status == 200){
            dispatch({ type: "PRODUCT_SET_RESULTS", payload: result.data });
            dispatch({ type: "PRODUCT_RESET_LOADING" });
        }
        dispatch({ type: "PRODUCT_RESET_LOADING" });
    }).catch((error)=>{
      dispatch({ type: "PRODUCT_RESET_LOADING" });
    });
  };

  return (
    <center className={classes.root}>
          <Grid
           container
           spacing={2}
            className={classes.gridContainer}
           justify="center" >
          {!loading ? products.data.map((row,index) => 
             
                <Grid item xs={12} sm={6} md={4} key={uuidv4()} >
                  <ProductDetailComponent
                    productIndex={index}  
                    name={row.name} 
                    description={row.description}
                    // categoryName={row.categoryId && row.category.name ? row.category.name : '' }
                    expiryDate={row.expiryDate}
                    // image={row.categoryId && row.category.image ? row.category.image : '' }
                    category={row.category}
                    price={row.price}
                />
              </Grid>
          ) : <div></div> }
            {!loading ? <Grid item xs={12} sm={12} md={12} key={uuidv4()} className={classes.pagination} >
               <Pagination count={products.totalPages} page={page} onChange={handleChangePage}  />
            </Grid>: <div/>}
          </Grid>
                             
    </center>
  );
}
