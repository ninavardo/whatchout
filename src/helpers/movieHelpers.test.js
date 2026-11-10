import { describe, it, expect } from "vitest";
import { formatRuntime, getYear, toCard } from "./movieHelpers";

describe("formatRuntime", () => {
  it("formats minutes into hours and minutes", () => {
    expect(formatRuntime(135)).toBe("2h 15m");
  });

  it("works with full hours and short movies", () => {
    expect(formatRuntime(120)).toBe("2h");
    expect(formatRuntime(45)).toBe("45m");
  });

  it("returns unknown when there is no runtime", () => {
    expect(formatRuntime(0)).toBe("unknown");
    expect(formatRuntime(undefined)).toBe("unknown");
  });
});

describe("getYear and toCard", () => {
  it("takes the year from movies and series", () => {
    expect(getYear({ release_date: "2024-03-01" })).toBe("2024");
    expect(getYear({ first_air_date: "2019-07-12" })).toBe("2019");
  });

  it("turns a tv show from the api into a card object", () => {
    const show = {
      id: 1,
      name: "Dark",
      first_air_date: "2017-12-01",
      poster_path: "/dark.jpg",
      vote_average: 8.4,
    };

    expect(toCard(show, "tv")).toMatchObject({
      id: 1,
      type: "tv",
      title: "Dark",
      year: "2017",
      rating: 8.4,
    });
  });
});
