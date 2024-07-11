import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const PageThree: React.FC = () => {
  const [alignment, setAlignment] = useState<boolean>(true);
  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
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
        value={alignment}
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

      <div className='dataPanel'>
        <div className='message'>
          <div className="message-container">
            <div className="message-item">
              <span className="label">銘柄コード:</span>
              <span className="value">{code}</span>
            </div>
            <div className="message-item">
              <span className="label">銘柄名:</span>
              <span className="value">{codeName}</span>
            </div>
            <div className="message-item">
              <span className="label">期種:</span>
              <span className="value">{futuresContract}</span>
            </div>
            <div className="message-item">
              <span className="label">時間:</span>
              <span className="value">{time}</span>
            </div>
          </div>
          <p className="execution-time">実行時間: {executionTime}</p>
        </div>
      
      </div>

    </div>
  );
};

export default PageThree;
