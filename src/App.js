import { Route, Routes } from "react-router-dom";
import Core from "./components/Core";
import Navbar from "./components/Navbar";
import "./App.css";
import PokemonDetail from "./components/PokemonDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Core />} />
        <Route path="/pokemonDetail/:id" element={<PokemonDetail/>}  />
      </Routes>
    </>
  );
}
