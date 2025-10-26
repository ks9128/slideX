import "./App.css";
import { Outlet, useLocation } from "react-router";
import Header from "./components/custom/Header";
import Hero from "./components/custom/Hero";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const location = useLocation();

  // Only show Header and Hero on the root path
  const showHeaderAndHero = location.pathname === "/";

  return (
    <>
      {showHeaderAndHero && <Header />}
      {showHeaderAndHero && <Hero />}
      <Outlet />
      <Analytics />
    </>
  );
}

export default App;
