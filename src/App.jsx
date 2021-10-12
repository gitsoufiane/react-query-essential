import React from "react";
import { Pokemon, usePokemon } from "./components/Pokemon";
import { Berry } from "./components/Berry";

function Count() {
  const { isSuccess, data } = usePokemon();

  return <h3>Pokemon Count : {isSuccess && data.length}</h3>;
}
function App() {
  const [show, setShow] = React.useState(true);
  const [name, setName] = React.useState("");
  return (
    <>
      <button onClick={() => setShow(!show)}>show</button>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <Count />
      {show ? <Pokemon pokemonName={name} /> : null}
      <div>--------------------------------------</div>
      {show ? <Berry /> : null}
    </>
  );
}

export default App;
