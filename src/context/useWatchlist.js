import { useContext } from "react";
import { WatchlistContext } from "./WatchlistContext";

export function useWatchlist() {
  return useContext(WatchlistContext);
}
