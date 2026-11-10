import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import { toCard } from "../helpers/movieHelpers";
import Hero from "../components/home/Hero";
import PosterMarquee from "../components/home/PosterMarquee";
import TopTen from "../components/home/TopTen";
import RuntimePicker from "../components/home/RuntimePicker";
import MoodPicker from "../components/home/MoodPicker";
import Roulette from "../components/home/Roulette";

const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await tmdb.get("/trending/all/week");
        const items = response.data.results
          .filter((item) => item.poster_path && item.backdrop_path)
          .map((item) => toCard(item));
        setTrending(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      <Hero />
      {trending.length > 0 && (
        <>
          <PosterMarquee movies={trending} />
          <TopTen movies={trending.slice(0, 10)} />
        </>
      )}
      <RuntimePicker />
      <MoodPicker />
      <Roulette />
    </>
  );
};

export default Home;
