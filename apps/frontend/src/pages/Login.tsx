import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const doLogin = async () => {
    if (!form.username || !form.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await api.post("/login", form, { withCredentials: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar sesión</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="button"
            onClick={doLogin}
            className={`w-full py-2 text-white text-sm font-semibold rounded-lg transition-colors ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
