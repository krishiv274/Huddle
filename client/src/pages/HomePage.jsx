import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800"></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="animate-float absolute top-16 left-8 w-3 h-3 bg-white/15 rounded-full"></div>
        <div className="animate-float-delay-1 absolute top-32 right-16 w-2 h-2 bg-purple-400/20 rounded-full"></div>
        <div className="animate-float-delay-2 absolute bottom-24 left-32 w-4 h-4 bg-blue-400/25 rounded-full"></div>
        <div className="animate-float absolute bottom-16 right-24 w-3 h-3 bg-violet-400/20 rounded-full"></div>
        <div className="animate-float-delay-1 absolute top-1/2 left-16 w-2 h-2 bg-pink-400/15 rounded-full"></div>
        <div className="animate-float-delay-2 absolute top-1/3 right-32 w-3 h-3 bg-indigo-400/20 rounded-full"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full p-4 sm:px-[8%] sm:py-[3%] animate-fade-in">
        <div
          className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden h-full grid grid-cols-1 relative shadow-2xl transition-all duration-300 hover:shadow-purple-500/10 ${
            selectedUser
              ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
              : "md:grid-cols-2"
          }`}
        >
          <div className="animate-slide-in-left overflow-hidden">
            <Sidebar />
          </div>
          <div className="animate-slide-in-up overflow-hidden">
            <ChatContainer />
          </div>
          <div className="animate-slide-in-right overflow-hidden">
            <RightSidebar />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.6;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 10s ease-in-out infinite 3s;
        }

        .animate-float-delay-2 {
          animation: float 12s ease-in-out infinite 6s;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out 0.2s both;
        }

        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out 0.1s both;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
