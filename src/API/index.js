import axios from 'axios';

const UrlRoot = 'http://localhost:5000';

const addProductAPI = (name, description, price, expiryDate, categoryName,image="") => axios.post(`${UrlRoot}/api/product`,{name, description, price, expiryDate, categoryName, image});

const deleteProductAPI = (id) => axios.delete(`${UrlRoot}/api/product/${id}`);

const getProductDetailsAPI = (productName='',pageNumber=1,pageLimit=6) => axios.get(`${UrlRoot}/api/Product/?productName=${productName}&pageNumber=${pageNumber}&pageLimit=${pageLimit}`);

export {
    addProductAPI,
    getProductDetailsAPI,
    deleteProductAPI
}