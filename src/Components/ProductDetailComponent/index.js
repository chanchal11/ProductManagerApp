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

export function ProductDetailComponent() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Products"
          height="140"
          image="https://www.bpimaging.com/assets/uploads/2015/02/11897_096.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
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
