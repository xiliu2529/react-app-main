import { TextField, Box, Grid, Typography, Button, Stack, ToggleButton, ToggleButtonGroup, MenuItem, Checkbox, Select, FormControlLabel, FormHelperText } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './ConditionSetting.css';
import { useMyContext } from '../../contexts/MyContext';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import { Helmet } from 'react-helmet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { saveSettingsAPI, loadSettingsAPI, requestAPI, statusAPI, getQvDataAPI, packageAPI, serverMessageAPI, clientMessageAPI } from '../../api/api';
dayjs.locale('ja');

const ConditionSetting: React.FC = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [alignment, setAlignment] = useState<string>('');
  const [days, setDays] = useState<number | ''>(1);
  const [selectedMinutes, setselectedMinutes] = useState<number | null>(null);
  const [minutes, setminutes] = useState<string>('');
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
  const { setclearData, setclientMessage, setserverMessage, clientMessage, hasLoaded, setHasLoaded, Noacl, setNoacl, setSaveViewSettings, setQvChartDatajson, setQvHistoricalDatajson, loading, setQvTotalingInfojson, setQvVolumeCurveDatajson, setLoading, setError, setConditionSettingState, isHistoricalActive, requestPayload, setRequestPayload, setshowModal, showModal, settingsState, setResponse, ViewSettings } = useMyContext();
  const [isReadyToSend, setIsReadyToSend] = useState(false);
  const [errorSQ, setErrorSQ] = useState<boolean>(false);
  const [errorDatefrom, seterrorDatefrom] = useState<boolean>(false);
  const [errorDateto, seterrorDateto] = useState<boolean>(false);
  const [errorDatetofrom, seterrorDatetofrom] = useState<boolean>(false);
  const [TimeError, setTimeError] = useState<boolean>(false);
  const [datafromErrortext, setdatafromErrortext] = useState<boolean>(false);
  const [datatoErrortext, setdatatoErrortext] = useState<boolean>(false);
  const [validation, setValidation] = useState<{ error: boolean; helperText: string }>({
    error: false,
    helperText: '',
  });
  const loadingRef = useRef(loading);
  useEffect(() => {
    if (startDate == 'Invalid Date') {
      setstartDate('null')
    }
    if (endDate == 'Invalid Date') {
      setendDate('null')
    }
  }, [alignment]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const selectedStyle = {
    '&.Mui-selected': {
      backgroundColor: '#E8ECF0',
      color: '#143867',
      fontWeight: '900',
    },
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === '.' || event.key === 'e') {
      event.preventDefault();
    }
  };

  const handleInputDay = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setDays('');
      return;
    }
    if (!/^\d*$/.test(inputValue)) {
      return;
    }
    const numericValue = parseInt(inputValue, 10);
    if (numericValue > 30) {
      setDays(30);
      return;
    }
    if (numericValue < 1) {
      setDays(1);
      return;
    }
    setDays(numericValue);
  };

  const handleBlur = () => {
    if (days === '') {
      setDays(10);
    }
  };

  const handleMinutesBlur = () => {
    if (selectedMinutes === null) {
      setselectedMinutes(30);
    }
  };

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

  const updateMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setselectedMinutes(null);
      return;
    }
    const newValue = Number(inputValue);
    if (newValue < 1) {
      setselectedMinutes(1);
    } else if (newValue > 30) {
      setselectedMinutes(30);
    } else {
      setselectedMinutes(newValue);
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
  const handleIncrement = () => {
    setDays(prev => (Number(prev) < 30 ? Number(prev) + 1 : prev));
  };
  const handleDecrement = () => {
    setDays(prev => (Number(prev) > 1 ? Number(prev) - 1 : prev));
  };
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

  let hasTriggered = false;
  const handleEnterPress = (event: React.KeyboardEvent) => {
    if(!loading){
    if (!hasTriggered && event.key === 'Enter') {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.id === 'stock-input') {
        hasTriggered = true;
        handleCalculate();
        setTimeout(() => { hasTriggered = false; }, 1000);
      }
    }
  }
  };
  const handleCalculate = () => {
    setTimeError(false)
    setErrorSQ(false)
    seterrorDatetofrom(false)
    seterrorDateto(false)
    seterrorDatefrom(false)

    setResponse(false)
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
          Minutes: String(selectedMinutes),
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
    let NOACL = false;
    if (hasLoaded) return;
    getclientMessage()
    getserverMessage()
    packageAPI()
      .then(({ noaclFlag, result }) => {
        NOACL = noaclFlag
        if (!result) {
          setError({ show: '2', type: "ECI002" });
        }
        setNoacl(noaclFlag)
        if (!NOACL) {
          const loadSettings = async () => {
            try {
              const result = await loadSettingsAPI();
              if (result.body.response.D.volumecurve_info.HistoricalSetting && result.body.response.D.volumecurve_info.CalculationSetting
                && result.body.response.D.volumecurve_info.ViewSettings) {
                const requestPayload = result.body.response.D.volumecurve_info;
                setAlignment(requestPayload.HistoricalSetting.Category);
                setstartDate(requestPayload.HistoricalSetting.Range.DateFrom);
                setendDate(requestPayload.HistoricalSetting.Range.DateTo);
                setDays(Number(requestPayload.HistoricalSetting.Range.Days));
                setCheckedState([requestPayload.HistoricalSetting.Range.SQ.LargeSQ, requestPayload.HistoricalSetting.Range.SQ.SmallSQ, requestPayload.HistoricalSetting.Range.SQ.WeeklySQ]);
                setminutes(requestPayload.CalculationSetting.Category);
                setStartTime(requestPayload.CalculationSetting.Range.TimeFrom);
                setEndTime(requestPayload.CalculationSetting.Range.TimeTo);
                setselectedMinutes(Number(requestPayload.CalculationSetting.Range.Minutes));
                setMarketState({
                  preMarketOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.OpenTick),
                  preMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.AM.CloseTick),
                  postMarketOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.PM.OpenTick),
                  postMarketClose: convertToBoolean(requestPayload.CalculationSetting.Individual.PM.CloseTick),
                  eveningOpening: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.OpenTick),
                  eveningClose: convertToBoolean(requestPayload.CalculationSetting.Individual.Evening.CloseTick),
                });
                setSaveViewSettings(requestPayload.ViewSettings)
              }
            } catch (err) {
              console.error('Error fetching data:', err);
            }
          };
          loadSettings();
        } else {
          setTitle('システム障害対応中！！ボリュームカーブ')
        }
      })

    setHasLoaded(true);
  }, [hasLoaded]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (loading) {
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loading]);


  useEffect(() => {
    if (minutes == '0') {
      setStartTime2(startTime)
      setEndTime('')
    } else {
      setStartTime1(startTime)
    }
  }, [startTime])


  useEffect(() => {
    setTimeError(false)
  }, [minutes])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setshowModal({
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
          Minutes: String(selectedMinutes),
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
    });
  }, [inputValue, alignment, startDate, endDate, days, checkedState, minutes, startTime, endTime, selectedMinutes, marketState]);

  const saveSettings = async () => {
    try {
      const HistoricalSetting: HistoricalSetting = showModal.HistoricalSetting
      const CalculationSetting: CalculationSetting = showModal.CalculationSetting
      await saveSettingsAPI({ ViewSettings, HistoricalSetting, CalculationSetting });
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
  const getQvData = async (id: any, qv: any) => {
    try {
      const response = await getQvDataAPI(id, qv);
      return response;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getserverMessage = async () => {
    try {
      const response = await serverMessageAPI();
      setserverMessage(response)
      return response;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  const getclientMessage = async () => {
    try {
      const response = await clientMessageAPI();
      setclientMessage(response)
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
          if (isValid) {
            setclearData(true)
            setLoading(true);
            if (!Noacl) {
              await saveSettings();
            }
            try {
              const request = await makeRequest(requestPayload);
              if (request.body && request.body.RequestID) {
                const ID = request.body.RequestID;
                checkStatus(ID);
              } else {
                setLoading(false)
                console.error('Invalid response:', request);
              }
            } catch (error) {
              setLoading(false)
              console.error('Request failed:', error);
            }
            async function checkStatus(ID: any) {
              let intervalId: NodeJS.Timeout;
              async function pollStatus() {
                try {
                  if (!loadingRef.current) {
                    clearInterval(intervalId);
                    return;
                  }
                  const status = await fetchStatus(ID);
                  if (status.Status == 1) {
                    setclearData(false)
                    clearInterval(intervalId);
                    setResponse(true)
                    // QvTotalingInfo
                    const QvTotalingInfo = await getQvData(ID, 'QvTotalingInfo.json');
                    setQvTotalingInfojson(QvTotalingInfo)

                    // QvVolumeCurveData
                    const QvVolumeCurveData = await getQvData(ID, 'QvVolumeCurveData.json');
                    setQvVolumeCurveDatajson(QvVolumeCurveData)

                    // QvChartData
                    const QvChartData = await getQvData(ID, 'QvChartData.json');
                    setQvChartDatajson(QvChartData)

                    // QvHistoricalData
                    const QvHistoricalData = await getQvData(ID, 'QvHistoricalData.json');
                    setQvHistoricalDatajson(QvHistoricalData)

                    setLoading(false);
                  } else if (status.Status === -1) {
                    clearInterval(intervalId);
                    if (status.MessageCode == '') {
                      setError({ show: '2', type: "ECR001" });
                    } else {
                      setError({ show: '1', type: status.MessageCode });
                    }
                    setLoading(false);
                  }
                } catch (error) {
                  clearInterval(intervalId);
                  console.error('他のエラー:', error);
                  setLoading(false);
                }
              }
              intervalId = setInterval(() => {
                pollStatus();
              }, 1000);
            }
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
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
    setselectedMinutes(Number(showModal.CalculationSetting.Range.Minutes));
    setMarketState({
      preMarketOpening: convertToBoolean(showModal.CalculationSetting.Individual.AM.OpenTick),
      preMarketClose: convertToBoolean(showModal.CalculationSetting.Individual.AM.CloseTick),
      postMarketOpening: convertToBoolean(showModal.CalculationSetting.Individual.PM.OpenTick),
      postMarketClose: convertToBoolean(showModal.CalculationSetting.Individual.PM.CloseTick),
      eveningOpening: convertToBoolean(showModal.CalculationSetting.Individual.Evening.OpenTick),
      eveningClose: convertToBoolean(showModal.CalculationSetting.Individual.Evening.CloseTick),
    });
  }, [isHistoricalActive]);

  const validatePayload = (payload: RequestPayload): boolean => {
    const category = payload.HistoricalSetting.Category;
    const DateTo = payload.HistoricalSetting.Range.DateTo
    const DateFrom = payload.HistoricalSetting.Range.DateFrom
    let hasError = false;
    const newValidationState = { error: false, helperText: '' };
    const todayFormatted = today;
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(new Date().getFullYear() - 1);
    const startTime = payload.CalculationSetting.Range.TimeFrom
    const endTime = payload.CalculationSetting.Range.TimeTo

    if (!payload.Code) {
      newValidationState.error = true;
      newValidationState.helperText = clientMessage.WCI028;
      setValidation(newValidationState);
      hasError = true;
    } else {
      setValidation({ error: false, helperText: '' });
    }

    if (category === '1') {
      if (DateFrom == 'null') {
        seterrorDatefrom(true);
        setdatafromErrortext(false)
        hasError = true;
      } else {
        if (DateFrom > todayFormatted) {
          seterrorDatefrom(true);
          setdatafromErrortext(true)
          hasError = true;
        } else {
          seterrorDatefrom(false);
        }
      }
    }
    if (category === '2') {
      if (DateTo == 'null') {
        seterrorDateto(true);
        setdatatoErrortext(false)
        hasError = true;
      } else {
        if (DateTo == 'Invalid Date') {
          seterrorDateto(true);
          setdatatoErrortext(true)
          hasError = true;
        } else {
          seterrorDateto(false);
        }
      }
    }

    if (category === '3') {
      if (DateFrom === 'Invalid Date' || DateTo === 'Invalid Date' || DateFrom == 'null' || DateTo == 'null') {
        seterrorDatetofrom(true);
        hasError = true;
      } else if (DateTo < DateFrom) {
        seterrorDatetofrom(true);
        hasError = true;
      }
      else {
        seterrorDatetofrom(false);
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
    if (minutes !== '0') {
      if (startTime && endTime) {
        if (startTime > endTime) {
          setTimeError(true);
          hasError = true;
        } else {
          setTimeError(false);
        }
      } else {
        setTimeError(false);
      }
    }

    return !hasError;
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setstartDate(newValue.format('YYYY-MM-DD'))
    } else {
      setstartDate('null')
    }
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setendDate(newValue.format('YYYY-MM-DD'))
    } else {
      setendDate('null')
    }
  };

  const theme = createTheme(
    {
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              minWidth: '100px !important',
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
              marginRight: '0',
              '& .MuiInputBase-input': {
                fontSize: '10px',
                paddingRight: '0px !important',
                paddingTop: '5px !important',
              },
              '& .MuiOutlinedInput-root': {
                width: '105px',
                height: '27px',
                marginLeft: '5px',
                overflow: 'hidden',
              },
              '& .MuiInputAdornment-root': {
                marginLeft: '0px',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '12px',
                padding: '0px !important',
              },
            },
          },
        },
        // @ts-ignore
        MuiDateCalendar: {
          styleOverrides: {
            root: {
              height: '280px !important',
            },
          },
        },
      },
    },
  )

  const renderUI = () => {
    const currentAlignment = alignment || '0';
    switch (currentAlignment) {
      case '0':
        return (
          <div style={{ height: "86px" }}>
            <Stack direction="row" spacing={1} alignItems="center" className='counter-controls'>
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                type="number"
                value={days}
                size="small"
                onChange={handleInputDay}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                InputProps={{
                  sx: {
                    padding: 0,
                    '& input': {
                      height: '10px',
                      textAlign: 'center',
                      appearance: 'textfield',
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        appearance: 'none',
                        margin: 0,
                      },
                    },
                  },
                }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div>
        );

      case '1':
        return (
          <div style={{ height: "90px" }}>
            <div style={{ display: 'flex', alignItems: 'center', height: "35px", marginTop: '6px' }}>
              <p style={{ fontSize: '10px' }}>開始日</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja"
                localeText={{
                  todayButtonLabel: "今日",
                }}>
                <DemoContainer components={['DatePicker']} sx={{ padding: '0' }}>
                  <ThemeProvider theme={theme}>
                    <DatePicker
                      value={startDate ? dayjs(startDate) : dayjs(showModal.HistoricalSetting.Range.DateFrom)}
                      minDate={dayjs(minDaysAgo)}
                      onChange={handleStartDateChange}
                      format="YYYY/MM/DD"
                      slotProps={{
                        actionBar: {
                          actions: ['today'],
                        },
                      }}
                    />
                  </ThemeProvider>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ height: '10px', marginTop: '-5px' }}>
              {errorDatefrom &&
                <FormHelperText style={{ color: '#d32f2f', marginLeft: '35px', marginTop: 0 }}
                >
                  {datafromErrortext ? clientMessage.WCI031 : clientMessage.WCI029}</FormHelperText>
              }</div>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                onChange={handleInputDay}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
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
            <div style={{ display: 'flex', alignItems: 'center', height: "35px", marginTop: '6px' }}>
              <p style={{ fontSize: '10px' }}>終了日</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja"
                localeText={{
                  todayButtonLabel: "今日",
                }}>
                <DemoContainer components={['DatePicker']} sx={{ padding: '0' }}>
                  <ThemeProvider theme={theme}>
                    <DatePicker
                      value={endDate ? dayjs(endDate) : dayjs(showModal.HistoricalSetting.Range.DateTo)}
                      onChange={handleEndDateChange}
                      format="YYYY/MM/DD"
                      minDate={dayjs(minDaysAgo)}
                      slotProps={{
                        actionBar: {
                          actions: ['today'],
                        },
                      }}
                    />
                  </ThemeProvider>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ height: '10px', marginTop: '-5px' }}>
              {errorDateto &&
                <FormHelperText style={{ color: '#d32f2f', marginLeft: '35px', marginTop: 0 }}>
                  {datatoErrortext ? clientMessage.WCI032 : clientMessage.WCI030}</FormHelperText>
              }
            </div>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography variant="body1" sx={{ fontSize: '10px' }}>日数</Typography>
              <Button variant="outlined" size="small" onClick={handleDecrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>-</Button>
              <TextField
                variant="outlined"
                value={days}
                size="small"
                onChange={handleInputDay}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                InputProps={{ sx: { padding: 0, '& input': { height: '10px', textAlign: 'center' } } }}
                sx={{ width: '55px', '& .MuiOutlinedInput-root': { padding: 0 } }}
              />
              <Button variant="outlined" size="small" onClick={handleIncrement} sx={{ padding: 0, width: '25px', minWidth: '25px', height: '25px', fontSize: '25px' }}>+</Button>
            </Stack>
          </div >
        );

      case '3':
        return (
          <div style={{ height: "90px" }}>
            <div style={{ display: 'flex', alignItems: 'center', height: "35px", marginTop: '6px' }}>
              <p style={{ display: 'inline-block', fontSize: '10px' }}>期間</p>
              <LocalizationProvider></LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja"
                localeText={{
                  todayButtonLabel: "今日",
                }}>
                <DemoContainer components={['DatePicker']} sx={{ padding: '0' }}>
                  <ThemeProvider theme={theme}>
                    <DatePicker
                      value={startDate ? dayjs(startDate) : dayjs(showModal.HistoricalSetting.Range.DateFrom)}
                      onChange={handleStartDateChange}
                      minDate={dayjs(minDaysAgo)}
                      format="YYYY/MM/DD"
                      slotProps={{
                        actionBar: {
                          actions: ['today'],
                        },
                      }}
                    />
                  </ThemeProvider>
                </DemoContainer>
              </LocalizationProvider>
              <Typography sx={{ margin: '2px', marginLeft: '6px' }}>―</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja"
                localeText={{
                  todayButtonLabel: "今日",
                }}>
                <DemoContainer components={['DatePicker']} sx={{ padding: '0' }}>
                  <ThemeProvider theme={theme}>
                    <DatePicker
                      value={endDate ? dayjs(endDate) : dayjs(showModal.HistoricalSetting.Range.DateTo)}
                      onChange={handleEndDateChange}
                      format="YYYY/MM/DD"
                      minDate={dayjs(minDaysAgo)}
                      slotProps={{
                        actionBar: {
                          actions: ['today'],
                        },
                      }}
                    />
                  </ThemeProvider>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ height: '10px', marginTop: '-5px' }}>
              {errorDatetofrom &&
                <FormHelperText style={{ color: '#d32f2f', marginLeft: '25px', marginTop: 0 }}>{clientMessage.WCI033}</FormHelperText>
              }
            </div>
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
              <FormHelperText style={{ color: '#d32f2f', marginTop: 0 }}>{clientMessage.WCI034}</FormHelperText>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='commonsp-top'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
            id="stock-input"
            error={validation.error}
            helperText={validation.helperText}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
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
            <MenuItem value='0'>1</MenuItem>
            <MenuItem value='1'>5</MenuItem>
            <MenuItem value='2'>10</MenuItem>
            <MenuItem value='3'>15</MenuItem>
            <MenuItem value='4'>30</MenuItem>
          </Select>
          <p>分間隔</p>
        </Stack>
        <div style={{ height: '50px' }}>
          <Grid container spacing={1} alignItems="center" sx={{ marginTop: '5px' }}>
            <Grid item>
              <Typography variant="body1" sx={{ fontSize: '12px' }}>開始終了時刻</Typography>
            </Grid>
            <Grid item>
              <TextField className='custom-time-input' type="time" variant="outlined" sx={{
                width: '82px', '& .MuiInputBase-input[type="time"]': {
                  fontSize: '12px',
                }, '& input::-webkit-calendar-picker-indicator': {
                  cursor: 'pointer'
                }
              }}
                error={TimeError}
                value={startTime} onChange={handleStartTimeChange} />
            </Grid>
            <Grid item>
              <Typography variant="body1">-</Typography>
            </Grid>
            {minutes == '0' ?
              <>  <Box className="inputContainer">
                <TextField
                  type="number"
                  value={selectedMinutes}
                  onChange={updateMinutes}
                  onKeyDown={handleKeyDown}
                  onBlur={handleMinutesBlur}
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
                  '& .MuiInputBase-input[type="time"]': {
                    fontSize: '12px',
                  },
                  '& input::-webkit-calendar-picker-indicator': {
                    fontSize: '12px',
                    cursor: 'pointer'
                  }
                }}
                  value={endTime} onChange={handleEndTimeChange}
                  error={TimeError} />
              </Grid>}

            {TimeError &&
              <FormHelperText style={{ color: '#d32f2f', marginLeft: '90px', marginTop: '0px' }}>
                {clientMessage.WCI035}
              </FormHelperText>
            }
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