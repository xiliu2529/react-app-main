import React  from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './InfoPanel.css'
import { useMyContext } from '../../contexts/MyContext';
import { Stack } from '@mui/material';
import data1 from '../../data/data1.json';

const InfoPanel: React.FC = () => {
  const {isHistoricalActive,setisHistoricalActive} = useMyContext();
  const handleChange1 = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null,
  ) => {
    if (newAlignment !== null) {
      setisHistoricalActive(newAlignment);
    }
  };
   
  const executionTime = 'yyyy/mm/dd 00:00';

  return (
    <div id='InfoPanel'>
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
              <span className="value">{data1.QuoteCode}</span>
              <span className="label">銘柄名:</span>
              <span className="value">{data1.AbbreviatedName}</span>
              <span className="value">{data1.MarketName}</span>
              <span className="value">{data1.ListedSection}</span>
          </Stack>
          <p className="execution-time">実行時間: {executionTime}</p>
        </div>
      
   

    </div>
  );
};

export default InfoPanel;
