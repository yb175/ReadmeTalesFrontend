import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiZap, FiLock, FiEdit3, FiCopy } from "react-icons/fi";
import { Link } from "react-router";

const LandingPage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animate children one after another
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const copyToClipboard = () => {
    // A simplified text content for the example
    const text = `# Awesome Project...`; 
    navigator.clipboard.writeText(text);

  };

  return (
    // Main container with a dark theme and relative positioning for the background
    <div className="bg-black min-h-screen text-gray-300 font-mono overflow-x-hidden relative">
      
      {/* Static Aurora Background Effect (Tailwind only) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-red-600/20 rounded-full filter blur-3xl animate-pulse duration-[6000ms]"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-red-900/20 rounded-full filter blur-3xl animate-pulse duration-[8000ms]"></div>
      </div>

      <main className="relative z-10 px-4 md:px-20 py-10">
        {/* Hero Section */}
        <motion.section
          className="text-center min-h-[80vh] flex flex-col justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700"
            variants={itemVariants}
          >
            ReadMe Tales
          </motion.h1>
          <motion.p className="text-lg md:text-xl mb-8 text-zinc-400 max-w-2xl" variants={itemVariants}>
            Your GitHub repo's new best friend. 🚀 <br />
            Forge a legendary README from just a repo link.
          </motion.p>
          <motion.a
            href="#features"
            className="inline-flex items-center gap-3 border-2 border-red-600 px-10 py-3 font-bold rounded-full text-red-500 hover:bg-red-600 hover:text-black hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
            variants={itemVariants}
          >
            <FiZap />
            <Link to={"/readme"}><span>Generate Now</span></Link>
          </motion.a>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" variants={itemVariants}>
            The <span className="text-red-500">Magic</span> Inside
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-red-500/50 group transition-all duration-300"
              variants={itemVariants}
            >
              <FiGithub className="text-4xl text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-red-400">Auto-Fetch Metadata</h3>
              <p className="text-zinc-400">Pulls title, description & tech stack straight from the GitHub API. Less typing, more coding.</p>
            </motion.div>
            {/* Feature Card 2 */}
            <motion.div
              className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-red-500/50 group transition-all duration-300"
              variants={itemVariants}
            >
              <FiLock className="text-4xl text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-red-400">Private Repo Support</h3>
              <p className="text-zinc-400">Secure OAuth login means even your secret projects can have epic READMEs.</p>
            </motion.div>
            {/* Feature Card 3 */}
            <motion.div
              className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-red-500/50 group transition-all duration-300"
              variants={itemVariants}
            >
              <FiEdit3 className="text-4xl text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-red-400">Endless Customization</h3>
              <p className="text-zinc-400">Add custom sections like setup instructions, project structure, or how to contribute.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* README Preview */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Behold, The <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">Result</span>
          </h2>
          <div className="bg-[#0d0d0d]/80 rounded-lg border border-white/10 shadow-2xl shadow-red-900/20 backdrop-blur-sm">
            {/* Mock window bar */}
            <div className="flex items-center gap-2 p-3 bg-white/10 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <button onClick={copyToClipboard} className="ml-auto flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                <FiCopy />
                <span>Copy</span>
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-red-400 text-sm">
{`# Awesome Project

## 🎨 Tech Stack
- React, Node.js, Tailwind CSS

## ✨ Features
- Auto metadata fetch
- Custom sections
- OAuth support

## 🚀 Getting Started
1. Clone the repository
2. Run \`npm install\`
3. Fire up with \`npm start\`

## 📜 License
- This project is licensed under the MIT License.`}
              </pre>
            </div>
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-200">Stop Writing Boilerplate.</h2>
          <p className="text-red-500 mb-8">Generate your README now.</p>
          <a
            href="#features"
            className="inline-flex items-center gap-3 border-2 border-red-600 px-10 py-3 font-bold rounded-full text-red-500 hover:bg-red-600 hover:text-black hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
          >
            Let's Go
          </a>
        </motion.section>

        {/* Footer */}
        <footer className="text-center border-t border-red-600/30 py-6">
          <p className="text-zinc-500">© 2025 ReadMe Tales</p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;