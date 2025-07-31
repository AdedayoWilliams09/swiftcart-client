import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value }) => (
  <motion.div
    className="bg-white rounded shadow p-4 text-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-gray-500 text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </motion.div>
);

export default StatsCard;