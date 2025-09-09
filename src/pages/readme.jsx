import React, { useState, useEffect, useRef } from "react";
import remarkGfm from "https://esm.sh/remark-gfm@4";
import { motion, AnimatePresence } from "framer-motion";

// --- SVG Icon Components ---
const Wand2Icon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" /><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></svg>
);

const ClipboardIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>
);

const LinkIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" /></svg>
);

// --- Starfield Background ---
const Starfield = () => (
  <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
    <div className="absolute inset-0 bg-transparent animate-[star-fall_20s_linear_infinite]">
      <div className="absolute w-[1px] h-[1px] bg-white rounded-full" style={{top: '10%', left: '25%'}} />
      <div className="absolute w-[2px] h-[2px] bg-white rounded-full" style={{top: '50%', left: '60%'}} />
       <div className="absolute w-[1px] h-[1px] bg-white rounded-full" style={{top: '80%', left: '10%'}} />
    </div>
  </div>
);

// --- Shimmer Loader for the code block ---
const ShimmerLoader = () => (
    <div className="p-6 space-y-4">
        <div className="h-4 w-1/2 bg-red-900/40 rounded animate-pulse"></div>
        <div className="h-4 w-1/3 bg-red-900/40 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-red-900/40 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-red-900/40 rounded animate-pulse"></div>
        <div className="h-4 w-4/5 bg-red-900/40 rounded animate-pulse"></div>
  </div>
);

// --- Toast Notification ---
const Toast = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const colors = type === 'success'
    ? 'from-green-500/80 to-teal-500/80 border-green-400 text-green-100'
    : 'from-red-500/80 to-orange-500/80 border-red-400 text-red-100';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      className={`fixed bottom-5 right-5 p-4 rounded-lg border backdrop-blur-sm shadow-2xl z-50 bg-gradient-to-br ${colors}`}
    >
      {message}
    </motion.div>
  );
};

// --- Initial Content ---
const initialMarkdown = `# Welcome to README Tales ✨

Your AI-powered README will appear here.

## How it works
1. Paste your GitHub repository link above.
2. Click the **Generate** button.
3. Copy the generated markdown!
`;

const Readme = () => {
  const [link, setLink] = useState("");
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', key: 0 });

  const showToast = (msg, type = 'success') => setToast({ message: msg, type, key: Date.now() });

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    showToast("Markdown copied to clipboard!");
  };

  const fetchReadme = async (repoLink) => {
    if (!repoLink.trim()) {
      showToast("Please enter a repository link.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://readmetalesbackend.onrender.com/generate-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json", "password": import.meta.env.VITE_PASSWORD },
        credentials: "include",
        body: JSON.stringify({ url: repoLink }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to generate README");
      setMarkdown(data.readme);
      showToast("README generated successfully!");
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono relative flex flex-col p-4 sm:p-6 lg:p-8">
      <Starfield />
       <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-black/80 to-red-900/60" />

      <AnimatePresence>
        {toast.message && <Toast {...toast} onDismiss={() => setToast({ ...toast, message: "" })} key={toast.key} />}
      </AnimatePresence>

      <main className="relative z-10 flex flex-col flex-grow w-full max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                README Tales
            </h1>
            <p className="text-center text-red-400 mb-8">AI-Powered README Generator</p>

            <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full group">
                    <LinkIcon className="absolute top-1/2 left-4 -translate-y-1/2 text-red-600 group-focus-within:text-red-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Paste a public GitHub repository link..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        disabled={loading}
                        className="w-full p-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-red-400 placeholder-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-sm disabled:opacity-50 transition-all"
                    />
                </div>
                <motion.button
                    onClick={() => fetchReadme(link)}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg text-black font-semibold transition-all shadow-lg shadow-red-500/30 flex-shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto disabled:from-red-800 disabled:to-red-900 disabled:shadow-none"
                >
                    {loading ? (
                         <>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Wand2Icon size={20} /></motion.div>
                            <span>Generating...</span>
                        </>
                    ) : (
                         <>
                            <Wand2Icon size={20} />
                            <span>Generate</span>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-grow"
        >
          <div className="bg-[#0d0d0d]/80 rounded-lg border border-white/10 shadow-2xl shadow-red-900/20 backdrop-blur-sm min-h-[400px]">
            {/* Mock window bar */}
            <div className="flex items-center gap-2 p-3 bg-white/10 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <button onClick={copyMarkdown} className="ml-auto flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                <ClipboardIcon size={14}/>
                <span>Copy Markdown</span>
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
                {loading ? (
                    <ShimmerLoader />
                ) : (
                    <pre className="text-red-400 text-sm whitespace-pre-wrap break-words">
                        {markdown}
                    </pre>
                )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Readme;