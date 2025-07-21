import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="animate-float absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="animate-float-delay-1 absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full"></div>
        <div className="animate-float-delay-2 absolute bottom-32 left-20 w-3 h-3 bg-blue-400/40 rounded-full"></div>
        <div className="animate-float absolute bottom-20 right-32 w-5 h-5 bg-violet-400/25 rounded-full"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-12 max-w-6xl mx-auto px-6 max-lg:flex-col max-lg:gap-8">
        {/* Left Side - Brand */}
        <div className="flex flex-col items-center text-center animate-slide-in-left">
          <div className="mb-6 animate-bounce-gentle">
            <img
              src={assets.logo_icon}
              alt="Huddle Logo"
              className="w-32 h-32 max-sm:w-32 max-sm:h-32 drop-shadow-2xl"
            />
          </div>
          <h1 className="text-6xl max-sm:text-4xl font-bold mb-4 animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
            Huddle
          </h1>
          <p className="text-xl max-sm:text-lg text-white/80 max-w-md leading-relaxed">
            Connect, collaborate, and communicate seamlessly with your team
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md animate-slide-in-right">
          <form
            onSubmit={onSubmitHandler}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 flex justify-between items-center">
                {currState}
                {isDataSubmitted && (
                  <img
                    onClick={() => setIsDataSubmitted(false)}
                    src={assets.arrow_icon}
                    alt="Back"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200 filter invert"
                  />
                )}
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {currState === "Sign up" && !isDataSubmitted && (
                <div className="animate-fade-in">
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

              {!isDataSubmitted && (
                <div className="space-y-6 animate-fade-in">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              )}

              {currState === "Sign up" && isDataSubmitted && (
                <div className="animate-fade-in">
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    rows={4}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us a bit about yourself..."
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                {currState === "Sign up" ? "Create Account" : "Login Now"}
              </button>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 focus:ring-purple-400"
                />
                <p>I agree to the terms of use & privacy policy.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              {currState === "Sign up" ? (
                <p className="text-sm text-white/70">
                  Already have an account?
                  <span
                    onClick={() => {
                      setCurrState("Login");
                      setIsDataSubmitted(false);
                    }}
                    className="font-semibold text-purple-300 hover:text-purple-200 cursor-pointer ml-1 transition-colors duration-200"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm text-white/70">
                  Don't have an account?
                  <span
                    onClick={() => setCurrState("Sign up")}
                    className="font-semibold text-purple-300 hover:text-purple-200 cursor-pointer ml-1 transition-colors duration-200"
                  >
                    Sign up here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 8s ease-in-out infinite 2s;
        }

        .animate-float-delay-2 {
          animation: float 7s ease-in-out infinite 4s;
        }

        .animate-bounce-gentle {
          animation: bounce 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 3s ease infinite;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out 0.2s both;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
