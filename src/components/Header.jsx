import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/useAuth";
import { useWatchlist } from "../context/useWatchlist";
import geolabLogo from "../assets/geolab-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/watchlist", label: "Watchlist" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toWatchCount } = useWatchlist();
  const lenis = useLenis();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isOpen, lenis]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isOpen
            ? "bg-[#1E1B4B]"
            : "border-b-2 border-[#1E1B4B] bg-[#FFF7E8]/85 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo light={isOpen} onClick={closeMenu} />

          <nav className="hidden items-center gap-1 rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] p-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    isActive ? "bg-[#1E1B4B] text-[#FFF7E8]" : "hover:bg-[#FFD166]"
                  }`
                }
              >
                {link.label}
                {link.to === "/watchlist" && toWatchCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF5A36] px-1 text-xs text-[#FFF7E8]">
                    {toWatchCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] font-bold uppercase">
                    {user.firstName?.[0] || user.username[0]}
                  </span>
                  <span className="text-sm font-semibold">
                    Hi, {user.firstName || user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-1 rounded-full border-2 border-[#1E1B4B] px-3 py-1.5 text-sm font-semibold transition hover:bg-[#1E1B4B] hover:text-[#FFF7E8]"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full border-2 border-[#1E1B4B] bg-[#FF5A36] px-4 py-1.5 text-sm font-bold text-[#FFF7E8] shadow-[3px_3px_0_0_#1E1B4B] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  Join free
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 md:hidden ${
              isOpen
                ? "border-[#FFD166] bg-[#FFD166] text-[#1E1B4B]"
                : "border-[#1E1B4B] bg-[#FFF7E8] text-[#1E1B4B]"
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Mobile menu"
            initial={{ clipPath: "circle(0% at 90% 0%)" }}
            animate={{ clipPath: "circle(150% at 90% 0%)" }}
            exit={{ clipPath: "circle(0% at 90% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#1E1B4B] px-6 pt-28 pb-8 text-[#FFF7E8] md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 text-6xl font-extrabold tracking-tight ${
                        isActive ? "text-[#FF5A36]" : "text-[#FFF7E8]"
                      }`
                    }
                  >
                    <span className="font-['Instrument_Serif',serif] text-xl font-normal text-[#FFD166] italic">
                      0{index + 1}
                    </span>
                    {link.label}
                    {link.to === "/watchlist" && toWatchCount > 0 && (
                      <span className="text-xl text-[#FFD166]">({toWatchCount})</span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#FFF7E8] py-3 font-bold"
                >
                  <LogOut size={18} />
                  Log out ({user.username})
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-full border-2 border-[#FFF7E8] py-3 text-center font-bold"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-full bg-[#FF5A36] py-3 text-center font-bold"
                  >
                    Join free
                  </Link>
                </div>
              )}
              <a
                href="https://geolab.edu.ge"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-[#FFF7E8]/60"
              >
                <img
                  src={geolabLogo}
                  alt="Geolab"
                  width="22"
                  height="30"
                  className="h-8 w-auto"
                />
                Final project at Geolab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
