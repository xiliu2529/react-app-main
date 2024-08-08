import React, { useState } from 'react';
import './LeftSidebar.css';
import icon from '../../img/icon.svg';
import { useMyContext } from '../../contexts/MyContext'; 

interface LeftSidebarProps {
  onButtonClick: (buttonName: number) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onButtonClick }) => {
  const { isHistoricalActive } = useMyContext(); 
  const { setbuttonName } = useMyContext();
  const [isOpen, setIsOpen] = useState(false); 

  const handleIconClick = () => {
    setIsOpen(!isOpen); 
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonClick = (buttonName: number) => {
    onButtonClick(buttonName);
    setbuttonName(buttonName);
  };

  return (
    <aside className="left-sidebar">
      <span className="icon-container" onClick={handleIconClick}>
        <img src={icon} alt="Icon" className="icon" />
        {isOpen && (
          <div className="button-container">
            {isHistoricalActive ? (
              <>
                <button className="sidebar-button" onClick={() => handleButtonClick(1)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  条件設定+グリッド+グラフ
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(2)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  グリッド+グラフ
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(3)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  条件設定+グリッド
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(4)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  グリッドのみ
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(5)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  条件設定+グラフ
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(6)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  グラフのみ
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(7)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  上下レイアウト仮
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(8)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  上下レイアウト仮2
                </button>
              </>
            ) : (
              <>
                <button className="sidebar-button" onClick={() => handleButtonClick(9)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  Button 9
                </button>
                <button className="sidebar-button" onClick={() => handleButtonClick(10)}>
                  <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="24" fill="#0E0E0E" />
                  </svg>
                  Button 10
                </button>
              </>
            )}
            <button id='close' onClick={handleClose}>とじる</button>
          </div>
        )}
      </span>
    </aside>
  );
};

export default LeftSidebar;
