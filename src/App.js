import "./App.css";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";
import data from "./data.json";
// console.log(data);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage data={data} />} />
        <Route path="/pokemon/:id" element={<Modal />} />
        <Route path="/pokemon/arena" element={<Arena />} />
      </Routes>
    </div>
  );
}

export default App;
