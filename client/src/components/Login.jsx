export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div className="p-4">
      <h3>🔐 Login Page</h3>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with GitHub
      </button>
    </div>
  );
}
