import {
  Zap,
  HeartCrack,
  Laugh,
  Compass,
  Ghost,
  Rocket,
  Palette,
  Search,
} from "lucide-react";

const moods = [
  { id: "rush", label: "Heart racing", genres: "28|53", icon: Zap },
  { id: "cry", label: "I need a good cry", genres: "18,10749", icon: HeartCrack },
  { id: "laugh", label: "Make me laugh", genres: "35", icon: Laugh },
  { id: "escape", label: "Take me far away", genres: "12|14", icon: Compass },
  { id: "scare", label: "Scare me a little", genres: "27", icon: Ghost },
  { id: "space", label: "Space & future", genres: "878", icon: Rocket },
  { id: "cartoon", label: "Animated stuff", genres: "16", icon: Palette },
  { id: "mystery", label: "Who did it?", genres: "9648|80", icon: Search },
];

export default moods;
