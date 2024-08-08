import { TextField, Box, Grid, Typography, Button, Stack, ToggleButton, ToggleButtonGroup, MenuItem, Checkbox, Select, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import './ConditionSetting.css';
import { useMyContext } from '../../contexts/MyContext';


const ConditionSetting: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [alignment, setAlignment] = React.useState('0');
  const [days, setDays] = useState<number>(1);
  const [value1, setValue1] = useState<number>(0);
  const [minutes, setminutes] = React.useState('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [marketState, setMarketState] = useState({
    preMarketOpening: false,
    preMarketClose: false,
    postMarketOpening: false,
    postMarketClose: false,
    eveningOpening: false,
    eveningClose: false,
  });
  const [startDate, setstartDate] = useState<string>('');
  const [endDate, setendDate] = useState<string>('');
  const [checkedState, setCheckedState] = React.useState<string[]>(['0', '0', '0']);
  const { setConditionSettingState, buttonName, isHistoricalActive, requestPayload, setRequestPayload, settingsState } = useMyContext();
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    if (setConditionSettingState) {
      setConditionSettingState({ marketState, inputValue });
    }

  }, [marketState, setConditionSettingState, requestPayload,]);
  const selectedStyle = {
    '&.Mui-selected': {
      backgroundColor: '#E8ECF0',
      color: '#143867',
      fontWeight: '900',
    },
  };
  const convertBoolToString = (value: boolean): string => value ? '1' : '0';
  const convertToBoolean = (value: string): boolean => {
    return value === '1';
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleIncrement = () => setDays(prev => prev + 1);
  const handleDecrement = () => setDays(prev => prev - 1);
  const handleChange = (event: SelectChangeEvent) => setminutes(event.target.value as string);
  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) setAlignment(newAlignment);

  };

  
  const handleCheckboxChange = (key: keyof typeof marketState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarketState({
      ...marketState,
      [key]: event.target.checked,
    });

  };


  const handleCalculate = () => {
    setRequestPayload({
      Code: inputValue,
      HistoricalSetting: {
        Category: alignment,
        Range: {
          DateFrom: startDate,
          DateTo: endDate,
          Days: String(days),
          SQ: {
            LargeSQ: checkedState[0],
            SmallSQ: checkedState[1],
            WeeklySQ: checkedState[2],
          },
        },
      },
      CalculationSetting: {
        Category: minutes,
        Range: {
          TimeFrom: startTime,
          TimeTo: endTime,
          Minutes: String(value1),
        },
        Individual: {
          AM: {
            OpenTick: convertBoolToString(marketState.preMarketOpening),
            CloseTick: convertBoolToString(marketState.preMarketClose),
          },
          PM: {
            OpenTick: convertBoolToString(marketState.postMarketOpening),
            CloseTick: convertBoolToString(marketState.postMarketClose),
          },
          Evening: {
            OpenTick: convertBoolToString(marketState.eveningOpening),
            CloseTick: convertBoolToString(marketState.eveningClose),
          },
        },
      },
      ViewSetting: {
        MostVolumeAndPriceType: settingsState.radioValues[0],
        PercentageOfDayType: convertBoolToString(settingsState.checkboxStates[3]),
      },

    });
    setIsReadyToSend(true)

  };

  useEffect(() => {
    if (Object.keys(requestPayload).length > 0) {
      if (isReadyToSend) {
        const isValid = validatePayload(requestPayload);
        if (isValid) {
        }
      }
    }
  }, [requestPayload]);

  useEffect(() => {
    setRequestPayload(requestPayload)
    setInputValue(requestPayload.Code)
    // setInputValue(a)
    setAlignment(requestPayload.HistoricalSetting.Category)
    setstartDate(requestPayload.HistoricalSetting.Range.DateFrom)
    setendDate(requestPayload.HistoricalSetting.Range.DateTo)
    setDays(Number(requestPayload.HistoricalSetting.Range.Days))
    setCheckedState([requestPayload.HistoricalSetting.Range.SQ.LargeSQ, requestPayload.HistoricalSetting.Range.SQ.SmallSQ, requestPayload.HistoricalSetting.Range.SQ.WeeklySQ])
    setminutes(requestPayload.CalculationSetting.Category)
    setStartTime(requestPayload.CalculationSetting.Range.TimeFrom)
    setEndTime(requestPayload.CalculationSetting.Range.TimeTo)
    setValue1(Number(requestPayload.CalculationSetting.Range.Minutes))
    setMarketState({
      preMarketOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.OpenTick),
      preMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.CloseTick),
      postMarketOpening:convertToBoolean(requestPayload.CalculationSetting.Individual.PM.OpenTick),
      postMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.PM.CloseTick),
      eveningOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.OpenTick),
      eveningClose: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.CloseTick),
    })
  }, [isHistoricalActive, buttonName]);



  const validatePayload = (payload: RequestPayload): boolean => {
    if (!payload.Code) {
      console.warn('コードが必須です');
      return false;
    }
    const category = payload.HistoricalSetting.Category;
    if (category === '1' && !payload.HistoricalSetting.Range.DateFrom) {
      console.warn('開始日が必須です');
      return false;
    }
    if (category === '2' && !payload.HistoricalSetting.Range.DateTo) {
      console.warn('終了日が必須です');
      return false;
    }
    if (category === '3' && !payload.HistoricalSetting.Range.DateTo && !payload.HistoricalSetting.Range.DateFrom) {
      console.warn('開始日と終了日が必須です');
      return false;
    }
    return true;
  };


  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);
  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = event.target.value;
    if (!endTime || newStartTime <= endTime) {
      setStartTime(newStartTime);
    }
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = event.target.value;
    if (!startTime || newEndTime >= startTime) {
      setEndTime(newEndTime);
    }
  };
  const sqhandleChange = (index: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState(prevState => ({
      ...prevState,
      [index]: event.target.checked
    }));
  };
  const renderUI = () => {
    switch (alignment) {
      case '0':
        return (
          <Stack direction="row" spacing={1} alignItems="center" className='counter-controls'>
            <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
            <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
            <TextField
              variant="outlined"
              value={days}
              size="small"
              InputProps={{ readOnly: true, sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
              sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
            />
            <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
          </Stack>
        );
      case '1':
        return (
          <div>
            <div>
              <p style={{ display: 'inline-block', fontSize: '10px' }}>開始日</p>
              <input className='setDate' type="date" value={startDate} max={today} onChange={handleDateChange(setstartDate)} />
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                InputProps={{ readOnly: true, sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );
      case '2':
        return (
          <div>
            <div>
              <p style={{ display: 'inline-block', fontSize: '10px' }}>終了日</p>
              <input className='setDate' type="date" value={endDate} onChange={handleDateChange(setendDate)} />
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                InputProps={{ readOnly: true, sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );
      case '3':
        return (
          <Grid container spacing={1} alignItems="center" sx={{ marginTop: '0px' }}>
            <Grid item>
              <Typography variant="body1" sx={{ fontSize: '10px' }}>期間</Typography>
            </Grid>
            <input className='setDate' type="date" value={startDate} max={today} onChange={handleDateChange(setstartDate)} />
            <Grid item>
              <Typography variant="body1">-</Typography>
            </Grid>
            <input className='setDate' type="date" value={endDate} min={startDate} onChange={handleDateChange(setendDate)} />
          </Grid>
        );
      case '4':
        return (
          <div>
            <FormControlLabel
              control={<Checkbox value={checkedState[0]} onChange={sqhandleChange('1')} />}
              label={<span style={{ fontSize: '10px' }}>Large-SQ</span>}
            />
            <FormControlLabel
              control={<Checkbox value={checkedState[1]} onChange={sqhandleChange('1')} />}
              label={<span style={{ fontSize: '10px' }}>Small-SQ</span>}
            />
            <FormControlLabel
              control={<Checkbox value={checkedState[2]} onChange={sqhandleChange('1')} />}
              label={<span style={{ fontSize: '10px' }}>Weekly-SQ</span>}
            />
          </div>
        );
      default:
        return null;
    }
  };
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (newValue < 1) {
      setValue1(1);
    } else if (newValue > 30) {
      setValue1(30);
    } else {
      setValue1(newValue);
    }
  };

  return (
    <><div className='commonsp-top'>
      <div className='commonsp'>

        <div className='title-1'>銘柄設定</div>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" sx={{ fontSize: "10px" }}>銘柄入力</Typography>
          <TextField
            sx={{
              width: '90px', height: '30px',
              '& .MuiInputBase-root': { height: '100%', padding: '0 0px' }
            }}
            value={inputValue}
            onChange={handleInputChange}
          />
        
        </Stack>

        <div className='title-1'>期間設定</div>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
          <ToggleButton value="0" className="ToggleButton" sx={selectedStyle}>直近</ToggleButton>
          <ToggleButton value="1" className="ToggleButton" sx={selectedStyle}>開始日</ToggleButton>
          <ToggleButton value="2" className="ToggleButton" sx={selectedStyle}>終了日</ToggleButton>
          <ToggleButton value="3" className="ToggleButton" sx={selectedStyle}> 開始終了日</ToggleButton>
          <ToggleButton value="4" className="ToggleButton" sx={selectedStyle}>SQ-日</ToggleButton>
        </ToggleButtonGroup>
        <div className="content-container">
          {renderUI()}
        </div>
        <div id='title-2' className='title-1'>算出間隔</div>
        <Stack direction="row" spacing={1} alignItems="center">
          <p>間隔</p>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={minutes} label="minutes" onChange={handleChange}>
            <MenuItem value={0}>1</MenuItem>
            <MenuItem value={1}>5</MenuItem>
            <MenuItem value={2}>10</MenuItem>
            <MenuItem value={3}>15</MenuItem>
            <MenuItem value={4}>30</MenuItem>
          </Select>
          <p>分間隔</p>
        </Stack>

        <Grid container spacing={1} alignItems="center" sx={{ marginTop: '5px' }}>
          <Grid item>
            <Typography variant="body1">開始終了時刻</Typography>
          </Grid>
          <Grid item>
            <TextField type="time" variant="outlined" sx={{ width: '82px' }} value={startTime} onChange={handleStartTimeChange} />
          </Grid>
          <Grid item>
            <Typography variant="body1">-</Typography>
          </Grid>
          {minutes == '0  ' ?
            <Box className="inputContainer">
              <TextField
                type="number"
                value={value1}
                onChange={handleChange1}
                inputProps={{
                  min: 1,
                  max: 30,
                  step: 1,
                }}
                className="inputField"
                variant="outlined"
              />
            </Box>
            :
            <Grid item>
              <TextField type="time" variant="outlined" sx={{ width: '82px' }} value={endTime} onChange={handleEndTimeChange} />
            </Grid>}

        </Grid>
        <p style={{ marginBottom: 0 }}>個别算出</p>
        <div>
          <Grid container spacing={1} alignItems="center" >
            <Typography variant="body1" padding='10px' paddingRight='50px'>前場</Typography>
            <FormControlLabel control={<Checkbox checked={marketState.preMarketOpening} onChange={handleCheckboxChange('preMarketOpening')} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={marketState.preMarketClose} onChange={handleCheckboxChange('preMarketClose')} />} label="引け" />
          </Grid>

          <Grid container spacing={1} alignItems="center" >
            <Typography variant="body1" padding='10px' paddingRight='50px'>後場</Typography>
            <FormControlLabel control={<Checkbox checked={marketState.postMarketOpening} onChange={handleCheckboxChange('postMarketOpening')} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={marketState.postMarketClose} onChange={handleCheckboxChange('postMarketClose')} />} label="引け" />
          </Grid>

          <Grid container spacing={1} alignItems="center" >
            <Typography variant="body1" padding='10px' paddingRight='13.7px'>イブニング</Typography>
            <FormControlLabel control={<Checkbox checked={marketState.eveningOpening} onChange={handleCheckboxChange('eveningOpening')} />} label="寄付" />
            <FormControlLabel control={<Checkbox checked={marketState.eveningClose} onChange={handleCheckboxChange('eveningClose')} />} label="引け" />
          </Grid>
        </div>
      </div>
      <Button sx={{ backgroundColor: '#143867', color: '#fff', marginLeft: '200px', borderRadius: '15px', marginTop: '25px' }} onClick={handleCalculate}>
        算出
      </Button>

    </div>



    </>
  );
};

export default ConditionSetting;