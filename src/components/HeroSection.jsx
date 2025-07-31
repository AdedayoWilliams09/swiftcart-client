import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg"; // Make sure to import your image

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-green-100 to-white pt-24 pb-16 min-h-[60vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-16">
      {/* Text Content - Centered on mobile, left on desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex flex-col items-center text-center md:items-start md:text-left mb-12 md:mb-0"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">
          Welcome to <span className="text-green-500">SwiftCart</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-lg">
          Shop smarter, faster, and easier. Discover amazing products at unbeatable prices!
        </p>
        <Link
          to="/products"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition font-semibold text-lg"
        >
          Start Shopping
        </Link>
      </motion.div>

      {/* Image - Always centered but properly spaced on desktop */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <img
          src={heroImg}
          alt="Happy shopper with SwiftCart products"
          className="w-72 md:w-96 drop-shadow-xl rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;