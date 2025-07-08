import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me", {
        withCredentials: true, // ⬅️ critical for session cookie
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate("/", { replace: true }); // not logged in
      });
  }, [navigate]);

  if (!user) return <p>Loading your GitHub profile...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">👋 Hello, {user.username}!</h1>
      <img
        src={user.avatar}
        alt="GitHub Avatar"
        className="w-16 rounded-full mt-2"
      />

      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        onClick={() => {
          axios
            .get("http://localhost:3000/auth/logout", { withCredentials: true })
            .then(() => {
              navigate("/", { replace: true });
            })
            .catch((err) => {
              console.error("Logout error:", err.message);
            });
        }}
      >
        Logout
      </button>
    </div>
  );
}
