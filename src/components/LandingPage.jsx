import PokiCardOnLanding from "./PokiCardOnLanding";
import "./pokiCardOnLanding.css";

export default function LandingPage({ data, dataImg }) {
  return (
    <div>
      <h1 id="global-heading">PokiFIGHT</h1>
      <div className="parent-pokiCard">
        {data &&
          data.map((poki, index) => {
            const img = dataImg.find(i=>i.name===poki.name.english.toLowerCase())
            return <PokiCardOnLanding poki={poki} index={index} img={img} />
          }
          
         )}
      </div>
    </div>
  );
}
