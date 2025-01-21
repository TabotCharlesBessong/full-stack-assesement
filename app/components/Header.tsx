"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    // onSignOut();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <a href="/" className="flex items-center">
        <h1 className="text-xl font-bold">Kodschul Management Hub</h1>
      </a>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.username.split("@")[0].toUpperCase()}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
