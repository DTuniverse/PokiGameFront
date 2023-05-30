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
  const [dataImg, setDataImg] = useState([])


  const fetchServerData = async () => {
    const res = await fetch("https://pokigameback.onrender.com/pokemon");
    const data = await res.json();
    setServerData(data)
    // console.log("test data", data);
  };

  const fetchData = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
    const data = await res.json();
    setData(data.results);
  };
  console.log("data from API", data);
  
  const fetchDataImg = async () => {
    const myArr =[]
    for (let i = 0; i < 100; i++) {
    const res = await fetch(data[i]?.url);
    const pokemon = await res.json();
    myArr.push(pokemon)
    setDataImg(myArr);
    }
  };

  console.log("App.js IMG DATA:", dataImg);
  console.log("This is single pokemon", data[0])
  console.log("App JS server data", serverData)
  
  useEffect(() => {
    fetchData();
    fetchServerData()
  }, []);

  useEffect(() => {
    fetchDataImg()
  },[data])

  return (
    <div className="App">
      <Container sx={{ width: 900 }}>
        <Routes>
          <Route path="/" element={<LandingPage serverData={serverData} dataImg={dataImg} />} />
          <Route path="/pokemon/:id" element={<Modal />} />
          <Route path="/pokemon/arena" element={<Arena />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
