import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/custom/Header";
import Hero from "./components/custom/Hero";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}
      <Outlet />
    </>
  );
}

export default App;
