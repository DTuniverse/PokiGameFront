import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal_arena.css';
import Fighter from './Fighter';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Modal({ imgOfSelected }) {
  const [open, setOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonImage, setPokemonImage] = useState('/pokeball.png');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokigameback.onrender.com/pokemon');
      const data = await response.json();
      console.log(data);
      const pokemon = data.allPokemon.find(
        (pokemon) => pokemon.name.english.toLowerCase() === searchTerm.toLowerCase()
      );
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
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchActualImg = async () => {
    try {
      const res = await fetch(imgOfSelected?.url);
      const data = await res.json();
      setModalImg(data.sprites.other.dream_world.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActualImg();
  }, [imgOfSelected]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Button to test</button>
      {open && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-content-header">
              Please Choose a New Pokemon! <br />
              {/* <Fighter /> */}
              {/* Insert the first code block here */}
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
              {/* End of first code block */}
            </div>
            <div className="custom-modal-content-body">
              <div className="custom-modal-content-img_container">
                IMG FOR POKEMON
              </div>
              <div className="custom-modal-content-stats">
                STATS FOR POKEMON <br />
                STATS FOR POKEMON <br />
                STATS FOR POKEMON <br />
                STATS FOR POKEMON <br />
                STATS FOR POKEMON <br />
                STATS FOR POKEMON <br />
              </div>
            </div>
            
            <button className="custom-modal-close" onClick={handleClose}>
            Close
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

// Modal.propTypes = {
//   data: PropTypes.array,
//   dataImg: PropTypes.array,
//   indexOfSelected: PropTypes.number,
//   imgOfSelected: PropTypes.object,
//   setSelectedPoke: PropTypes.func,
// };





  
// function SimpleDialog(props) {
//   const { data, dataImg, indexOfSelected, modalImg, onClose, selectedValue, open, setSelectedPoke } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog onClose={handleClose} open={open} >
//       {/* <DialogTitle sx={{textAlign:'center', backgroundColor:"black", color:"white"}}>{data[indexOfSelected].name.english}</DialogTitle> */}
//       <BasicCard_arena sx={{width: 800}} />
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   // selectedValue: PropTypes.string.isRequired,
// };
