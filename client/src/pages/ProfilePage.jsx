import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
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

      <div className="relative z-10 w-5/6 max-w-4xl animate-fade-in">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between max-lg:flex-col-reverse rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-10 flex-1 animate-slide-in-left"
          >
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-white mb-2">
                Profile Details
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
            </div>

            <label
              htmlFor="avatar"
              className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <input
                onChange={(e) => setSelectedImg(e.target.files[0])}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <div className="relative">
                <img
                  src={
                    selectedImg
                      ? URL.createObjectURL(selectedImg)
                      : assets.avatar_icon
                  }
                  alt=""
                  className={`w-14 h-14 transition-all duration-300 group-hover:scale-105 ${
                    selectedImg ? "rounded-full" : "rounded-lg"
                  }`}
                />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                Upload profile image
              </span>
            </label>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="Your name"
              className="p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />

            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              placeholder="Write profile bio"
              required
              className="p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
              rows={4}
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white p-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Save Changes
            </button>
          </form>

          {/* Profile Image Preview */}
          <div className="flex flex-col items-center p-10 animate-slide-in-right">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <img
                className={`relative w-48 h-48 object-cover border-4 border-white/20 transition-all duration-300 hover:scale-105 ${
                  selectedImg || authUser?.profilePic
                    ? "rounded-full"
                    : "rounded-2xl"
                }`}
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : authUser?.profilePic || assets.logo_icon
                }
                alt=""
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {name || "Your Name"}
            </h2>
            <p className="text-white/70 text-center max-w-xs">
              {bio || "Your bio will appear here..."}
            </p>
          </div>
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 8s ease-in-out infinite 2s;
        }

        .animate-float-delay-2 {
          animation: float 7s ease-in-out infinite 4s;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out 0.2s both;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
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
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
