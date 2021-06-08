import React, { useState, useEffect} from 'react';
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
import { addProductAPI, updateProductAPI } from '../../API';

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
  const products = useSelector((state) => state.ProductDetailReducer.products);
  const edit = useSelector((state) => state.ProductDetailReducer.edit);  
  
  const productToBeEdited = edit.isEdit ? products.data[edit.editIndex]: {id:-1,"name":'',description:'',price:'',expiryDate:'',categoryId:-1,category:{id:-1,name:'',image:''}};  
  const [productName,setProductName] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  const [categoryImage,setCategoryImage] = useState('');
  const [price,setPrice] = useState('');  
  const [expiryDate,setExpiryDate] = useState('');  
  const [error,setError] = useState({productName:'',category:'',categoryImage: '',price: '',description: '', expiryDate: ''});
  const [loadProduct,setLoadProduct] = useState(true);
  const [warningMsg,setWarningMsg] = useState('');
  const [successMsg,setSuccessMsg] = useState('');
  
  const setStateIfRequired = () => {
    if(!productName) setProductName(productToBeEdited.name);
    if(!description) setDescription(productToBeEdited.description);
    if(!category) setCategory(productToBeEdited.category.name);
    if(!categoryImage) setCategoryImage(productToBeEdited.category.image);
    if(!price) setPrice(productToBeEdited.price.toString());
    if(!expiryDate) setExpiryDate(productToBeEdited.expiryDate);
  }
  
  useEffect(()=>{
    if(loadProduct) setStateIfRequired();
  });

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
    setLoadProduct(true);
    dispatch({type: 'EDITADD_MODAL', payload: {editIndex:-1,isEdit:false,showEditModal:false}  });
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
    if(!edit.isEdit && !categoryImage){
      temp.categoryImage = "Image is required if adding a new product.";
    }
    if(!price){
      temp.price = "Price is required.";
    }
    if(!expiryDate){
        temp.expiryDate = "Expiry date is required.";
    }
    setError({...temp}); 
    return Object.values(temp).every(x => x == "");
 }

 const onTextChange = (e,callback) => {
    setLoadProduct(false);
    callback(e.currentTarget.value);
 }

 const processFetchedResponse = (result) => {
    if(result.status == 200){
        dispatch({ type: "PRODUCT_RESET_LOADING" });
        if(!edit.isEdit) resetForm();
        dispatch({
          type: "AFTER_EDITADD_MODAL",
          payload: {
              data: {
                  id: productToBeEdited.id,
                  "name": productName,
                  price:parseInt(price),
                  expiryDate,
                  description,
                  category: {
                      id: -1,
                      "name": category,
                      image: categoryImage ? categoryImage : products.data[edit.editIndex].category.image
                  }
              }
          }
      });
        setSuccessMsg('Successfully Saved');
    }

   dispatch({ type: "PRODUCT_RESET_LOADING" });
 }

 const onClickHandler = () => {
    setStateIfRequired();
    if(!dataValidation())
        return;
    setWarningMsg('');
    setSuccessMsg('');
    dispatch({ type: "PRODUCT_SET_LOADING" });
    if(!edit.isEdit){
        addProductAPI(productName,description,price,expiryDate,category,categoryImage).then((result)=>{
            processFetchedResponse(result);
            }).catch((error)=>{
              dispatch({ type: "PRODUCT_RESET_LOADING" });
              setWarningMsg('Bad Input');  
        });
    }else{
        updateProductAPI(productName,description,price,expiryDate,category,categoryImage,productToBeEdited.id).then((result)=>{
            processFetchedResponse(result);
            }).catch((error)=>{
              dispatch({ type: "PRODUCT_RESET_LOADING" });
              setWarningMsg('Bad Input');  
        });
    }
 }

  return (
    <React.Fragment>
      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={edit.showEditModal}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{edit.isEdit ? "Edit a product detail": "Add a product"}</DialogTitle>
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
            To add/edit a new product, please fill the information and hit Save button.
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
                    onChange={(e)=> onTextChange(e,setProductName) }
                       value={ loadProduct ? productToBeEdited.name : productName }
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
                    value={ loadProduct ? productToBeEdited.description : description }
                    onChange={(e)=>onTextChange(e,setDescription)}
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
                    value={ loadProduct ? productToBeEdited.category.name : category }
                    onChange={(e)=>onTextChange(e,setCategory)}
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
                    value={ loadProduct ? productToBeEdited.category.image : categoryImage }
                    onChange={(e)=>onTextChange(e,setCategoryImage)}
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
                    onChange={(e)=>onTextChange(e,setPrice)}
                    value={ loadProduct ? productToBeEdited.price : price }
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
                    onChange={(e)=>onTextChange(e,setExpiryDate)}
                    value={ loadProduct ? productToBeEdited.expiryDate : expiryDate }
                    {...(error.expiryDate && {error:true,helperText:error.expiryDate})}
                />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    // type="submit"
                    onClick={onClickHandler}
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
