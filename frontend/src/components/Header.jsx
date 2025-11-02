import React from 'react';
import { MdEmail } from 'react-icons/md';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <MdEmail />
        Resend Email Demo
      </h1>
      <p>Test your email functionality with a simple, beautiful interface</p>
    </header>
  );
};

export default Header;