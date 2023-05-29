import PokiCardOnLanding from "./PokiCardOnLanding";
import "./pokiCardOnLanding.css";

export default function LandingPage({ data }) {
  return (
    <div>
      <h1 id="global-heading">PokiFIGHT</h1>
      <div className="parent-pokiCard">
        {data?.allPokemon &&
          data.allPokemon.map((poki, index) => (
            <PokiCardOnLanding poki={poki} index={index} />
          ))}
      </div>
    </div>
  );
}
