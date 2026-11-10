import axios from "axios";

const { VITE_TMDB_TOKEN } = import.meta.env;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
  },
});

export const imageUrl = (path, size = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export default tmdb;
