import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import assets from "../assets/assets";
import "../styles/animations.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    const credentials = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    const state = isLogin ? "login" : "signup";
    await login(state, credentials);
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Additional gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-blue-300/40 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-indigo-300/40 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-purple-200/30 rounded-full animate-bounce delay-800"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none"></div>

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 rounded-3xl shimmer-effect opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-3xl border border-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome to{" "}
                <span className="gradient-text bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Huddle
                </span>
              </h1>
              <p className="text-white/80 text-lg">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/30 outline-none transition-all duration-300 hover:bg-white/25"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/30 outline-none transition-all duration-300 hover:bg-white/25"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/30 outline-none transition-all duration-300 hover:bg-white/25"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/30 outline-none transition-all duration-300 hover:bg-white/25"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? "bg-gray-500/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Toggle between Login and Signup */}
            <div className="mt-8 text-center">
              <p className="text-white/80 text-lg">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 underline underline-offset-2"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Additional Features */}
            {isLogin && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="text-sm text-white/60 hover:text-white/80 transition-colors duration-200 underline underline-offset-2"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
