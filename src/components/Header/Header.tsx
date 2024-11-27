import React from 'react';
import './Header.css';
import Utilities from '../../components/Utilities/Utilities'
import labo from '../../img/labo.svg'

const Header: React.FC = () => {
  const handleClick = () => {
  };

  return (
    <header className="header">
      <div className="header-div">
        <img src={labo} className="quick" alt="Icon description" onClick={handleClick}/>
        <span className="overlay-text">ボリュームカーブ</span>
        <Utilities/>
        </div>
    </header>
  );
};

export default Header;
