import { Suspense } from "react";
import { Outlet } from "react-router";
import { ReactLenis } from "lenis/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import Loader from "../components/Loader";

const MainLayout = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main className="min-h-[70vh]">
        <Suspense fallback={<Loader text="Loading the page..." />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <div className="pointer-events-none fixed inset-0 z-[100] bg-[url(/noise.svg)] opacity-[0.07]" />
    </ReactLenis>
  );
};

export default MainLayout;
