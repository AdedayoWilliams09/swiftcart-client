import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ bestsellers }) => {
  const data = bestsellers.map(prod => ({
    name: prod.name,
    rating: prod.rating,
    reviews: prod.numReviews,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold mb-2">Bestsellers (by Rating)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;