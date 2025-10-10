import React from 'react';

const Footer: React.FC = () => (
  <footer className="py-6 border-t border-cyan-900/50 text-center text-sm text-gray-500 font-mono">
    &copy; {new Date().getFullYear()} Yuu Ohnuki. All Rights Reserved. | Built with Next.js & Tailwind CSS.
  </footer>
);

export default Footer;
