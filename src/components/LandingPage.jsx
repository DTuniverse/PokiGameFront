import PokiCardOnLanding from "./PokiCardOnLanding";
import "./pokiCardOnLanding.css";

export default function LandingPage({ serverData, dataImg }) {
  // console.log("this is data from landing page", data)
  console.log("this is dataImg from landin page", serverData?.allPokemon)
  return (
    <div>
      <h1 id="global-heading">PokiFIGHT</h1>
      {/* <img src={dataImg[58]?.sprites?.front_default}/> */}
      <div className="parent-pokiCard">
        {/* {serverData?.allPokemon &&
          serverData.allPokemon.map((poki, index) => {
            
            // const img = dataImg.find(element => element.name===poki.name.english.toLowerCase())
             */}
           {/* <PokiCardOnLanding poki={poki} index={index} dataImg={dataImg} key={poki.name.english} />})} */}
           <PokiCardOnLanding/>
          
      </div>
    </div>
  );
}
