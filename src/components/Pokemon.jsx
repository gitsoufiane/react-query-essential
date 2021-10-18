import React from "react";
import { useQuery } from "react-query";
import axios, { CancelToken } from "axios";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemon = async (pokemonName) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const source = CancelToken.source(); //query cancellation
  const promise = new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => {
      return axios.get(`${POKEMON_API}/${pokemonName}`, {
        cancelToken: source.token,
      });
    })
    .then((res) => res.data);

  promise.cancel = () => source.cancel("Query was Canceled by React Query");

  return promise;
};

export const usePokemon = (pokemonName = "") => {
  return useQuery(["pokemon", pokemonName], () => fetchPokemon(pokemonName), {
    refetchOnWindowFocus: false, // automatically refetch on windows focus
    staleTime: 5000, // query considered fresh for 5 seconds , Infinity
    cacheTime: 2000, // data remain in cache for N seconds or Infinity or 0
    enabled: !!pokemonName, // enable or disable a query
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
