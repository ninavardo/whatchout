# watchout

This is my final project for the React course at Geolab.

watchout is a website where you can find movies and series to watch. I took some ideas from TMDB and JustWatch but wanted to make it more fun, so you can also pick a movie by your mood, by how much time you have, or just spin the roulette if you can't decide.

## What you can do

- search movies and series
- filter by genre and sort them
- open a movie and see the trailer, cast and where to watch it
- register / log in and save movies to your watchlist
- mark movies as seen

## What I used

- React + Vite
- Tailwind CSS
- React Router
- Axios (for TMDB API)
- React Hook Form + Yup (for login and register)
- Motion and Lenis (for animations and smooth scroll)
- Vitest + React Testing Library (for tests)

Movies come from the TMDB API. For login I used DummyJSON, you can log in with `emilys` and password `emilyspass`, or just create a new account.

## How to run

1. `npm install`
2. make a `.env` file (you can copy `.env.example`) and put your TMDB token there
3. `npm run dev`

To run tests: `npm run test`
