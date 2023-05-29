import "./App.css";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch("http://localhost:5001/pokemon");
    const data = await res.json();
    setData(data);
    console.log("test data", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Container sx={{ width: 900 }}>
        <Routes>
          <Route path="/" element={<LandingPage data={data} />} />
          <Route path="/pokemon/:id" element={<Modal />} />
          <Route path="/pokemon/arena" element={<Arena />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
