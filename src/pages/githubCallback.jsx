import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiGithub, FiLoader } from "react-icons/fi";

const GitHubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");

      if (!code) return;

      try {
        const response = await fetch(
          "https://readmetalesbackend.onrender.com/github-auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              password: import.meta.env.VITE_PASSWORD,
            },
            body: JSON.stringify({ code }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("🔥 Login Success:", data);
          setTimeout(() => navigate("/readme"), 1500); // Smooth redirect
        } else {
          console.error("❌ Login Failed:", data);
        }
      } catch (err) {
        console.error("⚡ Error exchanging code:", err);
      }
    };

    exchangeCodeForToken();
  }, [location.search, navigate]);

  return (
    <div className="bg-black min-h-screen text-gray-300 font-mono overflow-hidden relative flex items-center justify-center">

      {/* Red-Black Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[5%] w-[60vw] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[60vw] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-red-600/20 rounded-full filter blur-3xl animate-pulse duration-[7000ms]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[50vw] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[50vw] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-red-900/20 rounded-full filter blur-3xl animate-pulse duration-[9000ms]" />
      </div>

      <main className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-10">

        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-lg border border-red-600/50 p-8 sm:p-10 md:p-12 text-center w-full max-w-md sm:max-w-lg md:max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FiGithub className="text-6xl sm:text-7xl md:text-8xl text-red-500 mx-auto mb-6 animate-spin-slow" />
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            variants={itemVariants}
          >
            Authenticating with GitHub...
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-zinc-400 mb-8"
            variants={itemVariants}
          >
            🚀 Hold tight! Fetching your superpowers... <br />
            You’ll be zoomed to your epic README editor soon!
          </motion.p>

          <motion.div variants={itemVariants}>
            <FiLoader className="text-4xl sm:text-5xl md:text-6xl text-red-500 animate-spin mx-auto" />
          </motion.div>
        </motion.div>

        <footer className="mt-12 text-center text-zinc-500 text-xs sm:text-sm md:text-base">
          © 2025 ReadMe Tales | Powered by ❤️
        </footer>
      </main>
    </div>
  );
};

export default GitHubCallback;
