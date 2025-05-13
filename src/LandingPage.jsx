// File: LandingPage.jsx
import React, { useRef, useState, useEffect } from 'react';
import SerpTool from './SerpTool';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function LandingPage() {
  const screenshotRef = useRef();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [exportGlow, setExportGlow] = useState(false);
  const [emojiBurst, setEmojiBurst] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExportImage = () => {
    const node = screenshotRef.current;
    if (!node) return;
    toPng(node)
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'serp-preview.png';
        link.href = dataUrl;
        link.click();

        setShowConfetti(true);
        setShowToast(true);
        setExportGlow(true);
        setEmojiBurst(true);

        setTimeout(() => setShowConfetti(false), 3000);
        setTimeout(() => setShowToast(false), 3200);
        setTimeout(() => setExportGlow(false), 2000);
        setTimeout(() => setEmojiBurst(false), 1500);
      })
      .catch(err => console.error('Export failed', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.8}
          style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }}
        />
      )}

      {/* Export Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-50"
          >
            🎉 Export Successful!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Burst */}
      <AnimatePresence>
        {emojiBurst && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -80 }}
            exit={{ opacity: 0, y: -120 }}
            transition={{ duration: 1.2 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 text-3xl z-40"
          >
            🎉 💡 👍 🚀 🧠
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero & Marketing Top Section */}
      <header className="py-16 px-4 text-center bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-md">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight font-sans">
            Visualize & Optimize Your SERP Snippet <span className="text-[#2C9C7A]">Instantly</span>
          </h2>
          <p className="text-lg opacity-90 font-light">
            Trusted by <strong className="text-[#2C9C7A]">1,200+</strong> SEO teams worldwide
          </p>
          <div className="inline-flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => document.getElementById('why-marketers').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[#003F5C] hover:bg-[#002a3d] rounded-full text-lg font-semibold transition shadow-lg hover:shadow-2xl"
            >
              Why Marketers Love It
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => document.getElementById('serp-tool').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[#2C9C7A] hover:bg-[#237a65] rounded-full text-lg font-semibold transition shadow-lg hover:shadow-2xl"
            >
              Optimize Your First Snippet
            </motion.button>
          </div>
        </div>
      </header>

      {/* Expanded Marketing Section */}
      <motion.section
        id="why-marketers"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="px-4 py-16 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#003F5C] font-serif">Why Marketers Love This Tool</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg mb-12 text-center">
          Whether you're refining metadata for a major campaign or conducting a quick site audit, our studio offers real-time pixel-based validation, AI-driven snippet rewrites, and token metrics to help you beat the competition in search.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {i === 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#2C9C7A] font-sans">⚡ Pixel-Based Validation</h3>
                  <p className="text-gray-600 font-light">Go beyond character counts: measure true rendering width in pixels to avoid truncation and maximize CTR.</p>
                </>
              )}
              {i === 1 && (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#2C9C7A]">🤖 AI-Powered Rewrites</h3>
                  <p className="text-gray-600">Leverage integrated GPT models to instantly generate search-optimized titles and descriptions, cutting your copy time in half.</p>
                </>
              )}
              {i === 2 && (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#2C9C7A]">📈 Token & Score Metrics</h3>
                  <p className="text-gray-600">Track keyword usage, token counts, and truncation risk—all in one interface so you can A/B test your snippets with confidence.</p>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Tool Section */}
      <motion.main
        id="serp-tool"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="px-4 py-16 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <motion.div
          ref={screenshotRef}
          animate={exportGlow ? { boxShadow: ['0 0 0px #fff', '0 0 30px #2C9C7A', '0 0 0px #fff'] } : {}}
          transition={{ duration: 1.2 }}
        >
          <SerpTool screenshotRef={screenshotRef} onExportImage={handleExportImage} darkMode={true} />
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="text-center py-12 bg-gray-100 border-t text-sm text-gray-500">
        <p>
          Built by <a href="https://amslerlabs.com" className="text-[#003F5C] hover:underline font-medium">Amsler Labs</a> · Innovation in automation & analytics · © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
