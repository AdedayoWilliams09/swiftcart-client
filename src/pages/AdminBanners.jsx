import React, { useEffect, useState } from "react";

import api from "../api";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/admin/banners")
      .then((res) => setBanners(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load banners")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Banners</h2>
      <p className="mb-4">
        Here you can upload, edit, and manage promotional banners or sliders for
        your homepage.
      </p>
      {loading ? (
        <div className="text-center py-8">Loading banners...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : banners.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No banners found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner._id} className="bg-white rounded shadow p-4">
              <img
                src={banner.image}
                alt="Banner"
                className="w-full h-32 object-cover rounded mb-2"
              />
              <div className="text-sm">{banner.title}</div>
              <div className="text-xs text-gray-500">{banner.link}</div>
              <div className="mt-2 flex space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
