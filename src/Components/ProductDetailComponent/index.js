import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, IconButton }from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Edit, Delete, ShoppingCart} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    // maxWidth: 400
    // marginLeft: '10%',
    // marginRight: '10%'
  },
});

export function ProductDetailComponent(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Products"
          height="140"
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="delete">
            <Edit color="primary" />
        </IconButton>
        <IconButton aria-label="delete">
            <Delete color="secondary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductDetailComponent;
