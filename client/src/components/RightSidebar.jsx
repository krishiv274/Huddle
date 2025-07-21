import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-white/5 backdrop-blur-xl border-l border-white/20 text-white w-full relative flex flex-col transition-all duration-300 ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-scroll custom-scrollbar">
          {/* Profile Header */}
          <div className="pt-8 pb-6 flex flex-col items-center gap-4 text-center animate-fade-in">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-md opacity-30 animate-pulse"></div>
              <img
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 transition-all duration-300 hover:scale-105"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                {selectedUser.fullName}
              </h1>
              <p className="text-white/70 text-sm px-6 leading-relaxed max-w-xs">
                {selectedUser.bio}
              </p>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  onlineUsers.includes(selectedUser._id)
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    onlineUsers.includes(selectedUser._id)
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <hr className="border-white/20 mx-6 mb-6" />

          {/* Media Section */}
          <div className="px-6 mb-30 animate-slide-in-up">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-white">Media</h3>
              <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white/70">
                  {msgImages.length}
                </span>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {msgImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {msgImages.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => window.open(url)}
                      className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                    <img
                      src={assets.gallery_icon}
                      alt=""
                      className="w-6 h-6 opacity-50"
                    />
                  </div>
                  <p className="text-white/50 text-sm">No media shared yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Logout Button at Bottom */}
        <div className="p-6 border-t border-white/20 bg-white/5">
          <button
            onClick={() => logout()}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-none text-sm font-semibold py-3 px-8 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 mb-4"
          >
            Logout
          </button>

          {/* Footer Info */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <img
                src={assets.logo_icon}
                alt="Huddle"
                className="w-5 h-5 opacity-70"
              />
              <span className="text-xs font-medium text-white/60">Huddle</span>
            </div>
            <p className="text-xs text-white/40">
              Connect • Collaborate • Communicate
            </p>
          </div>
        </div>

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }

          .animate-slide-in-up {
            animation: slideInUp 0.6s ease-out 0.2s both;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(147, 51, 234, 0.5);
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(147, 51, 234, 0.7);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    )
  );
};

export default RightSidebar;
