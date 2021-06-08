import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, IconButton }from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Edit, Delete, ShoppingCart} from '@material-ui/icons';
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    // maxWidth: 400
    // marginLeft: '10%',
    // marginRight: '10%'
  },
});

export function ProductDetailComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showActions, setShowActions] = useState(false);

  const showActionButtons = () => {
    setShowActions(true);
  }

  const hideActionButtons = () => {
    setShowActions(false);
  }

  const openEditModal = () => {
    dispatch({type: 'EDITADD_MODAL', payload: {editIndex: props.productIndex,isEdit:true,showEditModal:true}  });
  }

  // const openDeleteModal = () => {
  //   dispatch({type: 'DELETE_MODAL', payload: {deleteIndex: props.productIndex,showDeleteModal: true}  });
  // }

  return (
    <Card className={classes.root} onMouseOver={showActionButtons} onMouseLeave={hideActionButtons} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Products"
          height="140"
          image={props.category.image}
          title={props.category.name}
        />
        <CardContent>
          <Grid container >
            <Grid item xs={6}  >
            <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
            </Grid>
            <Grid item xs={6} style={{paddingTop: 5}} >
              <Typography  component="h4">
              INR {props.price}
            </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {showActions && 
       (<CardActions>
          <IconButton aria-label="edit" onClick={openEditModal} >
                <Edit color="primary" />
            </IconButton>
            <IconButton aria-label="delete" >
                <Delete color="secondary" />
            </IconButton>
      </CardActions>)}
    </Card>
  );
}

export default ProductDetailComponent;
