import PokiCardOnLanding from "./PokiCardOnLanding";
import { useState } from "react"
import "./pokiCardOnLanding.css";
import Modal from "./Modal";

export default function LandingPage({ data, dataImg }) {
  const [indexOfSelected, setIndexOfSelected] = useState(null)
  const [imgOfSelected, setImgOfSelected] = useState("")


  return (
    <div>
      <h1 id="global-heading">PokiFIGHT</h1>
      <div className="parent-pokiCard">
        {data &&
          data.map((poki, index) => {
            const img = dataImg.find(i=>i.name===poki.name.english.toLowerCase())
            return <button onClick={()=>{
              setIndexOfSelected(index)
              setImgOfSelected(img)
            }} style={{backgroundColor:"transparent",backgroundRepeat:" no-repeat",
            border: "none",
            cursor: "pointer",
            }}><PokiCardOnLanding poki={poki} index={index} img={img} setImgOfSelected={setImgOfSelected} /></button>
          }
          
         )}
      </div>
      <div className="parent-modal">
          {indexOfSelected !==null? <Modal data={data} dataImg={dataImg} indexOfSelected={indexOfSelected} imgOfSelected={imgOfSelected}  /> : console.log("MODAL NOT SHOWING BECAUSE NO POKEMON HAS BEEN SELECTED")}
      </div>
    </div>
  );
}
