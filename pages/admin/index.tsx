import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faLock,
  faUser,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await login(credentials.email, credentials.password);
      router.push("/admin/dashboard");
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return null;

  if (user) return null;

  return (
    <Layout>
      <Head>
        <title>Admin Login - TemitopeGX</title>
        <meta name="description" content="Secure admin login portal" />
      </Head>

      <div className="min-h-screen w-full flex items-center justify-center bg-dark p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-dark-200 rounded-2xl border border-neon-green/10 overflow-hidden">
            {/* Header */}
            <div className="bg-dark-300 p-6 border-b border-neon-green/10">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-2xl text-neon-green"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Admin Access
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Enter your credentials to continue
                  </p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-400 group-focus-within:text-neon-green transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-300 border border-neon-green/10 rounded-xl pl-12 pr-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="text-gray-400 group-focus-within:text-neon-green transition-colors"
                        />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-300 border border-neon-green/10 rounded-xl pl-12 pr-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 text-sm text-center">
                    Invalid email or password. Please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-neon-green text-dark font-semibold px-6 py-3 rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {status === "loading" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faShieldAlt} />
                      Login to Dashboard
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-[#2B3FF3] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Additional Info */}
                <p className="text-center text-gray-400 text-sm">
                  Protected area. Authorized personnel only.
                </p>
              </form>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -right-40 w-80 h-80 bg-neon-green/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2B3FF3]/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
