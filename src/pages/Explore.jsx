import { useRef } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import ExploreResults from "../components/explore/ExploreResults";

const types = [
  { id: "movie", label: "Movies" },
  { id: "tv", label: "Series" },
];

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") === "tv" ? "tv" : "movie";
  const inputRef = useRef(null);

  const updateParams = (newQuery, newType) => {
    const params = { type: newType };
    if (newQuery) params.q = newQuery;
    setSearchParams(params);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateParams(inputRef.current.value.trim(), type);
  };

  const handleClear = () => {
    inputRef.current.value = "";
    updateParams("", type);
  };

  return (
    <div className="px-5 pt-10 pb-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="text-7xl leading-[0.85] font-extrabold tracking-tighter md:text-9xl">
            {query ? (
              <>
                <span className="block font-['Instrument_Serif',serif] text-4xl font-normal tracking-normal italic md:text-5xl">
                  results for
                </span>
                <span className="text-[#FF5A36]">"{query}"</span>
              </>
            ) : (
              <>
                Explore<span className="text-[#FF5A36]">.</span>
              </>
            )}
          </h1>

          <div className="relative flex w-fit rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] p-1">
            {types.map((item) => (
              <button
                key={item.id}
                onClick={() => updateParams(query, item.id)}
                className={`relative cursor-pointer rounded-full px-5 py-2 font-bold transition-colors ${
                  type === item.id ? "text-[#FFF7E8]" : ""
                }`}
              >
                {type === item.id && (
                  <motion.span
                    layoutId="typeToggle"
                    className="absolute inset-0 rounded-full bg-[#1E1B4B]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          key={query}
          onSubmit={handleSearch}
          className="mt-8 flex items-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] p-1.5 shadow-[6px_6px_0_0_#1E1B4B]"
        >
          <Search className="ml-3 shrink-0" size={22} />
          <input
            ref={inputRef}
            type="text"
            defaultValue={query}
            placeholder={type === "tv" ? "Search a series..." : "Search a movie..."}
            aria-label="Search"
            className="w-full bg-transparent py-2.5 text-lg outline-none placeholder:text-[#1E1B4B]/40"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-[#FFD166]"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded-full bg-[#FF5A36] px-6 py-2.5 font-bold text-[#FFF7E8] transition hover:bg-[#1E1B4B]"
          >
            Search
          </button>
        </form>

        <ExploreResults key={`${type}-${query}`} type={type} query={query} />
      </div>
    </div>
  );
};

export default Explore;
