import React from 'react';
import './Header.css';
import Utilities from '../../components/Utilities/Utilities'
import labo from '../../img/labo.svg'

const Header: React.FC = () => {
  const handleClick = () => {
  };

  return (
    <header className="header">
        <img src={labo} className="quick" alt="Icon description" onClick={handleClick}/>
        <Utilities/>

    </header>
    
    
  );
};

export default Header;
