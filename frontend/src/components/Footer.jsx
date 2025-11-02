import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Built with ❤️ using{' '}
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