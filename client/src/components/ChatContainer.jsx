import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full flex flex-col relative bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-xl border-b border-white/20 animate-slide-down flex-shrink-0">
        <div className="relative">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-white/20 transition-all duration-300 hover:scale-105"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse"></div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-xl font-semibold text-white flex items-center gap-3">
            {selectedUser.fullName}
          </p>
          <p
            className={`text-sm ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {onlineUsers.includes(selectedUser._id)
              ? "Online"
              : "Last seen recently"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="Back"
            className="md:hidden w-8 h-8 p-2 cursor-pointer rounded-lg hover:bg-white/10 transition-all duration-300"
          />
          <img
            src={assets.help_icon}
            alt="Help"
            className="max-md:hidden w-8 h-8 p-2 cursor-pointer rounded-lg hover:bg-white/10 transition-all duration-300"
          />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollable">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 animate-message-appear ${
              msg.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {msg.senderId !== authUser._id && (
              <img
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
            )}

            <div
              className={`flex flex-col max-w-xs lg:max-w-md ${
                msg.senderId === authUser._id ? "items-end" : "items-start"
              }`}
            >
              {msg.image ? (
                <div className="relative group cursor-pointer">
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-60 rounded-2xl border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ) : (
                <div
                  className={`px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
                    msg.senderId === authUser._id
                      ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-purple-400/30 rounded-br-md"
                      : "bg-white/10 text-white border-white/20 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">
                    {msg.text}
                  </p>
                </div>
              )}

              <div
                className={`flex items-center gap-2 mt-1 ${
                  msg.senderId === authUser._id
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <span className="text-xs text-white/50">
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>
            </div>

            {msg.senderId === authUser._id && (
              <img
                src={authUser?.profilePic || assets.avatar_icon}
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
            )}
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Message Input */}
      <div className="p-6 bg-white/10 backdrop-blur-xl border-t border-white/20 flex-shrink-0">
        <div className="flex items-center gap-4 bg-white/10 rounded-2xl px-4 py-3 border border-white/20 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-purple-400/50 transition-all duration-300">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 text-sm py-2 bg-transparent border-none outline-none text-white placeholder-white/60"
          />

          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="cursor-pointer p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <img
              src={assets.gallery_icon}
              alt="Attach"
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
            />
          </label>

          <button
            onClick={handleSendMessage}
            className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <img src={assets.send_button} alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }

        .animate-message-appear {
          animation: messageAppear 0.4s ease-out both;
        }

        .scrollable {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.5) rgba(255, 255, 255, 0.1);
        }

        .scrollable::-webkit-scrollbar {
          width: 6px;
          display: block;
        }

        .scrollable::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .scrollable::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 10px;
        }

        .scrollable::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }

        @keyframes slideDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes messageAppear {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full bg-white/5 backdrop-blur-sm max-md:hidden animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img
            src={assets.logo_icon}
            className="relative w-20 h-20 mx-auto"
            alt="Huddle"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Welcome to Huddle
          </h3>
          <p className="text-lg text-white/70">
            Select a conversation to start chatting
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;
