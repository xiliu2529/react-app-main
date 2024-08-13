import React, { useEffect, useState, useRef } from 'react';
import './LeftSidebar.css';
import icon from '../../img/icon.svg';
import { useMyContext } from '../../contexts/MyContext';
import Switch from '@mui/material/Switch';

const LeftSidebar: React.FC = () => {
  const { isHistoricalActive, setbuttonName, buttonName } = useMyContext();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const isInitialMount = useRef(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    isInitialMount.current = false;
  };

  const handleIconClick = () => {
    setIsOpen(!isOpen);

  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonClick = (buttonName: number) => {
    if (checked) {
      buttonName = buttonName - 1
    }
    setbuttonName(buttonName);
    setIsOpen(false);
  };
  useEffect(() => {

    if (isInitialMount.current) {
    } else {

      if (checked) {
        setbuttonName(buttonName - 1);
        isInitialMount.current = false;
      } else {
        setbuttonName(buttonName + 1);
        isInitialMount.current = false;
      }
    }
  }, [checked]);
  useEffect(() => {
    if (checked) {
      setbuttonName(1);
    } else {
      setbuttonName(2);
    }

  }, [isHistoricalActive]);



  return (
    <aside className="left-sidebar">

      <span className="icon-container">
        {isHistoricalActive ? 
        <span onClick={handleIconClick}>
          <img src={icon} alt="Icon" className="icon" /> </span> : null}

        <Switch
          className='switch-button'
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Switch demo' }}
        />
        <span className="switch-label">条件設定表示</span>
      </span>

      {isOpen && (
        <div className="button-container">
          <>
            <button className="sidebar-button" onClick={() => handleButtonClick(2)}>
              <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="24" fill="#0E0E0E" />
              </svg>
              グリッド+グラフ(左右)
            </button>

            <button className="sidebar-button" onClick={() => handleButtonClick(4)}>
              <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="24" fill="#0E0E0E" />
              </svg>
              グリッドのみ
            </button>

            <button className="sidebar-button" onClick={() => handleButtonClick(8)}>
              <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="24" fill="#0E0E0E" />
              </svg>
              グリッド+グラフ(上下)
            </button>
            <button className="sidebar-button" onClick={() => handleButtonClick(6)}>
              <svg width="34" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="24" fill="#0E0E0E" />
              </svg>
              グラフのみ
            </button>
          </>
          <button id='close' onClick={handleClose}>とじる</button>
        </div>
      )}

    </aside>
  );
};

export default LeftSidebar;
