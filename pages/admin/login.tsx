import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - TemitopeGX</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#FFDE00] relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute left-20 top-40 w-32 h-32 bg-[#2B3FF3] transform -rotate-12 shadow-brutal animate-float" />
        <div className="absolute right-32 top-20 w-32 h-32 bg-[#FF90E8] transform rotate-12 shadow-brutal animate-float delay-150" />
        <div className="absolute left-1/4 bottom-20 w-24 h-24 bg-[#2B3FF3] transform rotate-45 shadow-brutal animate-float delay-300" />
        <div className="absolute right-1/4 bottom-32 w-24 h-24 bg-[#FF90E8] transform -rotate-12 shadow-brutal animate-float delay-500" />

        {/* Login Form */}
        <div className="neo-brutalism-white p-12 w-full max-w-md mx-4 transform hover:rotate-1 transition-transform duration-200">
          <div className="flex justify-center mb-8">
            <div className="bg-[#2B3FF3] text-white p-4 transform -rotate-3 shadow-brutal">
              <h1 className="text-3xl font-black">Admin Login</h1>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-black text-red-700 px-4 py-3 rounded mb-6 shadow-brutal">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-[#2B3FF3] shadow-brutal"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-[#2B3FF3] shadow-brutal"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#2B3FF3] focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2B3FF3] text-white p-4 text-lg font-bold border-2 border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
