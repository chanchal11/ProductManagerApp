import axios from 'axios';

const UrlRoot = 'http://localhost:5000';

const addProduct = (name, description, price, expiryDate, categoryName) => axios.post(`${UrlRoot}/api/product`,{name, description, price, expiryDate, categoryName});

const getProductDetailsAPI = (productName='',pageNumber=1,pageLimit=6) => axios.get(`${UrlRoot}/api/Product/?productName=${productName}&pageNumber=${pageNumber}&pageLimit=${pageLimit}`);

export {
    addProduct,
    getProductDetailsAPI
}