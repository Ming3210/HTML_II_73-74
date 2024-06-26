import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Admin from "./components/Admin";

const Home = ({ redirect }: { redirect: () => void }) => {
  return (
    <div>
      <button onClick={redirect}>Go to admin page</button>
    </div>
  );
};

export default function App() {
  const [active, setActive] = useState<boolean>(true);
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/admin");
    setActive(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home redirect={redirect} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
