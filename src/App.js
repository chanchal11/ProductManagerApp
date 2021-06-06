import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {getProductDetailsAPI } from './API';
import Home from './Pages/Home';
 
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "PRODUCT_SET_LOADING" });
    getProductDetailsAPI().then((result)=> {

        if(result.status == 200){
            dispatch({ type: "PRODUCT_ADD", payload: result.data });
            dispatch({ type: "PRODUCT_RESET_LOADING" });
        }
        dispatch({ type: "PRODUCT_RESET_LOADING" });
    }).catch((error)=>{
      dispatch({ type: "PRODUCT_RESET_LOADING" });
    });
  },[]);

  return ( 
      <div style={{overflowX: 'hidden', overflowY: 'hidden'}}>
        <Home />
     </div>
  );
}

export default App;
