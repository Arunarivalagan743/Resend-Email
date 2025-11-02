import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Built with <FaHeart style={{ color: '#e74c3c' }} /> using{' '}
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
          Resend
        </a>
        {' '}&{' '}
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          Vite
        </a>
      </p>
    </footer>
  );
};

export default Footer;