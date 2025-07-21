import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border-r border-white/20 h-full p-6 overflow-y-scroll text-white transition-all duration-300 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Header Section */}
      <div className="pb-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={assets.logo_icon} alt="Huddle" className="w-8 h-8" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Huddle
            </h2>
          </div>
          <div className="relative group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="w-6 h-6 cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-all duration-300"
            />
            <div className="absolute top-full right-0 z-20 w-36 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-white/20" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm py-2 px-3 rounded-lg hover:bg-red-500/20 transition-all duration-200"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl flex items-center gap-3 py-4 px-5 border border-white/20 hover:border-white/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400/50">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 opacity-60"
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-sm placeholder-white/60 flex-1"
            placeholder="Search conversations..."
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col space-y-2">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/10 group animate-slide-in-stagger ${
              selectedUser?._id === user._id
                ? "bg-white/15 border border-white/20 shadow-lg"
                : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt=""
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 transition-all duration-300 group-hover:scale-105"
              />
              {onlineUsers.includes(user._id) && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {user.fullName}
              </p>
              <span
                className={`text-xs font-medium ${
                  onlineUsers.includes(user._id)
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full animate-bounce">
                <span className="text-xs font-bold text-white">
                  {unseenMessages[user._id]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slide-in-stagger {
          animation: slideInLeft 0.5s ease-out both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
