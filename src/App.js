import "./App.css";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena";
import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState();

  const players = [
    { id: 1, name: "Player 1", score: 100 },
    { id: 2, name: "Player 2", score: 80 },
    { id: 3, name: "Player 3", score: 99 },
  ];

  const fetchData = async () => {
    try {
      const res = await fetch("https://pokigameback.onrender.com/pokemon");
      const data = await res.json();
      setData(data.allPokemon);
      // console.log("test data", data);
    } catch (error) {
      console.log("data not working");
    }
  };

  const fetchDataImg = async () => {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
      );
      const dataImg = await res.json();
      setDataImg(dataImg.results);
      // console.log("test dataImg", dataImg.results);
    } catch (e) {
      console.log("dataImg not working");
    }
  };
  // console.log("App.js IMG DATA:", dataImg);
  // console.log("This is single pokemon", data[0])
  // console.log("App JS server data", serverData)

  useEffect(() => {
    fetchData();
    fetchDataImg();
  }, []);

  useEffect(() => {
    fetchDataImg();
  }, [data]);

  return (
    <div className="App">
      <Routes>
        {console.log("Selected Poke", selectedPoke)}
        <Route
          path="/"
          element={
            <LandingPage
              data={data}
              dataImg={dataImg}
              setSelectedPoke={setSelectedPoke}
            />
          }
        />
        <Route
          path="/pokemon/arena"
          element={<Arena selectedPoke={selectedPoke} dataImg={dataImg} />}
        />
        <Route
          path="/pokemon/leaderboard"
          element={<Leaderboard players={players} />}
        />
      </Routes>
    </div>
  );
}

export default App;
