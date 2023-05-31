import "./App.css";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";

function App() {
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [serverData, setServerData ] = useState()
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [ selectedPoke, setSelectedPoke] = useState();

  
  const fetchData = async () => {
    try {  
    const res = await fetch("https://pokigameback.onrender.com/pokemon");
    const data = await res.json();
    setData(data.allPokemon);
    // console.log("test data", data);
    } catch (error) {
      console.log("data not working")
    }
  };

  const fetchDataImg = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
      const dataImg = await res.json();
      setDataImg(dataImg.results);
      // console.log("test dataImg", dataImg.results);
    } catch(e){
      console.log("dataImg not working")
    } 
  };
  console.log("App.js IMG DATA:", dataImg);
  console.log("This is single pokemon", data[0])
  console.log("App JS server data", serverData)
  
  useEffect(() => {
    fetchData();
    fetchDataImg();
  }, []);

  useEffect(() => {
    fetchDataImg()
  },[data])

  return (
    <div className="App">
      <Container sx={{ width: 900 }}>
        <Routes>
          {console.log("Selected Poke", selectedPoke)}
          <Route path="/" element={<LandingPage data={data} dataImg={dataImg} setSelectedPoke={setSelectedPoke} />} />
          <Route path="/pokemon/:id" element={<Modal />} />
          <Route path="/pokemon/arena" element={<Arena selectedPoke={selectedPoke} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
