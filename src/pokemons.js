import React from 'react'
import ReactDOM from 'react-dom'
import {SearchForm} from './search-form'
import axios from 'axios'
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router'


const Header = (props) => (
    <header>
        <h1>{props.title}</h1>
    </header>
)

const Title = (props) => (
    <h2>{props.title}</h2>
)

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: {
                name: 'Unknown'
            }
        }
        if (props.location.query.id) {
            const id = props.location.query.id
            axios.get(`https://api.pokemontcg.io/v1/cards/${id}`)
                .then(response => {
                    const pokemon = response.data
                    this.setState({
                        pokemon: pokemon
                    })            
                })
        }
    }

    render() {
        const pokemon = this.state.pokemon
        return (
            <section>
                <h1>{pokemon.name}</h1>
                <div>
                    <img src={pokemon.imageUrl}/>
                </div>
            </section>      
        )
    }
}

const PokemonList = (props) => (
    <ul>
    {props.items.map((pokemon, i) => {
        const query = {
            pathname: '/detail',
            query: {
                id: pokemon.id
            }
        }
        return (
            <li key={i}>
                <h4><Link to={query}>{pokemon.name}</Link></h4>
            </li>
        )
    })}
    </ul>
)

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons : []
        }
        if(props.location.query.name) {
            this.onSearch(props.location.query.name)
        }
    }

    onSearch(query) {
        axios.get(`https://api.pokemontcg.io/v1/cards?name=${query}`)
            .then(response => {
                console.log('RESPONSE:', response)
                const pokemons = response.data.cards
                this.setState({
                    pokemons: pokemons
                })
            })
    }
    render() {
        return (
            <section>
                <Header title="MY POKEMONS" />
                <SearchForm onSearchSubmit={this.onSearch.bind(this)} />
                <PokemonList items={this.state.pokemons}/>
            </section>
        )
    }
}

const Home = () => (
    <section>
        <h1>This is HOME :D</h1>
    </section>
)

const Nav = () => (
    <nav>
        <ul>
            <li><Link to="/" >HOME</Link></li>
            <li><Link to="/search" >SEARCH</Link></li>
            <li><Link to="/detail" >DETAIL</Link></li>
        </ul>
    </nav>
)

const App = props =>  (
    <section>
        <Nav />
        {props.children}
    </section>
)

class Main extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App} >
                    <IndexRoute component={Home} />
                    <Route path="detail" component={Detail} />
                    <Route path="search" component={Search} />
                </Route>
            </Router>
        )
    }
}

const element = document.getElementById('app')
ReactDOM.render(<Main />, element)