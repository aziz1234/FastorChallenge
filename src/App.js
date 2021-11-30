import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Share from "./components/share";
import "./styles.css";

export default function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/share" element={<Share />} />
      </Routes>
    </div>
  );
}
