import './Home.css';
import React, {  } from 'react';
import axios from 'axios'
import home from 'Home.js';

/*
const {API_KEY} = process.env
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

class Search extends React.Component {
    state = {
        query: '',
        res: []
    }

    getinfo = e => {
        axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=100`)
        .then(({ data }) => {
            this.setState({
                res: data.data
            })
        })
    }

    handleInputName = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.lenght % 2 === 0) {
                    this.getinfo()
                }
            }
        })
    }

    render() {
        return(
            <form>
                <input>
                placeholder="pokemon name..."
                ref={input => this.search = input}
                onChange={this.handleInputName}
                </input>
                <p>{this.state.query}</p>
            </form>
        )
    }
}

export default {Home, Search};

*/

export default Home