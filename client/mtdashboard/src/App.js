import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

export const config = {
  endpoint: `http://127.0.0.1:8080/`,
};

function App() {
  return (
    <div className="App ">
      <NavBar />
      <div className="flex flex-row justify-center m-[-100px]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
