import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './InfoPanel.css'
import { useMyContext } from '../../contexts/MyContext'; // 导入上下文
import { Stack } from '@mui/material';

const PageThree: React.FC = () => {
  const {isHistoricalActive,setisHistoricalActive} = useMyContext();
  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null,
  ) => {
    if (newAlignment !== null) {
      setisHistoricalActive(newAlignment);
    }
  };
  
  const code = '0000';
  const codeName = 'ああああああ';
  const time = '0000/00/00 ～0000/00/00';
  const futuresContract = '日時';
  const executionTime = 'yyyy/mm/dd 00:00';

  return (
    <div>
        <ToggleButtonGroup
        className='toggle-button'
        color="primary"
        value={isHistoricalActive}
        exclusive
        onChange={handleChange1}
        aria-label="Platform"
      >
        <ToggleButton className="customToggleButton" value={true}>
          ボリュームカーブ
        </ToggleButton>
        <ToggleButton className="customToggleButton" value={false}>
          ヒストリカル
        </ToggleButton>
      </ToggleButtonGroup>

        <div className='message'>
        <Stack direction="row" spacing={1} alignItems="center">
              
              <span className="label">銘柄コード:</span>
              <span className="value">{code}</span>
              <span className="label">銘柄名:</span>
              <span className="value">{codeName}</span>
              <span className="label">期種:</span>
              <span className="value">{futuresContract}</span>
              <span className="label">時間:</span>
              <span className="value">{time}</span>
          </Stack>
          <p className="execution-time">実行時間: {executionTime}</p>
        </div>
      
   

    </div>
  );
};

export default PageThree;
