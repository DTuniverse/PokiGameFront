import React, { useState, useEffect } from 'react';
import "./pokiCardOnLanding.css";

export default function Fighter() {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonImage, setPokemonImage] = useState('/pokeball.png');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        if (searchTerm.trim() !== '') {
        fetchData();
        }}, [searchTerm]);

    const fetchData = async () => {
        try {
        // setIsLoading(true);
        const response = await fetch('https://pokigameback.onrender.com/pokemon');
        const data = await response.json();
        console.log(data);
        const pokemon = data.allPokemon.find((pokemon) => pokemon.name.english.toLowerCase() === searchTerm.toLowerCase());
        setPokemonData(pokemon);

        if (pokemon) {
        const imageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.english.toLowerCase()}`)
        const imageData = await imageResponse.json();
        setPokemonImage(imageData.sprites.other.dream_world.front_default);
        } else {
        setPokemonImage('/pokeball.png');
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {

        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        
    <div className="flex-container-pokiCard">
        <div>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Pokemon" />
        </div> <br /><br />
        <div className='arena__modal_img'>
            <div className="pokiCardContent">
                <img
                id="imgPokiCardOnLanding"
                src={pokemonImage}
                alt={pokemonData?.name.english}
                width="100px"
                height="auto"
                />
            </div>
        </div>
</div>
);
}