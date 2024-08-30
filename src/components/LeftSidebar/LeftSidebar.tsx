import React, { useState, useRef, useEffect } from 'react';
import './LeftSidebar.css';
import icon from '../../img/レイアウト切替.svg';
import { useMyContext } from '../../contexts/MyContext';
import Switch from '@mui/material/Switch';
import a from '../../img/グリッド + グラフ(左右).svg'
import b from '../../img/グリッド + グラフ(上下).svg'
import c from '../../img/グリッド のみ.svg'
import d from '../../img/グラフのみ.svg'

const LeftSidebar: React.FC = () => {
  const { isHistoricalActive, setbuttonName, buttonName } = useMyContext();
  const [checked, setChecked] = useState(true);
  const [isButtonContainerVisible, setButtonContainerVisible] = useState(false);
  const isInitialMount = useRef(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    isInitialMount.current = false;
  };

  const handleButtonClick = (buttonName: number) => {
    if (checked) {
      buttonName = buttonName - 1;
    }
    setbuttonName(buttonName);
  };

  useEffect(() => {
    if (isInitialMount.current) {
    } else {
      if (checked) {
        setbuttonName(buttonName - 1);
      } else {
        setbuttonName(buttonName + 1);
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

  return  (
 
    <aside className="left-sidebar">
      <span
        className="icon-container">
        <span>
          <img src={icon} alt="Icon" className="icon" style={{ height:"30px" }}
            onMouseEnter={() => setButtonContainerVisible(true && isHistoricalActive)}
            onMouseLeave={() => setButtonContainerVisible(false)} />
        </span>
        <Switch
      checked={checked}
      onChange={handleChange}
    />
        <span className="switch-label">条件設定表示</span>
      </span>

      {isButtonContainerVisible && (
        <div className="button-container"  
        onMouseEnter={() => setButtonContainerVisible(true && isHistoricalActive)}
        onMouseLeave={() => setButtonContainerVisible(false)}>
          <button className="sidebar-button" onClick={() => handleButtonClick(2)}>
          <img src={a} alt="Sidebar Icon" width="30" height="20"style={{ marginRight: '8px' }} />
            グリッド+グラフ(左右)
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(8)}>
          <img src={b} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }}/>
            グリッド+グラフ(上下)
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(4)}>
          <img src={c} alt="Sidebar Icon" width="30" height="20"style={{ marginRight: '8px' }} />
            グリッドのみ
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(6)}>
          <img src={d} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }}/>
             グラフのみ
          </button>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
