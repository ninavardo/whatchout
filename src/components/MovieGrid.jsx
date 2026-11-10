import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.type}-${movie.id}`} movie={movie} index={index} />
      ))}
    </div>
  );
};

export default MovieGrid;
