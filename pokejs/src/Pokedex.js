import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Pokedex.css';


function App() {
    const[type, setType] = useState("all");
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsId, setPokemonsId] = useState([]);
    const [pokemonsSprite, setPokemonsSprite] = useState([""]);
    const [pokemonsFirstType, setPokemonsFirstType] = useState([]);
    const [pokemonsSecondType, setPokemonsSecondType] = useState([]);
    const [scrollTop, setScrollTop] = useState(false);
    const [originalpokemons, setoriginalPokemons] = useState([]);

    const [namesearch, setNameSearch] = useState([""]);

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(50);

    useEffect( () => {
        if (type === "all") {
            fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, {
                method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {       
                setPokemons(responseJson.results);
                setoriginalPokemons(responseJson.results);
                setScrollTop(true);
            })
            .catch((error) => alert(JSON.stringify(error)));
        }
    
    }, [offset,limit,type]);

    useEffect( () => {
        if (pokemons.length > 0) {
            Promise.all(pokemons.map((item) => fetch(item.url, {
                method: 'GET',
            }).then((item) => item.json())))
            .then((allResponse) => {
                    setPokemonsId(allResponse.map((item) => item.id));
                    setPokemonsFirstType(allResponse.map((item) => item.types).map((item) => item[0].type.name));
                    setPokemonsSecondType(allResponse.map((item) => item.types).map((item) => item.length === 2 && item[1].type.name));
                    setPokemonsSprite(allResponse.map((item) => item.sprites).map((item) => item.front_default));
            })
            .catch((error) => {
                console.log(error)
            })
        }
            
    }, [pokemons]);

    useEffect( () => {
        if(type !== "all") {
            fetch(`https://pokeapi.co/api/v2/type/${type}`, {
                method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
                let offlimit = limit + offset;
            setPokemonType(responseJson.pokemon.slice(offset,offlimit));
            setScrollTop(true);
            console.log(responseJson.pokemon.slice(offset,offlimit))
            console.log(offlimit)
            })
            .catch((error) => alert(JSON.stringify(error)));
        }
    }, [type,offset,limit])

    useEffect( () => {
            Promise.all(pokemonType.map((item) => fetch(item.pokemon.url, {
                method: 'GET',
            }).then((item) => item.json())))
            .then((allResponse) => {
                    setPokemonsId(allResponse.map((item) => item.id));
                    setPokemonsFirstType(allResponse.map((item) => item.types).map((item) => item[0].type.name));
                    setPokemonsSecondType(allResponse.map((item) => item.types).map((item) => item.length === 2 && item[1].type.name));
                    setPokemonsSprite(allResponse.map((item) => item.sprites).map((item) => item.front_default));
                    setPokemons(allResponse.map((item) => item))
                    setoriginalPokemons(allResponse.map((item) => item))
            })
            .catch((error) => alert(JSON.stringify(error)));
            
    }, [pokemonType])
    useEffect(() => {
        window.scrollTo(0,0);
        setScrollTop(false);
    },[scrollTop])

    const changeType = e => {
        setType(e.target.value);
        setOffset(0);
    }
    const changeLimit = e => {
        setLimit(parseInt(e.target.value));
    }

    const handleSearchByName = async (input) =>  {
        setNameSearch(input);
        const newData = originalpokemons.filter(function(item) {
          const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
          const textData = input.toLowerCase();
          return itemData.indexOf(textData) > -1;
        });
        setPokemons(newData);
      }

    function Buttons() {
        return (
            <nav className="navigation">
                <button className="arrow arrow_prev" onClick={ () => {setOffset(offset => offset > 0 && offset  - limit); setScrollTop(true) }}>Previous</button>
                <div className="filters">
                    <span>Type : </span>
                    <select className="type-select" value={type} onChange={changeType}>
                        <option  defaultValue value="all" > All Types</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                    </select>

                    <span> Limit : </span>
                    <select className="limit-select" value={limit} onChange={changeLimit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option defaultValue="50">50</option>
                    </select>
                </div>
                <button className="arrow arrow_next" onClick={ () => { setOffset(offset =>  offset + limit) ; setScrollTop(true) }}>Next</button>
                <input
                    placeholder="Pokemon name..."
                    onChange={(e) => handleSearchByName(e.target.value)}
                    value={namesearch}
                />
            </nav>
        )
    }

    function Pokedex() {
        return (
            <div className="pokedex">
                { pokemons.map((item, index) =>
                    <div key={index} className="pokemon" >
                        <div className="pokemon-sprite">
                            <img alt={item.name} src={pokemonsSprite[index]}></img>
                        </div>
                        <div className="pokemon-infos">
                            <span>n° { pokemonsId[index] } - </span>
                            <Link className="pokemon-name" to={`/pokemon/${item.name}`}>{ item.name }</Link>
                        </div>
                        <div className="pokemon-types">
                            <div className="types">
                            <span className={pokemonsFirstType[index]}> { pokemonsFirstType[index]  }</span> { pokemonsSecondType[index] && <span className={pokemonsSecondType[index]}>{pokemonsSecondType[index] }</span> }
                            </div>
                           
                        </div>
                    </div>)
                     }                   
            </div>
        )
                   
    }

    return(
        <div className="mainPokedex">
            <Buttons />
            <Pokedex />
        </div>

    );
  
  
}

export default App;
