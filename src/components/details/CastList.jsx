import { motion } from "motion/react";
import { User } from "lucide-react";
import { imageUrl } from "../../api/tmdb";

const CastList = ({ cast }) => {
  if (cast.length === 0) return null;

  return (
    <div className="-mx-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-4 overflow-x-auto px-5 pb-4">
      {cast.map((person, index) => (
        <motion.div
          key={person.credit_id}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(index, 8) * 0.05 }}
          className="w-32 shrink-0 md:w-36"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-2xl border-2 border-[#1E1B4B] bg-[#FFD166]">
            {person.profile_path ? (
              <img
                src={imageUrl(person.profile_path, "w185")}
                alt={person.name}
                loading="lazy"
                decoding="async"
                width="185"
                height="247"
                className="h-full w-full object-cover grayscale transition duration-300 hover:grayscale-0"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <User size={40} />
              </div>
            )}
          </div>
          <p className="mt-2 leading-tight font-bold">{person.name}</p>
          <p className="text-sm text-[#1E1B4B]/60">{person.character}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CastList;
