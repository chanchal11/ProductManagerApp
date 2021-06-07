import {useState} from 'react';
import Pagination  from "../../Components/Pagination";
import Header from "../../Components/Header";
import AddButton from "../../Components/AddButton";
import Form from "../../Components/Form";

export default function Home(){
    const [openForm,setOpenFrom] = useState(false);
    return (<div>
        <Header/>
        <Pagination/>
        <AddButton showForm={setOpenFrom} />
        <Form setOpenFrom={setOpenFrom} openForm={openForm} />
    </div>);
}