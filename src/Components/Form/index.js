import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAPI } from '../../API';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  }
}));

export default function Form(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ProductDetailReducer.loading);
  const [productName,setProductName] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  const [categoryImage,setCategoryImage] = useState('');
  const [price,setPrice] = useState('');  
  const [expiryDate,setExpiryDate] = useState('');  
  const [error,setError] = useState({productName:'',category:'',categoryImage: '',price: '',description: '', expiryDate: ''});
  const [showWarning,setShowWarning] = useState(false);
  const [warningMsg,setWarningMsg] = useState('');
  const [showSuccessMsg,setShowSuccessMsg] = useState(false);
  const [successMsg,setSuccessMsg] = useState('');

  const resetForm = () => {
      setProductName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setCategoryImage('');
      setExpiryDate('');
      setError({productName:'',category:'',categoryImage: '',price: '',description: '', expiryDate: ''});
  }

  const handleCloseModal = () => {
    resetForm();
    setWarningMsg('');
    setSuccessMsg('');
    props.setOpenFrom(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWarningMsg('');
    setSuccessMsg('');
  };

  const dataValidation = () => {
    let temp = {};
    if(!productName){
      temp.productName = "Product Name is required.";
    }
    if(!description){
      temp.description = "Description is required.";
    }
    else if(description && description.length < 50 ){
      temp.description = "Description should be atleast 50 letters.";
    }
    if(!category){
      temp.category = "Category is required.";
    }
    // if(!categoryImage){
    //   temp.categoryImage = "Image is required.";
    // }
    if(!price){
      temp.price = "Price is required.";
    }
    if(!expiryDate){
        temp.expiryDate = "Expiry date is required.";
    }
    setError({...temp}); 
    return Object.values(temp).every(x => x == "");
 }

 const addProduct = () => {
    if(!dataValidation())
        return;
    setWarningMsg('');
    setSuccessMsg('');
    dispatch({ type: "PRODUCT_SET_LOADING" });
    addProductAPI(productName,description,price,expiryDate,category,categoryImage).then((result)=>{
        
        if(result.status == 200){
            dispatch({ type: "PRODUCT_RESET_LOADING" });
            resetForm();
            setSuccessMsg('Successfully Saved');
        }
        dispatch({ type: "PRODUCT_RESET_LOADING" });
        }).catch((error)=>{
          dispatch({ type: "PRODUCT_RESET_LOADING" });
          setWarningMsg('Bad Input');  
        });
 }

  return (
    <React.Fragment>
      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={props.openForm}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add a product</DialogTitle>
        {warningMsg ? <Snackbar open={warningMsg} autoHideDuration={3000} onClose={handleCloseAlert} elevation={6} variant="filled" >
                <Alert onClose={handleCloseAlert} severity="warning">
                    {warningMsg}
                </Alert>
            </Snackbar> : <React.Fragment/> }
        {successMsg ? 
            <Snackbar open={successMsg} autoHideDuration={3000} onClose={handleCloseAlert} elevation={6} variant="filled" >
                <Alert onClose={handleCloseAlert} severity="success">
                    {successMsg}
                </Alert>
            </Snackbar> : <React.Fragment/> }
        <DialogContent>
          <DialogContentText>
            To add a new product, please fill the information and hit Save button.
          </DialogContentText>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="productName"
                    label="Product Name"
                    name="productName"
                    autoComplete="productName"
                    autoFocus
                    onChange={(e)=>setProductName(e.currentTarget.value)}
                    value={productName}
                    {...(error.productName && {error:true,helperText:error.productName})}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={2}
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    value={description}
                    onChange={(e)=>setDescription(e.currentTarget.value)}
                    {...(error.description && {error:true,helperText:error.description})}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="category"
                    name="category"
                    variant="outlined"
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    value={category}
                    onChange={(e)=>setCategory(e.currentTarget.value)}
                    {...(error.category && {error:true,helperText:error.category})}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="categoryImage"
                    label="Category Image Link"
                    name="categoryImage"
                    value={categoryImage}
                    onChange={(e)=>setCategoryImage(e.currentTarget.value)}
                    {...(error.categoryImage && {error:true,helperText:error.categoryImage})}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="productPrice"
                    label="Price"
                    name="productPrice"
                    onChange={(e)=>setPrice(e.currentTarget.value)}
                    value={price}
                    {...(error.price && {error:true,helperText:error.price})}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    onChange={(e)=>setExpiryDate(e.currentTarget.value)}
                    value={expiryDate}
                    {...(error.expiryDate && {error:true,helperText:error.expiryDate})}
                />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    // type="submit"
                    onClick={addProduct}
                    disabled={loading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit} >
                    Save
                </Button>
                </Grid>
          </Grid>
          
        </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
