// src/components/BannerSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api'

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    api.get('/banners').then(res => setBanners(res.data));
  }, []);

  if (banners.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {banners.map(banner => (
          <div key={banner._id} className="relative">
            {banner.link ? (
              <Link to={banner.link}>
                <img src={banner.image} alt={banner.title || "Banner"} className="w-full h-56 object-cover rounded" />
              </Link>
            ) : (
              <img src={banner.image} alt={banner.title || "Banner"} className="w-full h-56 object-cover rounded" />
            )}
            {banner.title && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                <div className="font-bold">{banner.title}</div>
                {banner.description && <div className="text-sm">{banner.description}</div>}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;