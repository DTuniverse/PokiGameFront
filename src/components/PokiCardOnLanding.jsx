import { useEffect, useState } from "react";
import "./pokiCardOnLanding.css";


export default function PokiCardOnLanding({ poki, index, img, setImgOfSelected }) {
  const [ actualImg, setActualImg] = useState();
  
  const fetchActualImg = async () => {
    try {
      const res = await fetch(img.url)
    const data = await res.json()
    setActualImg(data.sprites.front_default)
    setImgOfSelected(data.sprites.front_default)
    // console.log(data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActualImg();
  }, []);

  return (
    <div className="flex-container-pokiCard">
      <div id="pokiCard" className="pokiCard">
        <div className="pokiCardContent">
          <img

            className="imgPokiCardOnLanding"
            width="140px"
            height="auto"
            id="imgPokiCardOnLanding"
            src={actualImg}
            alt={poki.name.english}

          />
        </div>
      </div>
      <div id="pokiNameLanding" key={poki.id}>
        {poki.name.english}
      </div>
    </div>
  );
}
