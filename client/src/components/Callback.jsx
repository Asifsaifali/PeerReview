import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional — auto redirect to profile
    navigate("/profile", { replace: true });
  }, [navigate]);

  return <div className="p-4">🔁 Redirecting to your profile...</div>;
}
