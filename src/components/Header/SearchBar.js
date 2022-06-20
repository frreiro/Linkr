import React from "react";
import { DebounceInput } from "react-debounce-input";
import axios from 'axios';
import styled from "styled-components";

export default function SearchBar(){
    const [value, setValue] = React.useState('');
    const [search, setSearch] = React.useState([]);
    const [selected, setSelected] = React.useState(false);
    React.useEffect(() => {
        console.log("entrou no hook");
        let obj = {question: value};
        let promisse = axios.post("http://localhost:5000/search", obj);
        promisse.then((response) => setSearch(response.data));
    }, [value]);
    function User({ image, id, name }){
        return(
            <div className="searchResult">
                <img src={image} />
                <p>{name}</p>
            </div>
        )
    }

    function Results(){
        if((search.length === 0 || value === '') && selected === true){
            return(
                <div className="result" selected={selected}>
                    <p>Sem resultados</p>
                </div>
            )
        } else if (selected === false){
            return(
                <>
                </>
            )
        } else {
            return(
                <div className="result">
                    {search.map((user) => <User image={user.image} id={user.id} name={user.userName}/>)}
                </div>
            )
        }
    }
    return(
        <div className="searchBar">
            <DebounceInput type="text" placeholder="Search for People" minLength={3} debounceTimeout={300} value={value} onChange={e => setValue(e.target.value)} onFocus={e => setSelected(true)} onBlur={e => setSelected(false)}/>
            <Results />
        </div>
    )
}




