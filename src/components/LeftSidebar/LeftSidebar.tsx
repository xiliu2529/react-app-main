import React, { useState } from 'react';
import './LeftSidebar.css';
import icon from '../../img/icon.png';
import { useMyContext } from '../../contexts/MyContext'; // 导入上下文

interface LeftSidebarProps {
  onButtonClick: (buttonName: number) => void; 
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onButtonClick }) => {
  const { isHistoricalActive } = useMyContext(); // 获取上下文中的 alignment
  const [isHovered, setIsHovered] = useState(false);
  const handleButtonClick = (buttonName: number) => {
    onButtonClick(buttonName);
  };

  return (
    <aside className="left-sidebar">
      <span className="icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={icon} alt="Icon" className="icon" onClick={() => handleButtonClick(0)}/>
        {isHovered && (
          <div className="button-container">
          {isHistoricalActive ? (
              <>
                  <button className="sidebar-button" onClick={() => handleButtonClick(1)}>Button 1</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(2)}>Button 2</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(3)}>Button 3</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(4)}>Button 4</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(5)}>Button 5</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(6)}>Button 6</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(7)}>Button 7</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(8)}>Button 8</button>
              </>
          ) : (
              <>
                  <button className="sidebar-button" onClick={() => handleButtonClick(9)}>Button 9</button>
                  <button className="sidebar-button" onClick={() => handleButtonClick(10)}>Button 10</button>
              </>
          )}
          </div>
        )}
      </span>
    </aside>
  );
};

export default LeftSidebar;
