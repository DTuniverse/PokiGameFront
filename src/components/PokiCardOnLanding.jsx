import { useEffect, useState } from "react";
import "./pokiCardOnLanding.css";

export default function PokiCardOnLanding({ poki, index, img }) {
  const [ actualImg, setActualImg] = useState();
  
  const fetchActualImg = async () => {
    try {
      const res = await fetch(img.url)
    const data = await res.json()
    setActualImg(data.sprites.front_default)
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchActualImg()
  },[])

  return (
    <div className="flex-container-pokiCard">
      <div id="pokiCard" className="pokiCard">
        <div className="pokiCardContent">
          <img
            className="imgPokiCardOnLanding"
            src={actualImg}/*  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" */
            
            width="140px"
            height="auto"
          />
        </div>
      </div>
      <div id="pokiNameLanding" key={poki.id}>
        {poki.name.english}
      </div>
    </div>
  );
}
