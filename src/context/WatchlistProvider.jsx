import { useEffect, useState } from "react";
import { WatchlistContext } from "./WatchlistContext";
import { useAuth } from "./useAuth";

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("watchlists");
    return savedLists ? JSON.parse(savedLists) : {};
  });

  useEffect(() => {
    localStorage.setItem("watchlists", JSON.stringify(lists));
  }, [lists]);

  const owner = user?.username;
  const watchlist = owner ? lists[owner] || [] : [];

  const updateList = (updater) => {
    if (!owner) return;
    setLists((prevState) => ({
      ...prevState,
      [owner]: updater(prevState[owner] || []),
    }));
  };

  const isSame = (item, movie) =>
    item.id === movie.id && item.type === movie.type;

  const isInWatchlist = (id, type) =>
    watchlist.some((item) => item.id === id && item.type === type);

  const toggleWatchlist = (movie) => {
    updateList((list) =>
      list.some((item) => isSame(item, movie))
        ? list.filter((item) => !isSame(item, movie))
        : [{ ...movie, seen: false, addedAt: Date.now() }, ...list],
    );
  };

  const toggleSeen = (movie) => {
    updateList((list) =>
      list.map((item) =>
        isSame(item, movie) ? { ...item, seen: !item.seen } : item,
      ),
    );
  };

  const removeFromWatchlist = (movie) => {
    updateList((list) => list.filter((item) => !isSame(item, movie)));
  };

  const toWatchCount = watchlist.filter((item) => !item.seen).length;

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        toWatchCount,
        isInWatchlist,
        toggleWatchlist,
        toggleSeen,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
