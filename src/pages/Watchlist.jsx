import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Dices, RotateCcw, Star, Trash2, X } from "lucide-react";
import { imageUrl } from "../api/tmdb";
import { useAuth } from "../context/useAuth";
import { useWatchlist } from "../context/useWatchlist";
import Eyes from "../components/Eyes";

const tabs = [
  { id: "toWatch", label: "To watch" },
  { id: "seen", label: "Seen" },
];

const sorts = {
  recent: (a, b) => b.addedAt - a.addedAt,
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title),
};

const Watchlist = () => {
  const { user } = useAuth();
  const { watchlist, toggleSeen, removeFromWatchlist } = useWatchlist();
  const [activeTab, setActiveTab] = useState("toWatch");
  const [sortBy, setSortBy] = useState("recent");
  const [tonightPick, setTonightPick] = useState(null);

  const toWatch = watchlist.filter((item) => !item.seen);
  const seen = watchlist.filter((item) => item.seen);
  const visible = [...(activeTab === "toWatch" ? toWatch : seen)].sort(sorts[sortBy]);
  const counts = { toWatch: toWatch.length, seen: seen.length };

  const pickForTonight = () => {
    if (toWatch.length === 0) return;
    const random = toWatch[Math.floor(Math.random() * toWatch.length)];
    setTonightPick(random);
  };

  return (
    <div className="px-5 pt-10 pb-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-['Instrument_Serif',serif] text-3xl italic md:text-4xl">
          Hey {user.firstName || user.username},
        </p>
        <h1 className="mt-2 text-6xl leading-[0.85] font-extrabold tracking-tighter md:text-8xl">
          you're keeping an eye on{" "}
          <span className="text-[#FF5A36]">{watchlist.length}</span>{" "}
          {watchlist.length === 1 ? "title" : "titles"}.
        </h1>

        <div className="mt-10 flex flex-col gap-4 border-b-2 border-[#1E1B4B] pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer pb-2 text-xl font-bold transition-colors ${
                  activeTab === tab.id ? "text-[#1E1B4B]" : "text-[#1E1B4B]/40 hover:text-[#1E1B4B]"
                }`}
              >
                {tab.label} ({counts[tab.id]})
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="watchlistTab"
                    className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#FF5A36]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative flex items-center gap-2 text-sm font-semibold">
              Sort
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="cursor-pointer appearance-none rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] py-1.5 pr-9 pl-4 font-bold outline-none"
              >
                <option value="recent">Recently added</option>
                <option value="rating">Best rating</option>
                <option value="title">A to Z</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3" />
            </label>
            <button
              onClick={pickForTonight}
              disabled={toWatch.length === 0}
              className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-4 py-1.5 text-sm font-bold shadow-[3px_3px_0_0_#1E1B4B] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Dices size={16} />
              Pick for tonight
            </button>
          </div>
        </div>

        <AnimatePresence>
          {tonightPick && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 flex items-center gap-4 rounded-3xl bg-[#1E1B4B] p-4 text-[#FFF7E8]">
                <img
                  src={imageUrl(tonightPick.poster, "w92")}
                  alt={tonightPick.title}
                  width="92"
                  height="138"
                  className="w-16 rounded-xl border-2 border-[#FFD166]"
                />
                <div className="flex-1">
                  <p className="font-['Instrument_Serif',serif] text-lg text-[#FFD166] italic">Tonight you watch...</p>
                  <Link
                    to={`/title/${tonightPick.type}/${tonightPick.id}`}
                    className="text-2xl font-extrabold hover:text-[#FF5A36] md:text-3xl"
                  >
                    {tonightPick.title}
                  </Link>
                </div>
                <button
                  onClick={() => setTonightPick(null)}
                  aria-label="Close pick"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-[#FFF7E8]/10"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <Eyes className="h-28 w-auto" closed={activeTab === "seen"} />
            <p className="mt-6 font-['Instrument_Serif',serif] text-4xl italic">
              {activeTab === "toWatch"
                ? "Nothing here yet."
                : "You haven't watched anything yet."}
            </p>
            <p className="mt-2 max-w-sm text-[#1E1B4B]/60">
              {activeTab === "toWatch"
                ? "Press the + on any movie or series and it will wait for you here."
                : "When you finish something, mark it as seen and it moves here."}
            </p>
            <Link
              to="/explore"
              className="mt-6 rounded-full border-2 border-[#1E1B4B] bg-[#FF5A36] px-6 py-3 font-bold text-[#FFF7E8] shadow-[3px_3px_0_0_#1E1B4B]"
            >
              Find something
            </Link>
          </div>
        ) : (
          <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.li
                  layout
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -60 }}
                  className="flex gap-4 rounded-3xl border-2 border-[#1E1B4B] bg-[#FFF7E8] p-3 shadow-[3px_3px_0_0_#1E1B4B]"
                >
                  <Link to={`/title/${item.type}/${item.id}`} className="shrink-0">
                    <img
                      src={imageUrl(item.poster, "w154")}
                      alt={item.title}
                      loading="lazy"
                      width="154"
                      height="231"
                      className={`w-20 rounded-2xl border-2 border-[#1E1B4B] object-cover md:w-24 ${
                        item.seen ? "grayscale" : ""
                      }`}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div>
                      <Link
                        to={`/title/${item.type}/${item.id}`}
                        className="line-clamp-2 text-xl leading-tight font-extrabold hover:text-[#FF5A36]"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 flex items-center gap-2 text-sm text-[#1E1B4B]/60">
                        {item.type === "tv" ? "Series" : "Movie"} · {item.year}
                        {item.rating > 0 && (
                          <span className="flex items-center gap-1 font-bold text-[#1E1B4B]">
                            <Star size={12} fill="currentColor" className="text-[#FF5A36]" />
                            {item.rating.toFixed(1)}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSeen(item)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[#1E1B4B] px-3 py-1.5 text-sm font-bold transition ${
                          item.seen ? "bg-[#FFF7E8] hover:bg-[#FFD166]" : "bg-[#FFD166] hover:bg-[#FFF7E8]"
                        }`}
                      >
                        {item.seen ? <RotateCcw size={15} /> : <Check size={15} />}
                        {item.seen ? "Watch again" : "Seen it"}
                      </button>
                      <button
                        onClick={() => removeFromWatchlist(item)}
                        aria-label={`Remove ${item.title}`}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#1E1B4B] transition hover:bg-[#FF5A36] hover:text-[#FFF7E8]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
