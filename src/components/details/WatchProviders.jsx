import { imageUrl } from "../../api/tmdb";

const groups = [
  { id: "flatrate", label: "Stream" },
  { id: "rent", label: "Rent" },
  { id: "buy", label: "Buy" },
];

const WatchProviders = ({ providers }) => {
  const region = providers?.GE ? "GE" : providers?.US ? "US" : null;
  const data = region ? providers[region] : null;
  const available = groups.filter((group) => data?.[group.id]?.length);

  return (
    <div className="rounded-3xl border-2 border-[#1E1B4B] bg-[#FFF7E8] p-5 shadow-[6px_6px_0_0_#1E1B4B]">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold">Where to watch</h3>
        {region && (
          <span className="rounded-full bg-[#1E1B4B] px-2 py-0.5 text-xs font-bold text-[#FFF7E8]">
            {region}
          </span>
        )}
      </div>

      {available.length === 0 ? (
        <p className="mt-3 text-sm text-[#1E1B4B]/60">
          Nobody is streaming this right now. Keep an eye on it, it might show
          up soon.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {available.map((group) => (
            <div key={group.id}>
              <p className="mb-2 text-xs font-bold tracking-widest text-[#1E1B4B]/50 uppercase">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {data[group.id].map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={imageUrl(provider.logo_path, "w92")}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    loading="lazy"
                    width="44"
                    height="44"
                    className="h-11 w-11 rounded-xl border-2 border-[#1E1B4B]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-[11px] text-[#1E1B4B]/40">Streaming info by JustWatch</p>
    </div>
  );
};

export default WatchProviders;
