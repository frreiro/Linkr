import React from "react";
import { DebounceInput } from "react-debounce-input";
import axios from 'axios';

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
                <image src={image} />
                <p>{name}</p>
            </div>
        )
    }

    function Results(){
        if(search === [] || value === ''){
            return(
                <>
                    <p>Sem resultados</p>
                </>
            )
        } else {
            return(
                <>
                    {search.map((user) => <User image={user.image} id={user.id} name={user.userName}/>)}
                </>
            )
        }
    }
    console.log(selected);
    return(
        <>
            <DebounceInput type="text" placeholder="Search for People" minLength={3} debounceTimeout={300} value={value} onChange={e => setValue(e.target.value)} onFocus={e => setSelected(true)} onBlur={e => setSelected(false)}/>
            <Results />
        </>
    )
}