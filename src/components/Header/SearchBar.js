import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function SearchBar() {
  const [value, setValue] = React.useState('');
  const [search, setSearch] = React.useState([]);
  const [selected, setSelected] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    console.log('entrou no hook');
    const userData = {
      headers: {
        Authorization: `Bearer f0139e0e-828d-4da4-b3a8-b7a7dfb8c004`,
      },
    };
    let obj = { question: value };
    let promisse = axios.post('http://localhost:5000/search', obj, userData);
    promisse.then((response) => setSearch(response.data));
  }, [value]);

  function User({ image, id, name, following }) {
    if(following){
      return (
        <div
          className="searchResult"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => navigate(`/users/${id}`, { state: { username: name } })}>
          <img src={image} alt={`Foto do perfil de ${name}`} />
          <p>{name}</p>
          <h1>• following</h1>
        </div>
      );
    } else {
      return (
        <div
          className="searchResult"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => navigate(`/users/${id}`, { state: { username: name } })}>
          <img src={image} alt={`Foto do perfil de ${name}`} />
          <p>{name}</p>
        </div>
      );
    }
    
  }

  function Results() {
    if ((search.length === 0 || value === '') && selected === true) {
      return (
        <div className="result" selected={selected}>
          <p>Sem resultados</p>
        </div>
      );
    } else if (selected === false) {
      return <></>;
    } else {
      let results = search.result;
      for(let i=0; i<results.length;i++){
        let item = results[i]
        if(search.following.includes(item.id)){
          results.splice(i,1);
          results.unshift(item);
        }
      }
      console.log(results);
      return (
        <div className="result">
          {results.map((user) => {
            if(search.following.includes(user.id)){
              return(
                <User image={user.image} id={user.id} name={user.userName} following={true}/>
              )
            } else {
              return(
                <User image={user.image} id={user.id} name={user.userName} following={false}/>
              )
            }
          })}
        </div>
      );
    }
  }

  return (
    <div className="searchBar">
      <DebounceInput
        type="text"
        placeholder="Search for People"
        minLength={3}
        debounceTimeout={300}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => setSelected(true)}
        onBlur={() => setSelected(false)}
      />
      <Results />
    </div>
  );
}
