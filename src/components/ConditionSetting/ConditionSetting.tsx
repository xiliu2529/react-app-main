import { TextField, Box, Grid, Typography, Button, Stack, ToggleButton, ToggleButtonGroup, MenuItem, Checkbox, Select, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import './ConditionSetting.css'
const ConditionSetting: React.FC = () => {
  const [alignment, setAlignment] = React.useState('1');
  const [value, setValue] = useState<number>(0);
  const [age, setAge] = React.useState('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [checkedA, setCheckedA] = useState<boolean>(false);
  const [checkedB, setCheckedB] = useState<boolean>(false);
  const [checkedC, setCheckedC] = useState<boolean>(false);
  const [checkedD, setCheckedD] = useState<boolean>(false);
  const [checkedE, setCheckedE] = useState<boolean>(false);
  const [checkedF, setCheckedF] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');

  // 创建一个状态对象来管理每个复选框的选中状态
  const [checkedState, setCheckedState] = React.useState<boolean[]>([
    false, // 复选框 1 的初始状态
    false, // 复选框 2 的初始状态
    false, // 复选框 3 的初始状态
  ]);
  const handleIncrement = () => setValue(prev => prev + 1);
  const handleDecrement = () => setValue(prev => prev - 1);
  const handleChange = (event: SelectChangeEvent) => setAge(event.target.value as string);
  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const renderUI = () => {
    switch (alignment) {
      case '1':
        return <div>
          <Stack direction="row" spacing={1} alignItems="center" className='counter-controls'>
            <Typography variant="body1">日数</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleDecrement}
              sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px' }}
            >-</Button>
            <TextField
              variant="outlined"
              value={value}
              size="small"
              InputProps={{
                readOnly: true,
                sx: { padding: 0, '& input': { paddingLeft: 2, height: '5px' } }
              }}
              sx={{ width: '40px', '& .MuiOutlinedInput-root': { padding: 0 } }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={handleIncrement}
              sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px' }}
            >+</Button>
          </Stack>
        </div>
      case '2':
        return (
          <div>
            <div>
              <p style={{ display: 'inline-block', marginRight: '8px' }}>開始日</p>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1">日数</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDecrement}
                sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px'}}
              >-</Button>
              <TextField
                variant="outlined"
                value={value}
                size="small"
                InputProps={{
                  readOnly: true,
                  sx: { padding: 0, '& input': { paddingLeft: 2, height: '10px' } }
                }}
                sx={{ width: '50px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleIncrement}
                sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px' }}
              >+</Button>
            </Stack>
          </div>
        )
      case '3':
        return (
          <div>
            <div>
              <p style={{ display: 'inline-block', marginRight: '8px' }}>終了日</p>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1">日数</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDecrement}
                sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px' }}
              >-</Button>
              <TextField
                variant="outlined"
                value={value}
                size="small"
                InputProps={{
                  readOnly: true,
                  sx: { padding: 0, '& input': { paddingLeft: 2, height: '10px' } }
                }}
                sx={{ width: '50px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleIncrement}
                sx={{ padding: 0, width: '30px', height: '10px', minWidth: '10px', minHeight: '20px', fontSize: '16px' }}
              >+</Button>
            </Stack>
          </div>
        )
      case '4':
        return (
          <Grid container spacing={1} alignItems="center"  className='counter-controls'>
            <Grid item>
              <Typography variant="body1">期間</Typography>
            </Grid>
            <Grid item>
              <TextField type="time" variant="outlined" size="small" value={startTime} onChange={handleDateChange(setStartTime)} />
            </Grid>
            <Grid item>
              <Typography variant="body1">-</Typography>
            </Grid>
            <Grid item>
              <TextField type="time" variant="outlined" size="small" value={endTime} onChange={handleDateChange(setEndTime)} />
            </Grid>
          </Grid>);
      case '5':
        return (
          <div>
          <FormControlLabel
            control={<Checkbox checked={checkedState[0]} onChange={sqhandleChange(0)} />}
            label={<span style={{ fontSize: '10px' }}>Large-SQ</span>}
          />
          <FormControlLabel
            control={<Checkbox checked={checkedState[1]} onChange={sqhandleChange(1)} />}
            label={<span style={{ fontSize: '10px' }}>Small-SQ</span>}
          />
          <FormControlLabel
            control={<Checkbox checked={checkedState[2]} onChange={sqhandleChange(2)} />}
            label={<span style={{ fontSize: '10px' }}>Weekly-SQ</span>}
          />
        </div>
        );
      default:
        return null;
    }
  };
  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);
  const handleChangeA = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedA(event.target.checked);
  const handleChangeB = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedB(event.target.checked);
  const handleChangeC = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedC(event.target.checked);
  const handleChangeD = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedD(event.target.checked);
  const handleChangeE = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedE(event.target.checked);
  const handleChangeF = (event: React.ChangeEvent<HTMLInputElement>) => setCheckedF(event.target.checked);
  const handleCalculate = () => {
    // 在这里处理点击按钮后的逻辑
    console.log("按钮被点击了！");
    // 你可以在这里执行一些计算或提交表单等操作
  };
  const sqhandleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // 创建一个新的状态副本
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? event.target.checked : item
    );
    // 更新状态
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className='commonsp'>
      <div className='title-1'>銘柄設定</div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body1">銘柄入力</Typography>
        <TextField
          sx={{
            width: '60px', height: '30px',
            '& .MuiInputBase-root': { height: '100%', padding: '0 8px' }
          }}
        />
        <Typography variant="body1">東証プライム</Typography>
      </Stack>

      <div className='title-1'>期間設定</div>
      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
        <ToggleButton value="1" className="ToggleButton">直近</ToggleButton>
        <ToggleButton value="2" className="ToggleButton">開始日</ToggleButton>
        <ToggleButton value="3" className="ToggleButton">終了日</ToggleButton>
        <ToggleButton value="4" className="ToggleButton">開始終了日</ToggleButton>
        <ToggleButton value="5" className="ToggleButton">SQ-日</ToggleButton>
      </ToggleButtonGroup>
      {renderUI()}
      <div id='title-2' className='title-1'>算出間隔</div>
      <Stack direction="row" spacing={1} alignItems="center">
        <p>間隔</p>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <p>分間隔</p>
      </Stack>

      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="body1">開始終了時刻</Typography>
        </Grid>
        <Grid item>
          <TextField type="time" variant="outlined" size="small" value={startTime} onChange={handleDateChange(setStartTime)} />
        </Grid>
        <Grid item>
          <Typography variant="body1">-</Typography>
        </Grid>
        <Grid item>
          <TextField type="time" variant="outlined" size="small" value={endTime} onChange={handleDateChange(setEndTime)} />
        </Grid>
      </Grid>
      <p style={{marginBottom:0}}>個别算出</p>
      <div style={{ width: '900px', flexDirection: 'row' }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography variant="body1">前場</Typography>
          </Grid>
          <Grid item xs>
            <FormControlLabel control={<Checkbox checked={checkedA} onChange={handleChangeA} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={checkedB} onChange={handleChangeB} />} label="引け" />
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography variant="body1">後場</Typography>
          </Grid>
          <Grid item xs>
            <FormControlLabel control={<Checkbox checked={checkedC} onChange={handleChangeC} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={checkedD} onChange={handleChangeD} />} label="引け" />
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography variant="body1">イプニング</Typography>
          </Grid>
          <Grid item xs>
            <FormControlLabel control={<Checkbox checked={checkedE} onChange={handleChangeE} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={checkedF} onChange={handleChangeF} />} label="引け" />
          </Grid>
        </Grid>
      </div>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={{ backgroundColor: '#143867' }} onClick={handleCalculate}>
          算出
        </Button>
      </Box>
    </div>
  );
};

export default ConditionSetting;