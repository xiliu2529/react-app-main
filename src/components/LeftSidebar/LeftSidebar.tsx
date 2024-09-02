import React, { useState, useRef, useEffect } from 'react';
import './LeftSidebar.css';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import icon from '../../img/レイアウト切替.svg';
import { useMyContext } from '../../contexts/MyContext';
import a from '../../img/グリッド + グラフ(左右).svg'
import b from '../../img/グリッド + グラフ(上下).svg'
import c from '../../img/グリッド のみ.svg'
import d from '../../img/グラフのみ.svg'
import { FormControlLabel, FormGroup } from '@mui/material';

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

  
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}
  checked={checked}
  onChange={handleChange} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#0FCFDC',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

  return  (
 
    <aside className="left-sidebar">
      <span className="icon-container">
        <span className='tabMenu' style={{
          cursor: isHistoricalActive ? "pointer" : "default",
          color:isHistoricalActive ? "#143867" : "#5a5d60",
          border:isHistoricalActive ? "2px solid #143867":' 2px solid #5a5d60'
          }}
          onMouseEnter={() => setButtonContainerVisible(true && isHistoricalActive)}
          onMouseLeave={() => setButtonContainerVisible(false)} 
          >
          <img src={icon} alt="Icon" className="icon" style={{ 
            height:"15px",
             marginRight:"10px",
            filter: isHistoricalActive ? 'none '  : "grayscale(100%)",
            }} />
            レイアウト切替
        </span>
     
     <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label="条件設定表示"
      />
    </FormGroup>
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
