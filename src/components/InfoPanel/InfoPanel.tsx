import React, { useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './InfoPanel.css'
import { useMyContext } from '../../contexts/MyContext';
import { Stack } from '@mui/material';
// import a from '../../data/601.1/data1.json';
// import b from '../../data/101.1/data1.json';
// import c from '../../data/data1.json';

const InfoPanel: React.FC = () => {
  const {QvTotalingInfojson, isHistoricalActive, setisHistoricalActive, 
    // requestPayload, response, 
  } = useMyContext();
  const handleChange1 = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null,
  ) => {
    if (newAlignment !== null) {
      setisHistoricalActive(newAlignment);
    }
  };

  let QvTotalingInfo = {
    QuoteCode: '',
    AbbreviatedName: '',
    MarketName: '',
    ListedSection: '',
  }
  useEffect(() => {
    QvTotalingInfo = QvTotalingInfojson
  }, [QvTotalingInfojson]);

  // if (response) {
  //   if (requestPayload.Code === '6501') {
  //     QvTotalingInfo = c;
  //   } else if (requestPayload.Code === '101.1') {
  //     QvTotalingInfo = b;
  //   } else if (requestPayload.Code === '601.1') {
  //     QvTotalingInfo = a;
  //   }
  // }

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
          <span className="value">{QvTotalingInfo.QuoteCode}</span>
          <span className="label">銘柄名:</span>
          <span className="value">{QvTotalingInfo.AbbreviatedName}</span>
          <span className="value">{QvTotalingInfo.MarketName}{QvTotalingInfo.ListedSection}</span>
        </Stack>
        {/* CalculateDateTime */}
        <p className="execution-time">実行日時: {}</p>
      </div>



    </div>
  );
};

export default InfoPanel;
