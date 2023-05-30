import PokiCardOnLanding from "./PokiCardOnLanding";
import "./pokiCardOnLanding.css";

export default function LandingPage({ data, dataImg }) {
  return (
    <div>
      <h1 className="global-heading">PokiFIGHT</h1>
      <h2 className="landingpageText">
        Welcome to the world of Pokémon Fight, an epic fighting game that lets
        you experience the thrill of intense Pokémon fights like never before!
      </h2>{" "}
      <div className="instructionText">
        <h5>
          1) Choose your Pokémon: Begin your journey by selecting your starter
          Pokémon from a range of iconic options, each with unique abilities and
          attributes.
        </h5>
        <h5>2) Once you’ve selected your Pokémon, press the Fight button. </h5>
        <h5>
          3) You will be matched with a random Pokémon from the PokiFIGHT.
        </h5>
        <h5>4) The battle will begin!</h5>
      </div>
      <div className="parent-pokiCard">
        {data &&
          data.map((poki, index) => {
            const img = dataImg.find(
              (i) => i.name === poki.name.english.toLowerCase()
            );
            return <PokiCardOnLanding poki={poki} index={index} img={img} />;
          })}
      </div>
    </div>
  );
}
