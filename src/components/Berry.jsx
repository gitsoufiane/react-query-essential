import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const BERRIES_API = "https://pokeapi.co/api/v2/berry";

const fetchBerries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return axios.get(BERRIES_API).then((res) => res.data.results);
};

const useBerries = () => {
  return useQuery(["berries"], fetchBerries, {
    refetchOnWindowFocus: true,
    staleTime: 5000, // query considered fresh for 5 seconds
    cacheTime: 2000, // daata remain in cache for N seconds or Infinity or 0
  });
};

export function Berry() {
  const { isSuccess, isLoading, isError, error, data, isFetching } = useBerries();
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
