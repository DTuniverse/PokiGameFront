import React, { useState, useEffect } from 'react';
import "./pokiCardOnLanding.css";

export default function Fighter() {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonImage, setPokemonImage] = useState('/pokeball.png');
    const [searchTerm, setSearchTerm] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
        fetchData();
        } else {
            // setIsLoading(true);
        }
    }, [searchTerm]);

    const fetchData = async () => {
        try {
        // setIsLoading(true);
        const response = await fetch('http://localhost:5000/pokemon');
        const data = await response.json();
        console.log(data);
        const pokemon = data.allPokemon.find((pokemon) => pokemon.name.english.toLowerCase() === searchTerm.toLowerCase());
        setPokemonData(pokemon);

        if (pokemon) {
        const imageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.english.toLowerCase()}`)
        const imageData = await imageResponse.json();
        setPokemonImage(imageData.sprites.front_default);
        } else {
        setPokemonImage('/pokeball.png');
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        // setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
    <div className="flex-container-pokiCard">
        <div id="pokiCard" className="pokiCard">
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
        <div id="pokiNameLanding">
    </div>
</div>
);
}
//             <div>
//                 <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Pokemon" />
//             </div>
//             {isLoading || !pokemonImage ? (
//                 <img src="/pokeball.png" alt="Loading" /> 
//             ) : (
//                 pokemonData && (
//                     <div key={pokemonData?.id}>
//                         <h3>{pokemonData.name.english}</h3>
//                         {pokemonImage && <img src={pokemonImage} alt={pokemonData?.name.english} />}
//                         <p>Type: {pokemonData.type.join(', ')}</p>
//                         <p>HP: {pokemonData.base.HP}</p>
//                         <p>Attack: {pokemonData.base.Attack}</p>
//                         <p>Defense: {pokemonData.base.Defense}</p>
//                         <p>Sp. Attack: {pokemonData.base['Sp. Attack']}</p>
//                         <p>Sp. Defense: {pokemonData.base['Sp. Defense']}</p>
//                         <p>Speed: {pokemonData.base.Speed}</p>
//                     </div>
//                 )
//             )}
        
//     );
// }