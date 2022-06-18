import React from "react";
import { DebounceInput } from "react-debounce-input";
import axios from 'axios';

export default function SearchBar(){
    const [value, setValue] = React.useState('');
    const [search, setSearch] = React.useState([]);
    React.useEffect(() => {
        let obj = {question: value};
        let promisse = axios.post("http://localhost:5000/search", obj);
        promisse.then((response) => setSearch(response.data));
    }, [value]);
    console.log(search);
    return(
        <DebounceInput type="text" placeholder="Search for People" minLength={3} debounceTimeout={300} value={value} onChange={e => setValue(e.target.value)}/>
    )
}