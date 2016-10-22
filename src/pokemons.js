import React from 'react'
import ReactDOM from 'react-dom'
import {SearchForm} from './search-form'
import axios from 'axios'


const Header = (props) => (
    <header>
        <h1>{props.title}</h1>
    </header>
)

const Title = (props) => (
    <h2>{props.title}</h2>
)

const Detail = (props) => {
    const keys = Object.keys(props.detail).filter(key => key != 'Name')
    return (
        <ul>
            {keys.map(key => (
                <li>{key}: {props.detail[key]}</li>
            ))}
        </ul>
    )
}

const Image = (props) => {
    const name = props.name.toLowerCase()
    const path = ['img/', name , '.png'].join("")
    return <img src={path} height="200" width="200" />
}

export const PokemonList = (props) => {
    console.log(props.items)
    return (
        <ol>
            {props.items.map(item => (
                <li>
                    <Title title={item.Name} />
                    <Image name={item.Name} />
                    <Detail detail={item} />
                </li>
            ))}
        </ol>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons : []
        }
    }

    onSearch(query) {
        event.preventDefault()
        axios.get(`http://pokeapi.co/api/v2/pokemon/${query}/`)
            .then(response => {
                console.log('RESPONSE:', response)
                const pokemons = response.data.Search
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

const element = document.getElementById('app')
ReactDOM.render(<App />, element)