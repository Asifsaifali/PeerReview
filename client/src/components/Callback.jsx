import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  if (code) {
    fetch(`http://localhost:3000/auth/github/callback?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("GitHub User:", data.user);
        localStorage.setItem("githubUser", JSON.stringify(data.user));
        navigate("/");
      })
      .catch((err) => {
        console.error("GitHub auth failed", err);
      });
  }
}, []);


  return (
    <div className="p-4">
      {loading ? "Authenticating with GitHub..." : "Redirecting..."}
    </div>
  );
}
