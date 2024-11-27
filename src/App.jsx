import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
