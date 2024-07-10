// components/Header/Header.tsx

import React from 'react';
import './Header.css';
import SettingsDialog from '../SettingsDialog/SettingsDialog'

const Header: React.FC = () => {
  const handleClick = () => {
  };

  return (
    <header className="header">
        <p className="quick" onClick={handleClick}>QUICK ラボ ボリュームカーブ</p>
        <SettingsDialog></SettingsDialog>
    </header>
    
    
  );
};

export default Header;
