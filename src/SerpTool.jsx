// File: SerpTool.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const MAX_FREE_REWRITES = 10;
const MAX_TITLE_PX = 580;
const MAX_DESC_PX = 920;

function measureTextWidth(text, font = '16px Arial') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Copied!'))
    .catch(() => alert('Copy failed'));
}

function countTokens(text) {
  return Math.ceil(text.trim().split(/\s+/).length / 4);
}

export default function SerpTool({ screenshotRef, onExportImage }) {
  const [title, setTitle] = useState('Your Awesome Title Goes Here');
  const [description, setDescription] = useState('This is your meta description. Make sure it is concise and engaging.');
  const [url, setUrl] = useState('example.com/page');
  const [mode, setMode] = useState('desktop');
  const [darkMode, setDarkMode] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [aiDescription, setAiDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMember, setIsMember] = useState(() => localStorage.getItem('isMember') === 'true');
  const [rewriteCount, setRewriteCount] = useState(() => {
    const saved = parseInt(localStorage.getItem('rewriteCount') || '0', 10);
    return isNaN(saved) ? 0 : saved;
  });

  useEffect(() => {
    localStorage.setItem('rewriteCount', rewriteCount);
  }, [rewriteCount]);

  const handleRewrite = async () => {
    if (!isMember && rewriteCount >= MAX_FREE_REWRITES) {
      alert(`You've used your ${MAX_FREE_REWRITES} free rewrites. Please become a member to continue.`);
      return;
    }

    setLoading(true);
    const prompt = `Rewrite as SERP snippet. Title: \"${title}\". Desc: \"${description}\".`;
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      const text = data.choices[0]?.message?.content || '';
      const [newTitle, newDesc] = text.split('\n').map(s => s.trim());
      setAiTitle(newTitle || title);
      setAiDescription(newDesc || description);

      setRewriteCount(c => c + 1);
    } catch (e) {
      console.error(e);
      alert('AI rewrite failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // measure preview widths
  const displayTitle = aiTitle || title;
  const displayDesc = aiDescription || description;
  const titlePx = measureTextWidth(displayTitle, mode === 'mobile' ? '14px Arial' : '16px Arial');
  const descPx = measureTextWidth(displayDesc, mode === 'mobile' ? '14px Arial' : '16px Arial');

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white backdrop-blur-lg rounded-2xl shadow-xl">
      {/* Controls Card */}
      <div className={`space-y-6 ${darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/70 text-black'} p-6 rounded-xl shadow-lg backdrop-blur-md`}>        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">SERP Snippet Studio</h2>
        </div>
        <div className="space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`${darkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : ''} w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C9C7A]`}
            placeholder="Page Title"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C9C7A]"
            rows={3}
            placeholder="Meta Description"
          />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C9C7A]"
            placeholder="URL"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setMode('desktop')} className={`px-5 py-2 rounded-lg font-medium transition ${mode === 'desktop' ? 'bg-[#003F5C] text-white' : 'border text-[#3D4752]'}`}>Desktop</button>
          <button onClick={() => setMode('mobile')} className={`px-5 py-2 rounded-lg font-medium transition ${mode === 'mobile' ? 'bg-[#003F5C] text-white' : 'border text-[#3D4752]'}`}>Mobile</button>
          <button onClick={() => setDarkMode(!darkMode)} className="px-5 py-2 border rounded-lg font-medium transition text-[#3D4752]">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          <button onClick={handleRewrite} disabled={loading} className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium transition">
            {loading ? 'Rewriting...' : `AI Rewrite (${rewriteCount}/${MAX_FREE_REWRITES})`}
          </button>
          {!isMember && rewriteCount >= MAX_FREE_REWRITES && (
            <button onClick={() => setIsMember(true)} className="px-5 py-2 bg-yellow-500 text-black rounded-lg font-medium transition">
              Become a member!
            </button>
          )}
          <button onClick={onExportImage} className="px-5 py-2 bg-[#2C9C7A] text-white rounded-lg font-medium transition">Export Image</button>
        </div>
      </div>

      {/* Preview Card */}
      <div className={`${darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/70 text-black'} p-6 rounded-xl shadow-lg backdrop-blur-md`}>        
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Your Snippet</h3>
        <div
          ref={screenshotRef}
          className={`${mode} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${mode === 'mobile' ? 'w-[375px] p-6' : 'w-full max-w-2xl p-8'} rounded-2xl shadow-lg transition duration-200 ease-out transform hover:scale-102 hover:shadow-2xl`}
        >
          <h4 className="text-xl font-bold mb-2">{displayTitle}</h4>
          <div className="text-[#2C9C7A] mb-4">{url}</div>
          <p className="mb-4">{displayDesc}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span>Title: {Math.round(titlePx)}/{MAX_TITLE_PX}px</span>
            <button onClick={() => copyToClipboard(displayTitle)} className="underline">Copy Title</button>
            <span>Tokens: {countTokens(displayTitle)}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
            <span>Desc: {Math.round(descPx)}/{MAX_DESC_PX}px</span>
            <button onClick={() => copyToClipboard(displayDesc)} className="underline">Copy Desc</button>
            <span>Tokens: {countTokens(displayDesc)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
