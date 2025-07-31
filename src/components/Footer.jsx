import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} SwiftCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;