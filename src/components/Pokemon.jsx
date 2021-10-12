import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemon = async (pokemonName) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(`${POKEMON_API}/${pokemonName}`).then((res) => res.data);
};

export const usePokemon = (pokemonName = "") => {
  return useQuery(["pokemon", pokemonName], () => fetchPokemon(pokemonName), {
    refetchOnWindowFocus: true,
    staleTime: 5000, // query considered fresh for 5 seconds
    cacheTime: 2000, // daata remain in cache for N seconds or Infinity or 0
    enabled: !!pokemonName,
  });
};

export function Pokemon({ pokemonName }) {
  const query = usePokemon(pokemonName);
  const { isSuccess, isLoading, isError, error, data, isFetching } = query;
  if (isLoading) return "Loading....";
  if (isError) return <div>{error.message}</div>;
  if (isSuccess) {
    return (
      <>
        {pokemonName === "" ? (
          <div>
            {data.results.map((pokemon) => (
              <div>{pokemon.name}</div>
            ))}
          </div>
        ) : (
          <img src={data?.sprites?.front_default} />
        )}
        {isFetching ? "Fetching..." : null}
      </>
    );
  }
  return null;
}
