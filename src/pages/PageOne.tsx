import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PageOne.css';
const PageOne: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<'volumeCurve' | 'historical'>('volumeCurve');
  const [checked, setChecked] = useState(false);
  const handleButtonClick = (type: 'volumeCurve' | 'historical') => {
    setSelectedButton(type);
    // 可以根据选中的按钮类型执行相应的处理逻辑
    if (type === 'volumeCurve') {
      // 处理“ボリュームカーブ”按钮点击的逻辑
    } else if (type === 'historical') {
      // 处理“ヒストリカル”按钮点击的逻辑
    }

  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const code = '0000';
  const codeName = 'ああああああ';
  const time = '0000/00/00 ～0000/00/00';
  const futuresContract = '日時';
  const executionTime = 'yyyy/mm/dd 00:00';
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Page H', uv: 280, pv: 3100, amt: 2200 },
    { name: 'Page I', uv: 390, pv: 5300, amt: 2300 },
    { name: 'Page J', uv: 180, pv: 2700, amt: 2400 },
    { name: 'Page K', uv: 250, pv: 4100, amt: 2500 },
    { name: 'Page L', uv: 330, pv: 5400, amt: 2600 },
    { name: 'Page M', uv: 410, pv: 6200, amt: 2700 },
    { name: 'Page N', uv: 360, pv: 5700, amt: 2800 },
    { name: 'Page O', uv: 430, pv: 6900, amt: 2900 },
    { name: 'Page P', uv: 290, pv: 5100, amt: 3000 },
    { name: 'Page Q', uv: 350, pv: 6300, amt: 3100 },
    { name: 'Page R', uv: 400, pv: 7400, amt: 3200 },
    { name: 'Page S', uv: 320, pv: 5900, amt: 3300 },
    { name: 'Page T', uv: 460, pv: 7500, amt: 3400 },
  ];
  return (
    <div>
      <ButtonGroup sx={{ paddingTop: '30px' }} variant="contained" aria-label="Basic button group">
        <Button
          onClick={() => handleButtonClick('volumeCurve')}
          variant={selectedButton === 'volumeCurve' ? 'contained' : 'outlined'}
        >
          ボリュームカーブ
        </Button>
        <Button
          onClick={() => handleButtonClick('historical')}
          variant={selectedButton === 'historical' ? 'contained' : 'outlined'}
        >
          ヒストリカル
        </Button>
      </ButtonGroup>
      <div className='message'>銘柄コード:{code}       銘柄名:{codeName}   期種:{futuresContract}   時間:{time}</div>
      <p>実行時間:{executionTime}</p>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="当日の価格チャートを表示" labelPlacement="start"
      />
      <div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="pv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PageOne;
