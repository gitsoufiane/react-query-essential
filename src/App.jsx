import React from "react";
import { Pokemon, usePokemon } from "./components/Pokemon";
import { Berry } from "./components/Berry";

function Count() {
  const { isSuccess, data } = usePokemon();

  return <h3>Pokemon Count : {isSuccess && data.length}</h3>;
}
function App() {
  const [show, setShow] = React.useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>show</button>
      <Count />
      {show ? <Pokemon queryKey='pokemon1' /> : null}
      <div>--------------------------------------</div>
      {show ? <Berry queryKey='pokemon1' /> : null}
    </>
  );
}

export default App;
