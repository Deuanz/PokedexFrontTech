import React from 'react'
import ReactDOM from 'react-dom'


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

const Pokemons = (props) => {
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
const App = () => {
    const items = [
        {
            'Name': 'Pikachu',
            'Height': "1' 04",
            'Weight': "13.2 lbs",
            'Gender': 'M F',
            'Category': 'Mouse',
            'Ablities': 'Static',
            'Yype': 'Electronic',
            'Weaknesses': 'Ground',
            'Evalutions': 'Pichu -> Picachu -> Raichu'
        },
        {
            'Name': 'Meowth',
            'Height': "1' 04",
            'Weight': "9.3 lbs",
            'Gender': 'M F',
            'Category': 'Scratch Cat',
            'Ablities': 'Pickup Technician',
            'Type': 'Normal',
            'Weaknesses': 'Fighting',
            'Evalutions': 'Meowth -> Persian'
        },
        {
            'Name': 'Victini',
            'Height': "1' 04",
            'Weight': "8.8 lbs",
            'Gender': 'Unknown',
            'Category': 'Victory',
            'Ablities': 'Victory Star',
            'Type': 'Psychic, Fire',
            'Weaknesses': 'Water, Ground, Eock, Ghost, Dark',
            'Evalutions': 'Does not evolve'
        }
    ]
    return (
        <section>
            <Header title="MY POKEMONS" />
            <Pokemons items={items}/>
        </section>
    )
}

const element = document.getElementById('app')
ReactDOM.render(<App />, element)