import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './InfoPanel.css'
import { useMyContext } from '../../contexts/MyContext';
import { Data } from '../../types/grid';
import { Stack } from '@mui/material';


const InfoPanel: React.FC = () => {

  const { response, QvTotalingInfojson, isHistoricalActive, setisHistoricalActive,
  } = useMyContext();
  const [QvTotalingInfo, setQvTotalingInfo] = useState<Data>({
    QuoteCode: '',
    AbbreviatedName: '',
    MarketName: '',
    ListedSection: '',
    Today: '',
    CalculationDateTime: '',
    AverageDays: []
  });
  const handleChange1 = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null,
  ) => {
    if (newAlignment !== null) {
      setisHistoricalActive(newAlignment);
    }
  };
  useEffect(() => {
    if (response) {
      setQvTotalingInfo(QvTotalingInfojson);
    }
  }, [QvTotalingInfojson]);

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
        <p className="execution-time">実行日時: {QvTotalingInfo.CalculationDateTime}</p>
      </div>



    </div>
  );
};

export default InfoPanel;
