import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NavTab from "./components/NavTab.jsx";
import Footer from "./components/Footer.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UserSetting from "./components/UserSetting.jsx";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserData(token);
  }, []);

  const fetchUserData = (token) => {
    fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/navtab" element={<NavTab />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/users" element={<UserProfile />} />
        <Route path="/settings" element={<UserSetting />} />
      </Routes>
    </div>
  );
}

export default App;
