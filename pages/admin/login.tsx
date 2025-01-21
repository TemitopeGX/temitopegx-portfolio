"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [cursorVariant, setCursorVariant] = useState("default");

  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await login(credentials.email, credentials.password);
      router.push("/admin/products");
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

  return (
    <Layout>
      <Head>
        <title>Admin Login - TemitopeGX</title>
        <meta name="description" content="Secure admin login portal" />
      </Head>

      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="minimalist-section relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-10" />
            <div className="grid-pattern opacity-5" />
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-r from-[#2B3FF3]/20 to-[#6F3FF3]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#6F3FF3]/20 to-[#2B3FF3]/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-40 h-40 border border-[#2B3FF3]/20 rounded-full animate-float" />
          <div className="absolute bottom-20 left-20 w-32 h-32 border border-[#6F3FF3]/20 rounded-full animate-float delay-500" />

          {/* Login Form */}
          <div className="minimalist-container relative z-10">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] animate-gradient">
                  Admin Access
                </h1>
                <p className="text-gray-600 text-lg">
                  Enter your credentials to continue
                </p>
              </div>

              <div className="glass-card p-[1px] rounded-2xl backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="space-y-5">
                    <div className="relative group">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2B3FF3] transition-colors"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-[#2B3FF3]/50 transition-all hover:bg-white/90"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                    <div className="relative group">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2B3FF3] transition-colors"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-[#2B3FF3]/50 transition-all hover:bg-white/90"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all flex items-center justify-center group relative overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="relative z-10 flex items-center">
                      {status === "loading" ? (
                        <>
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin mr-2"
                          />
                          Authenticating...
                        </>
                      ) : (
                        "Login to Dashboard"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6F3FF3] to-[#2B3FF3] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {status === "error" && (
                    <div className="bg-red-50 border border-red-100 text-red-500 text-sm rounded-xl p-4 text-center">
                      Invalid email or password. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
