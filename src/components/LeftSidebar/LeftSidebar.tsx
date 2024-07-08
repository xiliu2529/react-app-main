import React, { useState } from 'react';
import './LeftSidebar.css';
import icon from '../../img/icon.png';

interface LeftSidebarProps {
  onButtonClick: (buttonName: number) => void; 
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onButtonClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = (buttonName: number) => {
    onButtonClick(buttonName);
  };

  

  return (
    <aside className="left-sidebar">
      <div className="icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={icon} alt="Icon" className="icon" />
        {isHovered && (
          <div className="button-container">
            <button className="sidebar-button" onClick={() => handleButtonClick(1)}>Button 1</button>
            <button className="sidebar-button" onClick={() => handleButtonClick(2)}>Button 2</button>
            <button className="sidebar-button" onClick={() => handleButtonClick(3)}>Button 3</button>
            <button className="sidebar-button" onClick={() => handleButtonClick(4)}>Button 4</button>
            <button className="sidebar-button" onClick={() => handleButtonClick(5)}>Button 5</button>
            <button className="sidebar-button" onClick={() => handleButtonClick(6)}>Button 6</button>
            {/* Add more buttons as needed */}
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
