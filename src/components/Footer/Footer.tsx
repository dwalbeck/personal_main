import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-800 py-4">
      <div className="container mx-auto px-5 text-center">
        {/* Footer Information */}
        <div className="">
          <p className="text-white">
            © 2025 Davey Walbeck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
