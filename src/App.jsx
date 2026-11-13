import { lazy } from "react";
import { Route, Routes } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthProvider";
import { WatchlistProvider } from "./context/WatchlistProvider";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const Explore = lazy(() => import("./pages/Explore"));
const Details = lazy(() => import("./pages/Details"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/title/:type/:id" element={<Details />} />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Analytics />
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
