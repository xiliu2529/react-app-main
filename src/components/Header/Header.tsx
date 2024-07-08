// components/Header/Header.tsx

import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  const handleClick = () => {
  };

  return (
    <header className="header">
        <p className="quick" onClick={handleClick}>QUICK ラボ ボリュームカーブ</p>
        <span className="settings-icon" onClick={handleClick}></span>
    </header>
  );
};

export default Header;
