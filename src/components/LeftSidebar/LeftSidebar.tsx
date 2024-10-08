import React, { useState, useRef, useEffect } from 'react';
import './LeftSidebar.css';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import icon from '../../img/LayoutSwitch.svg';
import { useMyContext } from '../../contexts/MyContext';
import GridGraphHorizontal from '../../img/GridGraphHorizontal.svg'
import GridGraphVertical from '../../img/GridGraphVertical.svg'
import GridOnly from '../../img/GridOnly.svg'
import GraphOnly from '../../img/GraphOnly.svg'
import { FormControlLabel, FormGroup } from '@mui/material';

const LeftSidebar: React.FC = () => {
  const { isHistoricalActive, setbuttonName, buttonName, showConditionSettings, setshowConditionSettings } = useMyContext();
  const [isButtonContainerVisible, setButtonContainerVisible] = useState(false);
  const isInitialMount = useRef(true);
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}
      checked={showConditionSettings}
      onChange={handleChange} />
  ))(({ theme }) => ({
    transform: 'scale(0.8)',
    width: 45,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(19px)',
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setshowConditionSettings(event.target.checked);
    isInitialMount.current = false;
  };

  const handleButtonClick = (buttonName: number) => {
    if (showConditionSettings) {
      buttonName = buttonName - 1;
    }
    setbuttonName(buttonName);
  };

  useEffect(() => {
    if (isInitialMount.current) {
    } else {
      if (showConditionSettings) {
        setbuttonName(buttonName - 1);
      } else {
        setbuttonName(buttonName + 1);
      }
    }
  }, [showConditionSettings]);

  useEffect(() => {
    if (showConditionSettings) {
      setbuttonName(1);
    } else {
      setbuttonName(2);
    }
  }, [isHistoricalActive]);

  return (
    <aside className="left-sidebar">
      <span className="icon-container">
        <span className='tabMenu' style={{
          cursor: isHistoricalActive ? "pointer" : "default",
          color: isHistoricalActive ? "#143867" : "#AAA",
          border: isHistoricalActive ? "1px solid #143867" : ' 1px solid #AAA'
        }}
          onMouseEnter={() => setButtonContainerVisible(true && isHistoricalActive)}
          onMouseLeave={() => setButtonContainerVisible(false)}
        >
          <img src={icon} alt="Icon" className="icon" style={{
            height: "12px",
            marginRight: "10px",
            filter: isHistoricalActive ? 'none ' : "grayscale(100%)",
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
            <img src={GridGraphHorizontal} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>グリッド+グラフ(左右)</span>
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(8)}>
            <img src={GridGraphVertical} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>グリッド+グラフ(上下)</span>
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(4)}>
            <img src={GridOnly} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>グリッドのみ</span>
          </button>
          <button className="sidebar-button" onClick={() => handleButtonClick(6)}>
            <img src={GraphOnly} alt="Sidebar Icon" width="30" height="20" style={{ marginRight: '8px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>グラフのみ</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
