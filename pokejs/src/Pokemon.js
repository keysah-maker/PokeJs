import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, {useEffect, useState, version} from 'react'
import './Pokemon.css'
import './Pokedex.css'

function Pokemon({ match }) {
    let name = match.params.id;
    const [pokemonInfos, setPokemonInfos] = useState({});
    const [evolvesFrom, setEvolvesFrom] = useState("");
    const [evolutionUrl, setEvolutionUrl] = useState("");
    const [evolvesTo, setEvolvesTo] = useState("");

    const [generation, setGeneration] = useState([])
    const [sprites, setSprites] = useState({});
    const [types, setTypes] = useState([]);
    const [moves, setMoves] = useState([]);
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState([])
    const [moreMoves, setMoreMoves] = useState("");
    const [moreDesc, setMoreDesc] = useState("");

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            method:'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            setPokemonInfos(response);
            setTypes(response.types.map(item => item.type))
            setSprites(response.sprites);
            setMoves(response.moves.map((item) => item.move))
            setItems(response.held_items.map(item => item.item))
            // console.log(response)
           
        })
        .catch((error) => console.log(error))


    },[name])


    useEffect(() => {
        if (pokemonInfos !== undefined) {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfos["id"]}`, {
            method:'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            setGeneration(response.generation);
            setDescription(response.flavor_text_entries.map(item => (item.language.name === "en") && item));
            setEvolvesFrom(response.evolves_from_species)
            setEvolutionUrl(response.evolution_chain.url)
           
        })
        .catch((error) => console.log(error))
    }
    }, [pokemonInfos])

    useEffect(() => {
        fetch(evolutionUrl, {
            method:'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)   
        })
        .catch((error) => console.log(error))
        
    },[evolutionUrl])

    
function Evolutions() {


    if (evolvesFrom) {
    return(
        <div className="evolution-container">
         Evolves from <Link to={`/pokemon/${evolvesFrom.name}`}>{evolvesFrom.name}</Link>
        </div>
    );
    } else {
        return(
        <div className="evolution-container">
            <span>No pre-evolution</span>
        </div>
        );
    }
}

function PokemonInfos() {
    return (
        <div className="infos-container">
            <h2>Infos</h2>
            <Types/>
            <div className="pokemon-id">
                <span>n° - {pokemonInfos["id"]}</span>
            </div>
    
            <div className="pokemon-generation">
                <span>Géneration : {generation.name}</span>
            </div>
            <div className="pokemon-height">
                <span>Height : {pokemonInfos["height"]}</span>
            </div>
            <div className="pokemon-weight">
                <span>Weight : {pokemonInfos["weight"]}</span>
            </div>
            <div className="pokemon-base_experience">
                <span>Base experience : {pokemonInfos["base_experience"]}</span>
            </div>
        </div>
    );
}
function PokemonDescription() {
    return(
        <div className="pokemon-description ">
            <div className="title">
                <h2>Descriptions</h2>
                <button onClick={() => moreDesc !== "more" ? setMoreDesc("more") : setMoreDesc(null)}>{moreDesc === "more" ? "-" : "+" }</button>
            </div>
            <div className={`description-container ${moreDesc}`}>
            {description.map((item, index) => item !== false &&
                <div key={index} className="description-language">
                    <h4>From {item.version.name} version</h4>
                    <p>{item.flavor_text}</p>
                    
            </div>)}
            </div>
        </div>
    )
}
function Sprites() {
    const sprites_arr = Object.keys(sprites);
    return (
        <div className="sprites-container">
        {sprites_arr.map((item, index) => 
            (sprites[item] !== Object(sprites[item]) && sprites[item] !== null) && <img key={index} alt={`${name} ${item}`} src={sprites[item]} />           
)}
    </div>
    );
}

function Types() {
    return (
        <div className="pokemon-types">
            { 
               types.map((item, index) => item.name !== null && <span className={item.name} key={index}>{item.name} </span>)
            }
        </div>
    );
}

function Moves() {
    return (
        <div className="moves-container">
            <div className="title">
                <h2>Moves</h2> <button onClick={() => moreMoves !== "more" ? setMoreMoves("more") : setMoreMoves(null)}>
                {moreMoves === "more" ? "-" : "+" } </button>
            </div>
            <ul className={`moves-list ${moreMoves}`}>
                {   
                    moves.map((item,index) => 
                        <li key={index}>{item.name}</li>
                    )
                    
                }
            </ul>
        </div>
    )
}
function Items() {
    if (items.length > 0) {
    return (
        <div className="items-container">
            <h2>Held Items</h2>
            <ul>
            {
                items.map((item,index) => <li key={index}>{item.name} </li>)
            }
            </ul>
        </div>
    );
        } else {
            return (
                <div className="items-container">
            <h2>Held Items</h2>
                <p>No items held during capture...</p>
        </div>
            );
        }
}
    return(
        <div className="pokemon-container">
            <div className="pokemon-infos">
                <div className="basic-infos">
                        <h1 className="pokemon-name">{ match.params.id }</h1>
                        <div className="nav">
                        <Evolutions/>
                        <Sprites/>
                        </div>
                </div>
                <div className="more-infos">
                    <PokemonInfos/>
                    <Items />
                    <Moves  />
                </div>
                <PokemonDescription  />
            </div>
           
        </div>
    );
}

export default Pokemon;