import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemon = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(POKEMON_API).then((res) => res.data.results);
};

function Pokemon() {
  const { isSuccess, isLoading, isError, error, data, isFetching } = useQuery("pokemon", fetchPokemon, {
    refetchOnWindowFocus: true,
    staleTime: 5000, // query considered fresh for 5 seconds
    cacheTime: 2000, // daata remain in cache for N seconds or Infinity or 0
  });
  if (isLoading) return "Loading....";
  if (isError) return <div>{error.message}</div>;
  if (isSuccess) {
    return (
      <div>
        {data.map((pokemon) => (
          <div>{pokemon.name}</div>
        ))}
        {isFetching ? "Fetching..." : null}
      </div>
    );
  }
}
function App() {
  const [show, setShow] = React.useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>show</button>
      {show ? <Pokemon /> : null}
    </>
  );
}

export default App;
