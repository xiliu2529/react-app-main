import { TextField, Box, Grid, Typography, Button, Stack, ToggleButton, ToggleButtonGroup, MenuItem, Checkbox, Select, FormControlLabel, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import './ConditionSetting.css';
import { useMyContext } from '../../contexts/MyContext';
import VALIDATION_MESSAGES from '../../../common/conf/clientMessage.json';
import { saveSettingsAPI, loadSettingsAPI, requestAPI, statusAPI } from '../../api/api';


const ConditionSetting: React.FC = () => {
  const [isExpanded, setisExpanded] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [alignment, setAlignment] = React.useState('');
  const [days, setDays] = useState<number>(1);
  const [value1, setValue1] = useState<number>(30);
  const [minutes, setminutes] = React.useState('');
  const [startTime, setStartTime] = useState<string>('');
  const [startTime1, setStartTime1] = useState<string>('');
  const [startTime2, setStartTime2] = useState<string>('');
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
  const today = new Date().toISOString().split('T')[0];
  const [endDate, setendDate] = useState<string>('');
  const [checkedState, setCheckedState] = React.useState<string[]>(['1', '1', '1']);
  const { setLoading, setError, setConditionSettingState, isHistoricalActive, requestPayload, setRequestPayload, setshowModal, showModal, settingsState, setResponse, ViewSettings } = useMyContext();
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [errorSQ, setErrorSQ] = useState<boolean>(false);
  const [errorDatefrom, seterrorDatefrom] = useState<boolean>(false);
  const [errorDateto, seterrorDateto] = useState<boolean>(false);
  const [validation, setValidation] = useState<{ error: boolean; helperText: string }>({
    error: false,
    helperText: '',
  });
  const selectedStyle = {
    '&.Mui-selected': {
      backgroundColor: '#E8ECF0',
      color: '#143867',
      fontWeight: '900',
    },
  };
  const handleInputDay = (event: any) => {
    if (event.target.value > 30) {
      setDays(30);
      return
    }
    if (event.target.value < 1) {
      setDays(1);
      return
    }
    setDays(event.target.value);
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  }
  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
  };
  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = event.target.value;
    setEndTime(newEndTime);
  };
  const sqhandleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState(prevState => {
      const newState = [...prevState];
      newState[index] = event.target.checked ? '1' : '0';
      return newState;
    });
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
  const getTenDaysAgoDate = (): string => {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 365);
    const year = tenDaysAgo.getFullYear();
    const month = String(tenDaysAgo.getMonth() + 1).padStart(2, '0');
    const day = String(tenDaysAgo.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const minDaysAgo = getTenDaysAgoDate();
  const convertBoolToString = (value: boolean): string => value ? '1' : '0';
  const convertToBoolean = (value: string): boolean => {
    return value === '1';
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleIncrement = () => setDays(prev => prev + 1);
  const handleDecrement = () => setDays(prev => (prev > 1 ? prev - 1 : prev));
  const handleChange = (event: SelectChangeEvent) => {
    setminutes(event.target.value as string)
    if (event.target.value == '0') {
      setStartTime(startTime2)
    } else {
      setStartTime(startTime1)
    }
  }
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
          DateFrom: startDate.split('-').join('/'),
          DateTo: endDate.split('-').join('/'),
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
    setIsReadyToSend(true);
    setConditionSettingState({ marketState, inputValue });
  };

  useEffect(() => {
    setisExpanded(window.innerWidth > 1400);

    //data取る
    const saveSettings = async () => {
      try {
        const result = await saveSettingsAPI();
        if (result.body.response.D.volumecurve_info.HistoricalSetting && result.body.response.D.volumecurve_info.CalculationSetting) {
          const requestPayload = result.body.response.D.volumecurve_info;
          console.log('resultc', requestPayload);
          setAlignment(requestPayload.HistoricalSetting.Category);
          setstartDate(requestPayload.HistoricalSetting.Range.DateFrom.split('/').join('-'));
          setendDate(requestPayload.HistoricalSetting.Range.DateTo.split('/').join('-'));
          setDays(Number(requestPayload.HistoricalSetting.Range.Days));
          setCheckedState([requestPayload.HistoricalSetting.Range.SQ.LargeSQ, requestPayload.HistoricalSetting.Range.SQ.SmallSQ, requestPayload.HistoricalSetting.Range.SQ.WeeklySQ]);
          setminutes(requestPayload.CalculationSetting.Category);
          setStartTime(requestPayload.CalculationSetting.Range.TimeFrom);
          setEndTime(requestPayload.CalculationSetting.Range.TimeTo);
          setValue1(Number(requestPayload.CalculationSetting.Range.Minutes));
          setMarketState({
            preMarketOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.OpenTick),
            preMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.CloseTick),
            postMarketOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.PM.OpenTick),
            postMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.PM.CloseTick),
            eveningOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.OpenTick),
            eveningClose: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.CloseTick),
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    saveSettings();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleCalculate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, alignment, startDate, endDate, days, checkedState, minutes, startTime, endTime, value1, marketState, settingsState]);

  useEffect(() => {
    if (minutes == '0') {
      setStartTime2(startTime)
      setEndTime('')
    } else {
      setStartTime1(startTime)
    }
  }, [startTime])

  useEffect(() => {
    setshowModal({
      Code: inputValue,
      HistoricalSetting: {
        Category: alignment,
        Range: {
          DateFrom: startDate.split('/').join('-'),
          DateTo: endDate.split('/').join('-'),
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
  }, [inputValue, alignment, startDate, endDate, days, checkedState, minutes, startTime, endTime, value1, marketState]);


  //data更新
  const loadSettings = async () => {
    try {
      const HistoricalSetting: HistoricalSetting = showModal.HistoricalSetting
      const CalculationSetting: CalculationSetting = showModal.CalculationSetting
      await loadSettingsAPI({ ViewSettings, HistoricalSetting, CalculationSetting });
      console.log('HistoricalSetting,CalculationSetting Post成功', { ViewSettings, HistoricalSetting, CalculationSetting });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  const makeRequest = async (requestPayload: RequestPayload) => {
    try {
      const response = await requestAPI(requestPayload);
      return response;

    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  const fetchStatus = async (ID: any) => {
    try {
      const response = await statusAPI(ID);
      return response;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(requestPayload).length > 0) {
        if (isReadyToSend) {
          const isValid = validatePayload(requestPayload);

          setResponse(isValid);
          if (isValid) {
            setLoading(true);

            // 設定保存
            await loadSettings();

            //ok



            // IDチェック
            const request = await makeRequest(requestPayload);
            console.log('request---', request);

            // IDを使って1をもらう     
            // 1まで5秒ごとに確認する
            const ID = request.body.RequestID;
            console.log('ID', ID);


            // const status = await fetchStatus(ID);
            // console.log('status', status);


            async function checkStatus() {

              let intervalId: any;

              async function pollStatus() {
                try {
                  const status = await fetchStatus(ID);
                  console.log('status---fetchStatus', status);
                  if (status.Status === 0) {
                    //0だったら、5秒ごとに確認する
                    console.log('0 です', status);
                  } else if (status.Status === 1) {
                    // 状態が1の場合の処理
                    console.log('1です', status);
                    // 定期的な確認を停止
                    clearInterval(intervalId);
                    // 必要な処理をここで実行
                    // データを取得する
                    // QvTotalingInfoを取得
                    // QvVolumeCurveData
                    // QvChartData
                    // QvHistoricalData
                  } else if (status.Status === -1) {
                    console.log('状態の取得中にエラー:', status);
                    // エラーが発生した場合も定期的な確認を停止
                    clearInterval(intervalId);
                    //error表示
                    setError({ show: '1', type: status.MessageCode });



                  }
                } catch (error) {
                  // 状態の取得中にエラーが発生した場合の処理
                  console.error('他のエラー:', error);
                }
              }

              // 5秒ごとにpollStatus関数を呼び出す
              intervalId = setInterval(pollStatus, 5000);
              // 初回の呼び出しを行い、5秒待たずに最初の確認を行う
              // await pollStatus();
            }

            // checkStatus関数を呼び出す
            checkStatus();

            // 処理が完了した後、ローディングを停止
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [requestPayload]);


  useEffect(() => {
    setInputValue(showModal.Code);
    setAlignment(showModal.HistoricalSetting.Category);
    setstartDate(showModal.HistoricalSetting.Range.DateFrom);
    setendDate(showModal.HistoricalSetting.Range.DateTo);
    setDays(Number(showModal.HistoricalSetting.Range.Days));
    setCheckedState([showModal.HistoricalSetting.Range.SQ.LargeSQ, showModal.HistoricalSetting.Range.SQ.SmallSQ, showModal.HistoricalSetting.Range.SQ.WeeklySQ]);
    setminutes(showModal.CalculationSetting.Category);
    setStartTime(showModal.CalculationSetting.Range.TimeFrom);
    setEndTime(showModal.CalculationSetting.Range.TimeTo);
    setValue1(Number(showModal.CalculationSetting.Range.Minutes));
    setMarketState({
      preMarketOpening: convertToBoolean(showModal.CalculationSetting.Individual.AM.OpenTick),
      preMarketClose: convertToBoolean(showModal.CalculationSetting.Individual.AM.CloseTick),
      postMarketOpening: convertToBoolean(showModal.CalculationSetting.Individual.PM.OpenTick),
      postMarketClose: convertToBoolean(showModal.CalculationSetting.Individual.PM.CloseTick),
      eveningOpening: convertToBoolean(showModal.CalculationSetting.Individual.Evening.OpenTick),
      eveningClose: convertToBoolean(showModal.CalculationSetting.Individual.Evening.CloseTick),
    });

  }, [isHistoricalActive]);

  //データ制御
  const validatePayload = (payload: RequestPayload): boolean => {
    const category = payload.HistoricalSetting.Category;
    const DateTo = payload.HistoricalSetting.Range.DateTo
    const DateFrom = payload.HistoricalSetting.Range.DateFrom
    let hasError = false;
    const newValidationState = { error: false, helperText: '' };
    const todayFormatted = today.split('-').join('/');
    if (!payload.Code) {
      newValidationState.error = true;
      newValidationState.helperText = VALIDATION_MESSAGES.WCI028;
      setValidation(newValidationState);
      hasError = true;
    } else {
      setValidation({ error: false, helperText: '' });
    }

    if (category === '1') {
      if (!DateFrom || DateFrom > todayFormatted) {
        seterrorDatefrom(true);
        hasError = true;
      } else {
        seterrorDatefrom(false);
      }
    }
    if (category === '2' && !DateTo) {
      seterrorDateto(true);
      hasError = true;
    } else {
      seterrorDateto(false);
    }
    if (category === '3') {
      if (DateTo < DateFrom || !DateFrom || !DateTo || DateFrom > DateTo) {
        seterrorDatefrom(true);
        hasError = true;
      } else {
        seterrorDatefrom(false);
      }
    }
    if (category === '4') {
      const sq = payload.HistoricalSetting.Range.SQ;
      if (sq.LargeSQ === '0' && sq.SmallSQ === '0' && sq.WeeklySQ === '0') {
        setErrorSQ(true);
        hasError = true;
      } else {
        setErrorSQ(false);
      }
    }


    return !hasError;
  };

  const renderUI = () => {
    const currentAlignment = alignment || '0';

    switch (currentAlignment) {
      case '0':
        return (
          <div style={{ height: "80px" }}>
            <Stack direction="row" spacing={1} alignItems="center" className='counter-controls'>
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                onChange={handleInputDay}
                InputProps={{ sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );
      case '1':
        return (
          <div style={{ height: "90px" }}>
            <div style={{ height: "60px" }}>
              <p style={{ display: 'inline-block', fontSize: '10px' }}>開始日</p>
              <input className='setDate' type="date" value={startDate || showModal.HistoricalSetting.Range.DateFrom} min={minDaysAgo} onChange={handleDateChange(setstartDate)} />
              {errorDatefrom &&
                <FormHelperText style={{ color: '#d32f2f', marginLeft: '35px', marginTop: 0 }}
                >  {startDate ? VALIDATION_MESSAGES.WCI031 : VALIDATION_MESSAGES.WCI029}</FormHelperText>}
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                onChange={handleInputDay}
                InputProps={{ sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );
      case '2':
        return (
          <div style={{ height: "90px" }}>
            <div style={{ height: "60px" }}>
              <p style={{ display: 'inline-block', fontSize: '10px' }}>終了日</p>
              <input className='setDate' type="date" value={endDate} onChange={handleDateChange(setendDate)} />
              {errorDateto &&
                <FormHelperText style={{ color: '#d32f2f', marginLeft: '35px', marginTop: 0 }}>{VALIDATION_MESSAGES.WCI030}</FormHelperText>}
            </div>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                onChange={handleInputDay}
                InputProps={{ sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );
      case '3':
        return (
          <div style={{ height: "90px" }}>
            <Grid container spacing={1} alignItems="center" sx={{ marginTop: '0px' }}>
              <Grid item>
                <p style={{ display: 'inline-block', fontSize: '10px' }}>期間</p>
              </Grid>
              <input className='setDate' type="date" value={startDate} min={minDaysAgo} onChange={handleDateChange(setstartDate)} />

              <Grid  >
                <Typography sx={{ marginTop: '10px' }}>―</Typography>
              </Grid>
              <input className='setDate' type="date" value={endDate} onChange={handleDateChange(setendDate)} />
            </Grid>
            {errorDatefrom &&
              <FormHelperText style={{ color: '#d32f2f', marginLeft: '25px', marginTop: 0 }}>{VALIDATION_MESSAGES.WCI032}</FormHelperText>}
          </div>
        );
      case '4':
        return (
          <div className='SQ-css'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedState[0] === '1'}
                  onChange={sqhandleChange(0)}
                />
              }
              label={<span style={{ fontSize: '10px' }}>Large-SQ</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedState[1] === '1'}
                  onChange={sqhandleChange(1)}
                />
              }
              label={<span style={{ fontSize: '10px' }}>Small-SQ</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedState[2] === '1'}
                  onChange={sqhandleChange(2)}
                />
              }
              label={<span style={{ fontSize: '10px' }}>Weekly-SQ</span>}
            />

            {errorSQ &&
              <FormHelperText style={{ color: '#d32f2f', marginTop: 0 }}>{VALIDATION_MESSAGES.WCI033}</FormHelperText>}


          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className='commonsp-top'
      //モニター対応
      style={isExpanded ? { transform: 'scale(1.4)', transformOrigin: '0 0', marginRight: '120px' } : {}}
    >
      <div className='commonsp'>
        <div className='title-1'>銘柄設定</div>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" sx={{ fontSize: "10px" }}>銘柄入力</Typography>
          <TextField
            sx={{
              width: '90px', height: '30px', pa: '20px',
              '& .MuiInputBase-root': { height: '100%', padding: '0 0px', }, '& .MuiFormHelperText-root': {
                whiteSpace: 'nowrap',
                margin: '0 0px',
              },
              '& input:-webkit-autofill': {
                boxShadow: '0 0 0px 1000px white inset !important'
              },
            }}
            error={validation.error}
            helperText={validation.helperText}
            value={inputValue}
            onChange={handleInputChange}
          />
        </Stack>

        <div className='title-1' id='title-1-2'>期間設定</div>
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
        <div style={{ height: '50px' }}>
          <Grid container spacing={1} alignItems="center" sx={{ marginTop: '5px' }}>
            <Grid item>
              <Typography variant="body1">開始終了時刻</Typography>
            </Grid>
            <Grid item>
              <TextField className='custom-time-input' type="time" variant="outlined" sx={{
                width: '82px', '& input::-webkit-calendar-picker-indicator': {
                  cursor: 'pointer'
                }
              }} value={startTime} onChange={handleStartTimeChange} />
            </Grid>
            <Grid item>
              <Typography variant="body1">-</Typography>
            </Grid>
            {minutes == '0  ' ?
              <>  <Box className="inputContainer">
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
                <Typography sx={{ marginTop: '7px' }}>
                  分
                </Typography></>
              :
              <Grid item>
                <TextField className='custom-time-input' type="time" variant="outlined" sx={{
                  width: '82px',
                  '& input::-webkit-calendar-picker-indicator': {
                    cursor: 'pointer'
                  }
                }} value={endTime} onChange={handleEndTimeChange} />
              </Grid>}

          </Grid>
        </div>
        <p style={{ marginBottom: '10px' }}>個别算出</p>
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
      <Button sx={{ backgroundColor: '#143867', color: '#fff', marginLeft: '230px', borderRadius: '15px', marginTop: '5px' }}
        onClick={handleCalculate}>
        算出
      </Button>
    </div >

  );
};

export default ConditionSetting;