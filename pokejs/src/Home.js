import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './Home.css';
import Pokedex from './Pokedex.js';
import Pokemon from './Pokemon.js';

function Home() {
  return (
    <div className="Home">
    <Router>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Pokédex-Online</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Pokedex</a>
              </li>
            </ul>
        
          </div>
        </nav>
      </header>
      <Switch>
        <Route exact path='/' component={Pokedex} />
        <Route path={`/pokemon/:id`} component={Pokemon} />
      </Switch>
    </Router>
  
    </div>
  );
}

export default Home;
