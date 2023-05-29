import "./pokiCardOnLanding.css";

export default function PokiCardOnLanding({ poki, index }) {
  return (
    <div className="flex-container-pokiCard">
      <div id="pokiCard" className="pokiCard">
        <div className="pokiCardContent">
          <img
            className="imgPokiCardOnLanding"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
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
