import { useQuery } from "react-query";
import axios from "axios";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemon = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(POKEMON_API).then((res) => res.data.results);
};

function App() {
  const { isSuccess, isLoading, isError, error, data } = useQuery("pokemon", fetchPokemon);
  if (isLoading) return "Loading....";
  if (isError) return <div>{error.message}</div>;
  return <div>{isSuccess && data.map((pokemon) => <div>{pokemon.name}</div>)}</div>;
}

export default App;
