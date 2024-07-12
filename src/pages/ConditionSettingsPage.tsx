import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, Grid, Box, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import './ConditionSettingsPage.css'; // 确保 CSS 文件路径正确

const ConditionSettingsPage: React.FC = () => {
  const [interval, setInterval] = useState<number>(15);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [checkboxStates, setCheckboxStates] = useState({
    morningOpen: false,
    morningClose: false,
    afternoonOpen: false,
    afternoonClose: false,
    eveningOpen: false,
    eveningClose: false
  });

  const handleIntervalChange = (event: SelectChangeEvent<number>) => {
    setInterval(event.target.value as number);
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const [value, setValue] = useState(7);

  const handleIncrement = () => setValue(prev => prev + 1);
  const handleDecrement = () => setValue(prev => prev - 1);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({
      ...checkboxStates,
      [event.target.name]: event.target.checked
    });
  };

  const handleCalculate = () => {
    // Perform calculation or any other action here
    console.log('Calculate button clicked');
    console.log('Interval:', interval);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Checkbox States:', checkboxStates);
  };

  const handlePeriodChange = (event: React.MouseEvent<HTMLElement>, newPeriod: string | null) => {
    setSelectedPeriod(newPeriod);
  };

  return (
    <div className='Setting-div'>
    <Box p={1} >
      <Box>
        <Typography className='title-1' variant="h6" color="textPrimary" mb={2}>
          銘柄設定
        </Typography>
        <Grid container spacing={1} sx={{width:'500px'}} alignItems="center">
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" gap={2} width="85%">
              <Typography variant="body1" sx={{ minWidth: '60px'}}>
                銘柄入力
              </Typography>
              <TextField
                variant="outlined"
                value="6501"
                size="small"
                InputProps={{
                  endAdornment: null
                }}
                fullWidth={false}
                sx={{
                  width: '600px', // 或根据需要设置宽度
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">日立 東証プライム</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mb={0}>
        <Typography className='title-1' variant="h6" color="textPrimary" mb={2}>
          期間設定
        </Typography>
        <ToggleButtonGroup
          value={selectedPeriod}
          exclusive
          onChange={handlePeriodChange}
          aria-label="期間設定"
          sx={{ mb: 0.5 }}
        >
          <ToggleButton value="recent" aria-label="直近" sx={{paddingTop:0.5 ,paddingBottom:0.5}}>直近</ToggleButton>
          <ToggleButton value="start" aria-label="開始日"sx={{paddingTop:0.5 ,paddingBottom:0.5}}>開始日</ToggleButton>
          <ToggleButton value="end" aria-label="終了日"sx={{paddingTop:0.5 ,paddingBottom:0.5}}>終了日</ToggleButton>
          <ToggleButton value="range" aria-label="開始終了日"sx={{paddingTop:0.5 ,paddingBottom:0.5}}>開始終了日</ToggleButton>
          <ToggleButton value="sq" aria-label="SQ-日"sx={{paddingTop:0.5 ,paddingBottom:0.5}}>SQ-日</ToggleButton>
        </ToggleButtonGroup>
        <Box display="flex" alignItems="center" mt={0}>
          <Typography variant="body1" mr={2}>日数</Typography>
           <Button
        variant="outlined"
        size="small"
        onClick={handleDecrement}
        sx={{ 
          height: '20px',
          padding: '0', // Remove padding to ensure proper size
          minWidth: '20px', // Ensure minimum width is set
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '16px' }}>-</Typography>
      </Button>
      <TextField
        variant="outlined"
        value={value}
        size="small"
        InputProps={{ readOnly: true }} // Set input to read-only
        sx={{ width: '45px', height: '40px', mx: 1 }}// Set width and horizontal margins
      />
      <Button
        variant="outlined"
        size="small"
        onClick={handleIncrement}
        sx={{ 
          width: '20px', 
          height: '20px',
          padding: '0', // Remove padding to ensure proper size
          minWidth: '20px', // Ensure minimum width is set
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '16px' }}>+</Typography>
      </Button>
        </Box>
      </Box>

      <Box mb={0}>
        <Typography className='title-1' variant="h6" color="textPrimary" mb={2}>
          算出間隔
        </Typography>
        <Grid container spacing={2} mb={1}>
          <Grid item>
            <Typography variant="body1">間隔</Typography>
          </Grid>
          <Grid item>
            <Select value={interval} onChange={handleIntervalChange} size="small" variant="outlined">
              <MenuItem value={15}>15</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </Grid>
          <Grid item>
            <Typography variant="body1">分間隔</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="body1">開始終了時刻</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="time"
              variant="outlined"
              size="small"
              value={startTime}
              onChange={handleDateChange(setStartTime)}
           />
          </Grid>
          <Grid item>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="time"
              variant="outlined"
              size="small"
              value={endTime}
              onChange={handleDateChange(setEndTime)}
            />
          </Grid>
        </Grid>
        <Box mt={0}>
          <Typography variant="body1">個別算出</Typography>
        </Box>
        <Box mt={0}>
      <Grid container spacing={0}>
        {['前場', '後場', 'イブニング'].map((period) => (
          <Grid item xs={11} key={period}>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ flexShrink: 0, width: '100px' }}>
                {period}
              </Typography>
              <Box display="flex" alignItems="center" ml={0}>
                <FormControlLabel
                  control={<Checkbox checked={checkboxStates[`${period}Open`]} onChange={handleCheckboxChange} name={`${period}Open`} />}
                  label="寄付"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkboxStates[`${period}Close`]} onChange={handleCheckboxChange} name={`${period}Close`} />}
                  label="引け"
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
      </Box>

      <Box textAlign="center">
        <Button style={{marginRight:'200px'}} variant="contained" color="primary" onClick={handleCalculate}>算出</Button>
      </Box>
    </Box>
    </div>
  );
};

export default ConditionSettingsPage;
