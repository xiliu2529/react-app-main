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

  const handleIncrement = () => setValue(prev => prev + 1);
  const handleDecrement = () => setValue(prev => prev - 1);
  const handleChange = (event: SelectChangeEvent) => setAge(event.target.value as string);
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) setAlignment(newAlignment);
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
        <ToggleButton value="1">直近</ToggleButton>
        <ToggleButton value="2">開始日</ToggleButton>
        <ToggleButton value="3">終了日</ToggleButton>
        <ToggleButton value="4">開始終了日</ToggleButton>
        <ToggleButton value="5">SQ-日</ToggleButton>
      </ToggleButtonGroup>

      <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body1">日数</Typography>
      
          <Button
            variant="outlined"
            size="small"
            onClick={handleDecrement}
            sx={{ padding: 0, width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', fontSize: '16px' }}
          >
            -
          </Button>
          <TextField
            variant="outlined"
            value={value}
            size="small"
            InputProps={{
              readOnly: true,
              sx: { padding: 0, '& input': { paddingLeft: 2, height: '30px' } }
            }}
            sx={{ width: '50px', '& .MuiOutlinedInput-root': { padding: 0 } }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={handleIncrement}
            sx={{ padding: 0, width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', fontSize: '16px' }}
          >
            +
          </Button>
        </Stack>
      </div>

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
      <p>個别算出</p>
      <div style={{width:'1000px'}}>
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
        <Grid item xs={1} >
          <Typography variant="body1" >イプニング</Typography>
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