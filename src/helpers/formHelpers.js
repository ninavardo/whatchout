export const inputClass = (error) =>
  `w-full rounded-2xl border-2 bg-white/60 px-4 py-3 outline-none transition focus:bg-white focus:shadow-[3px_3px_0_0_#1E1B4B] ${
    error ? "border-[#FF5A36]" : "border-[#1E1B4B]"
  }`;

export const createToken = (username) =>
  btoa(`${username}:${Date.now()}:${Math.random().toString(36).slice(2)}`);
