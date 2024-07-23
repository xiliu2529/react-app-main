import React from 'react';
import './Header.css';
import SettingsDialog from '../../components/SettingsDialog/SettingsDialog'
import Utilities from '../../components/Utilities/Utilities'

const Header: React.FC = () => {
  const handleClick = () => {
  };

  return (
    <header className="header">
        <p className="quick" onClick={handleClick}>QUICK ラボ ボリュームカーブ</p>
        <Utilities/>
        {/* <SettingsDialog></SettingsDialog> */}

    </header>
    
    
  );
};

export default Header;
