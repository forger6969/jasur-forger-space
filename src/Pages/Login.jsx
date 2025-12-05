import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import mars_logo from '../assets/mars_logo.webp'
export default function Login() {
  const [userIdLogin, setUserIdLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://space-back-rnyc.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userIdLogin, // backend kutayotgan nom
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login xato!");
        return;
      }

      // Successful login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      navigate("/");

    } catch (err) {
      console.error("Server bilan aloqa yo‘q:", err);
      alert("Server ishlamayapti!");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <header className="w-full flex justify-between items-center px-10 py-5">
        <img
          src={mars_logo}
          alt="Mars Logo"
          className="h-6"
        />
        <div className="flex items-center gap-2 text-sm font-medium text-[#1E1E1E]">
          O'zb
        </div>
      </header>

      <main className="flex flex-1 items-center justify-start bg-gradient-to-br from-[#d1dcff] to-[#f5d5ff] relative overflow-hidden pl-[8%]">
        <div className="absolute inset-0">
          <img
            src="https://space.marsit.uz/img/auth-bg.ad12831f.webp"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 bg-white rounded-2xl shadow-lg w-[420px] px-10 py-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-[#1E1E1E]">Tizimga kirish</h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <input
              type="number"
              placeholder="Login ID"
              value={userIdLogin}
              onChange={(e) => setUserIdLogin(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#f97316]"
            />

            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#f97316]"
            />

            <button
              type="submit"
              className="bg-[#f97316] text-white font-semibold py-2 rounded-lg hover:bg-[#ea580c] transition"
            >
              Kirish
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
