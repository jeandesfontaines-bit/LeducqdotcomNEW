import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <h1 className="font-leducq text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/80 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-white text-black font-medium rounded hover:bg-white/90 transition"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
