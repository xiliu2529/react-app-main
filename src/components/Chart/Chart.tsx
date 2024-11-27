import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';
import {
  ChartData,
  ChartState,
  TickFrame,
} from '../../types/chartTypes';
import Exporting from 'highcharts/modules/exporting';
import { useMyContext } from '../../contexts/MyContext';
import './Chart.css';

const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const dailyAndCumulativeChart = useRef<Highcharts.Chart | null>(null);
  const dailyChart = useRef<Highcharts.Chart | null>(null);
  const cumulativeChart = useRef<Highcharts.Chart | null>(null);
  const { clearData, response, QvChartDatajson, settingsState, conditionSettingState, setSettingsState } = useMyContext();
  const [QvChartData, setQvChartData] = useState<TickFrame>({
    EveningOpenTickFrame: {
      AverageDaysData: {
        Distribution: "",
        Cumulative: "",
      },
      TodayData: {
        Distribution: "",
        Cumulative: "",
        ClosePrice: "",
      }
    }
  });

  let useDailyColor = settingsState.checkboxStates[5] && settingsState.radioValues[1] === '0'
  Exporting(Highcharts);
  let display = settingsState.radioValues[1] === "0"
  useEffect(() => {
    if (response) {
      setQvChartData(QvChartDatajson);
    }
  }, [QvChartDatajson]);

  useEffect(() => {
    if (clearData) {
      setQvChartData({
        EveningOpenTickFrame: {
          AverageDaysData: {
            Distribution: "",
            Cumulative: "",
          },
          TodayData: {
            Distribution: "",
            Cumulative: "",
            ClosePrice: "",
          }
        }
      })
    } else {
      setQvChartData(QvChartDatajson);
    }
  }, [clearData]);

  const [chartState, setChartState] = useState<ChartState>({
    xAxisLabels: [],
    todayDistribution: [],
    todayCumulative: [],
    historicalDistribution: [],
    historicalCumulative: [],
    ClosePrice: [],
  });
  const [chartData, setChartData] = useState<ChartData>({
    timeLabels: [],
    todayDistribution: [],
    todayCumulative: [],
    closePrice: [],
    historicalDistribution: [],
    historicalCumulative: [],
    timeLabels1: [],
    todayDistribution1: [],
    todayCumulative1: [],
    closePrice1: [],
    historicalDistribution1: [],
    historicalCumulative1: [],
    timeLabels2: [],
    todayDistribution2: [],
    todayCumulative2: [],
    closePrice2: [],
    historicalDistribution2: [],
    historicalCumulative2: [],
  });
  const handleChange = () => {
    // @ts-ignore
    setSettingsState((prevState: SettingsState) => ({
      ...prevState,
      checkboxStates: prevState.checkboxStates.map((value, index) =>
        index === 4 ? !value : value
      ),
    }));
  };

  const addRightClickExportMenu = (chart: Highcharts.Chart | null, containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container || !chart) return;

    container.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const existingMenu = document.getElementById('custom-export-menu');
      if (existingMenu) existingMenu.remove();
      const mouseX = event.pageX;
      const mouseY = event.pageY;
      const menu = document.createElement('div');
      menu.id = 'custom-export-menu';
      menu.style.position = 'absolute';
      menu.style.top = `${mouseY}px`;
      menu.style.left = `${mouseX}px`;
      menu.style.backgroundColor = '#fff';
      menu.style.border = '1px solid #ddd';
      menu.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      menu.style.borderRadius = '3px';
      menu.style.zIndex = '1000';
      menu.style.width = '130px';
      menu.style.whiteSpace = 'nowrap';
      ['PNG', 'JPEG', 'SVG'].forEach((format, index) => {
        const item = document.createElement('div');
        item.textContent = `${format} ダウンロード`;
        item.style.cursor = 'pointer';
        item.style.textAlign = 'left';
        item.style.padding = '8px 10px';
        item.style.color = '#333';
        item.style.transition = 'background-color 0.3s ease';
        item.addEventListener('click', () => {
          const mimeType = format === 'SVG' ? 'image/svg+xml' : `image/${format.toLowerCase()}`;
          // @ts-ignore
          chart.exportChart({
            type: mimeType,
            chartOptions: {}
          });
          menu.remove();
        });
        if (index < 2) {
          item.style.borderBottom = '1px solid #e0e0e0';
        }
        item.addEventListener('mouseover', () => {
          item.style.backgroundColor = '#f0f0f0';
        });
        item.addEventListener('mouseout', () => {
          item.style.backgroundColor = '';
        });
        menu.appendChild(item);
      });
      document.body.appendChild(menu);
      document.addEventListener('click', function removeMenu() {
        const menu = document.getElementById('custom-export-menu');
        if (menu) menu.remove();
        document.removeEventListener('click', removeMenu);
      });
    });
  };

  useEffect(() => {
    const processData = () => {
      let timeLabels: string[] = [];
      let todayDistribution: { y: number | null; color: string }[] = [];
      let todayCumulative: { y: number | null; color: string }[] = [];
      let closePrice: { y: number | null; color: string }[] = [];
      let historicalDistribution: { y: number | null; color: string }[] = [];
      let historicalCumulative: { y: number | null; color: string }[] = [];

      let timeLabels1: string[] = [];
      let todayDistribution1: { y: number | null; color: string }[] = [];
      let todayCumulative1: { y: number | null; color: string }[] = [];
      let closePrice1: { y: number | null; color: string }[] = [];
      let historicalDistribution1: { y: number | null; color: string }[] = [];
      let historicalCumulative1: { y: number | null; color: string }[] = [];

      let timeLabels2: string[] = [];
      let todayDistribution2: { y: number | null; color: string }[] = [];
      let todayCumulative2: { y: number | null; color: string }[] = [];
      let closePrice2: { y: number | null; color: string }[] = [];
      let historicalDistribution2: { y: number | null; color: string }[] = [];
      let historicalCumulative2: { y: number | null; color: string }[] = [];

      if (QvChartData.EveningTickFrame) {
        timeLabels = Object.keys(QvChartData.EveningTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution = Object.values(QvChartData.EveningTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Distribution !== "" ? parseFloat(todayData.Distribution) : null,
            color: settingsState.colors[6]
          };
        });

        todayCumulative = Object.values(QvChartData.EveningTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Cumulative !== "" ? parseFloat(todayData.Cumulative) : null,
            color: settingsState.colors[14]
          };
        });

        closePrice = Object.values(QvChartData.EveningTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData?.ClosePrice && todayData.ClosePrice !== "" ? parseFloat(todayData.ClosePrice) : null,
            color: settingsState.colors[16]
          };
        });

        historicalDistribution = Object.values(QvChartData.EveningTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Distribution !== "" ? parseFloat(averageDaysData.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[11] : settingsState.colors[6]
          };
        });

        historicalCumulative = Object.values(QvChartData.EveningTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Cumulative !== "" ? parseFloat(averageDaysData.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          };
        });
      }

      if (QvChartData.AMTickFrame) {
        timeLabels1 = Object.keys(QvChartData.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);

        todayDistribution1 = Object.values(QvChartData.AMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Distribution !== "" ? parseFloat(todayData.Distribution) : null,
            color: settingsState.colors[4]
          };
        });

        todayCumulative1 = Object.values(QvChartData.AMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Cumulative !== "" ? parseFloat(todayData.Cumulative) : null,
            color: settingsState.colors[14]
          };
        });

        closePrice1 = Object.values(QvChartData.AMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData?.ClosePrice && todayData.ClosePrice !== "" ? parseFloat(todayData.ClosePrice) : null,
            color: settingsState.colors[16]
          };
        });

        historicalDistribution1 = Object.values(QvChartData.AMTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Distribution !== "" ? parseFloat(averageDaysData.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[9] : settingsState.colors[4]
          };
        });

        historicalCumulative1 = Object.values(QvChartData.AMTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Cumulative !== "" ? parseFloat(averageDaysData.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          };
        });
      }

      if (QvChartData.PMTickFrame) {
        timeLabels2 = Object.keys(QvChartData.PMTickFrame).map(timeFrames2 => timeFrames2.split('-')[0]);

        todayDistribution2 = Object.values(QvChartData.PMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Distribution !== "" ? parseFloat(todayData.Distribution) : null,
            color: settingsState.colors[5]
          };
        });

        todayCumulative2 = Object.values(QvChartData.PMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData && todayData.Cumulative !== "" ? parseFloat(todayData.Cumulative) : null,
            color: settingsState.colors[14]
          };
        });

        closePrice2 = Object.values(QvChartData.PMTickFrame).map(tick => {
          const todayData = tick.TodayData;
          return {
            y: todayData?.ClosePrice && todayData.ClosePrice !== "" ? parseFloat(todayData.ClosePrice) : null,
            color: settingsState.colors[16]
          };
        });

        historicalDistribution2 = Object.values(QvChartData.PMTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Distribution !== "" ? parseFloat(averageDaysData.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[10] : settingsState.colors[5]
          };
        });

        historicalCumulative2 = Object.values(QvChartData.PMTickFrame).map(tick => {
          const averageDaysData = tick.AverageDaysData;
          return {
            y: averageDaysData && averageDaysData.Cumulative !== "" ? parseFloat(averageDaysData.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          };
        });
      }
      return {
        timeLabels,
        todayDistribution,
        todayCumulative,
        closePrice,
        historicalDistribution,
        historicalCumulative,
        timeLabels1,
        todayDistribution1,
        todayCumulative1,
        closePrice1,
        historicalDistribution1,
        historicalCumulative1,
        timeLabels2,
        todayDistribution2,
        todayCumulative2,
        closePrice2,
        historicalDistribution2,
        historicalCumulative2,
      };
    };
    const data = processData();
    setChartData(data)
  }, [settingsState, QvChartData]);

  useEffect(() => {
    if (conditionSettingState.marketState.eveningOpening && QvChartData.EveningOpenTickFrame) {
      const eveningOpenTick = QvChartData.EveningOpenTickFrame.TodayData;
      const averageDaysOpenTick = QvChartData.EveningOpenTickFrame.AverageDaysData;

      if (eveningOpenTick?.ClosePrice !== '' && eveningOpenTick?.Cumulative !== ''
        && eveningOpenTick?.Distribution !== '') {
        setChartData(prevState => ({
          ...prevState,
          timeLabels: ['寄付', ...prevState.timeLabels],
        }
        )
        );
        setChartData(prevState => ({
          ...prevState,
          todayDistribution: [
            {
              y: eveningOpenTick && eveningOpenTick.Distribution !== "" ? Number(eveningOpenTick.Distribution) : null,
              color: settingsState.colors[7]
            },
            ...prevState.todayDistribution
          ],
          todayCumulative: [
            {
              y: eveningOpenTick && eveningOpenTick.Cumulative !== "" ? Number(eveningOpenTick.Cumulative) : null,
              color: settingsState.colors[14]
            },
            ...prevState.todayCumulative
          ],
          closePrice: [
            {
              y: eveningOpenTick && eveningOpenTick.ClosePrice !== "" ? Number(eveningOpenTick.ClosePrice) : null,
              color: settingsState.colors[16]
            },
            ...prevState.closePrice
          ],
          historicalDistribution: [
            {
              y: averageDaysOpenTick && averageDaysOpenTick.Distribution !== "" ? Number(averageDaysOpenTick.Distribution) : null,
              color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
            },
            ...prevState.historicalDistribution
          ],
          historicalCumulative: [
            {
              y: averageDaysOpenTick && averageDaysOpenTick.Cumulative !== "" ? Number(averageDaysOpenTick.Cumulative) : null,
              color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
            },
            ...prevState.historicalCumulative
          ],
        }
        )
        );
      }
    }

    if (conditionSettingState.marketState.eveningClose && QvChartData.EveningCloseTickFrame) {
      const eveningCloseTick = QvChartData.EveningCloseTickFrame.TodayData;
      const averageDaysCloseTick = QvChartData.EveningCloseTickFrame.AverageDaysData;

      setChartData(prevState => ({
        ...prevState,
        timeLabels: [...prevState.timeLabels, '引け'],
        todayDistribution: [
          ...prevState.todayDistribution,
          {
            y: eveningCloseTick && eveningCloseTick.Distribution !== "" ? Number(eveningCloseTick.Distribution) : null,
            color: settingsState.colors[8]
          },
        ],
        todayCumulative: [
          ...prevState.todayCumulative,
          {
            y: eveningCloseTick && eveningCloseTick.Cumulative !== "" ? Number(eveningCloseTick.Cumulative) : null,
            color: settingsState.colors[14]
          },
        ],
        closePrice: [
          ...prevState.closePrice,
          {
            y: eveningCloseTick && eveningCloseTick.ClosePrice !== "" ? Number(eveningCloseTick.ClosePrice) : null,
            color: settingsState.colors[16]
          },
        ],
        historicalDistribution: [
          ...prevState.historicalDistribution,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Distribution !== "" ? Number(averageDaysCloseTick.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
          },
        ],
        historicalCumulative: [
          ...prevState.historicalCumulative,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Cumulative !== "" ? Number(averageDaysCloseTick.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
        ],
      }));
    }

    if (conditionSettingState.marketState.preMarketOpening && QvChartData.AMOpenTickFrame) {
      const amOpenTick = QvChartData.AMOpenTickFrame.TodayData;
      const averageDaysOpenTick = QvChartData.AMOpenTickFrame.AverageDaysData;

      setChartData(prevState => ({
        ...prevState,
        timeLabels1: ['寄付', ...prevState.timeLabels1],
        todayDistribution1: [
          {
            y: amOpenTick && amOpenTick.Distribution !== "" ? Number(amOpenTick.Distribution) : null,
            color: settingsState.colors[7]
          },
          ...prevState.todayDistribution1
        ],
        todayCumulative1: [
          {
            y: amOpenTick && amOpenTick.Cumulative !== "" ? Number(amOpenTick.Cumulative) : null,
            color: settingsState.colors[14]
          },
          ...prevState.todayCumulative1
        ],
        closePrice1: [
          {
            y: amOpenTick && amOpenTick.ClosePrice !== "" ? Number(amOpenTick.ClosePrice) : null,
            color: settingsState.colors[16]
          },
          ...prevState.closePrice1
        ],
        historicalDistribution1: [
          {
            y: averageDaysOpenTick && averageDaysOpenTick.Distribution !== "" ? Number(averageDaysOpenTick.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
          },
          ...prevState.historicalDistribution1
        ],
        historicalCumulative1: [
          {
            y: averageDaysOpenTick && averageDaysOpenTick.Cumulative !== "" ? Number(averageDaysOpenTick.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
          ...prevState.historicalCumulative1
        ],
      }));
    }

    if (conditionSettingState.marketState.preMarketClose && QvChartData.AMCloseTickFrame) {
      const amCloseTick = QvChartData.AMCloseTickFrame.TodayData;
      const averageDaysCloseTick = QvChartData.AMCloseTickFrame.AverageDaysData;

      setChartData(prevState => ({
        ...prevState,
        timeLabels1: [...prevState.timeLabels1, '引け'],
        todayDistribution1: [
          ...prevState.todayDistribution1,
          {
            y: amCloseTick && amCloseTick.Distribution !== "" ? Number(amCloseTick.Distribution) : null,
            color: settingsState.colors[8]
          },
        ],
        todayCumulative1: [
          ...prevState.todayCumulative1,
          {
            y: amCloseTick && amCloseTick.Cumulative !== "" ? Number(amCloseTick.Cumulative) : null,
            color: settingsState.colors[14]
          },
        ],
        closePrice1: [
          ...prevState.closePrice1,
          {
            y: amCloseTick && amCloseTick.ClosePrice !== "" ? Number(amCloseTick.ClosePrice) : null,
            color: settingsState.colors[16]
          },
        ],
        historicalDistribution1: [
          ...prevState.historicalDistribution1,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Distribution !== "" ? Number(averageDaysCloseTick.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
          },
        ],
        historicalCumulative1: [
          ...prevState.historicalCumulative1,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Cumulative !== "" ? Number(averageDaysCloseTick.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
        ],
      }));
    }

    if (conditionSettingState.marketState.postMarketOpening && QvChartData.PMOpenTickFrame) {
      const pmOpenTick = QvChartData.PMOpenTickFrame.TodayData;
      const averageDaysOpenTick = QvChartData.PMOpenTickFrame.AverageDaysData;

      setChartData(prevState => ({
        ...prevState,
        timeLabels2: ['寄付', ...prevState.timeLabels2],
        todayDistribution2: [
          {
            y: pmOpenTick && pmOpenTick.Distribution !== "" ? Number(pmOpenTick.Distribution) : null,
            color: settingsState.colors[7]
          },
          ...prevState.todayDistribution2
        ],
        todayCumulative2: [
          {
            y: pmOpenTick && pmOpenTick.Cumulative !== "" ? Number(pmOpenTick.Cumulative) : null,
            color: settingsState.colors[14]
          },
          ...prevState.todayCumulative2
        ],
        closePrice2: [
          {
            y: pmOpenTick && pmOpenTick.ClosePrice !== "" ? Number(pmOpenTick.ClosePrice) : null,
            color: settingsState.colors[16]
          },
          ...prevState.closePrice2
        ],
        historicalDistribution2: [
          {
            y: averageDaysOpenTick && averageDaysOpenTick.Distribution !== "" ? Number(averageDaysOpenTick.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
          },
          ...prevState.historicalDistribution2
        ],
        historicalCumulative2: [
          {
            y: averageDaysOpenTick && averageDaysOpenTick.Cumulative !== "" ? Number(averageDaysOpenTick.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
          ...prevState.historicalCumulative2
        ],
      }));
    }

    if (conditionSettingState.marketState.postMarketClose && QvChartData.PMCloseTickFrame) {
      const pmCloseTick = QvChartData.PMCloseTickFrame.TodayData;
      const averageDaysCloseTick = QvChartData.PMCloseTickFrame.AverageDaysData;

      setChartData(prevState => ({
        ...prevState,
        timeLabels2: [...prevState.timeLabels2, '引け'],
        todayDistribution2: [
          ...prevState.todayDistribution2,
          {
            y: pmCloseTick && pmCloseTick.Distribution !== "" ? Number(pmCloseTick.Distribution) : null,
            color: settingsState.colors[8]
          },
        ],
        todayCumulative2: [
          ...prevState.todayCumulative2,
          {
            y: pmCloseTick && pmCloseTick.Cumulative !== "" ? Number(pmCloseTick.Cumulative) : null,
            color: settingsState.colors[14]
          },
        ],
        closePrice2: [
          ...prevState.closePrice2,
          {
            y: pmCloseTick && pmCloseTick.ClosePrice !== "" ? Number(pmCloseTick.ClosePrice) : null,
            color: settingsState.colors[16]
          },
        ],
        historicalDistribution2: [
          ...prevState.historicalDistribution2,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Distribution !== "" ? Number(averageDaysCloseTick.Distribution) : null,
            color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
          },
        ],
        historicalCumulative2: [
          ...prevState.historicalCumulative2,
          {
            y: averageDaysCloseTick && averageDaysCloseTick.Cumulative !== "" ? Number(averageDaysCloseTick.Cumulative) : null,
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
        ],
      }));
    }
  }, [settingsState, QvChartData]);

  useEffect(() => {
    setChartState({
      xAxisLabels: [
        ...(chartData.timeLabels || []),
        ...(chartData.timeLabels1 || []),
        ...(chartData.timeLabels2 || []),
      ],
      todayDistribution: [
        ...(chartData.todayDistribution || []),
        ...(chartData.todayDistribution1 || []),
        ...(chartData.todayDistribution2 || []),
      ],
      todayCumulative: [
        ...(chartData.todayCumulative || []),
        ...(chartData.todayCumulative1 || []),
        ...(chartData.todayCumulative2 || []),
      ],
      ClosePrice: [
        ...(chartData.closePrice || []),
        ...(chartData.closePrice1 || []),
        ...(chartData.closePrice2 || []),
      ],
      historicalDistribution: [
        ...(chartData.historicalDistribution || []),
        ...(chartData.historicalDistribution1 || []),
        ...(chartData.historicalDistribution2 || []),
      ],
      historicalCumulative: [
        ...(chartData.historicalCumulative || []),
        ...(chartData.historicalCumulative1 || []),
        ...(chartData.historicalCumulative2 || []),
      ],
    });
  }, [chartData]);

  const isValidValue = Array.isArray(chartState.todayCumulative) && chartState.todayCumulative.length > 0;
  const todayMaxCumulative = QvChartData.AxisInfo?.TodayData.MaxCumulative
  const todayMaxDistribution = QvChartData.AxisInfo?.TodayData.MaxDistribution
  const ADMaxCumulative = QvChartData.AxisInfo?.AverageDaysData.MaxCumulative
  const ADMaxDistribution = QvChartData.AxisInfo?.AverageDaysData.MaxDistribution

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: chartState.xAxisLabels,
      crosshair: true,
      labels: {
        style: {
          color: settingsState.colors[3]
        }
      }
    },
    yAxis: [{
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value}%',
      }, title: {
        text: undefined
      },
      gridLineDashStyle: 'ShortDash',
      gridLineColor: '#67e6a8',

      max:todayMaxDistribution !== undefined ? Number(todayMaxDistribution) : undefined,
      min: isValidValue ? 0 : undefined,
      lineWidth: 0,
      alignTicks: true, 
      endOnTick: true, 

    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %',

      },
      opposite: true,
      title: {
        text: undefined
      },

      max:todayMaxCumulative !== undefined ? Number(todayMaxCumulative) : undefined,
      min: isValidValue ? 0 : undefined,
      alignTicks: true, 
      endOnTick: true, 
      
    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} ',
        enabled: false

      },
      opposite: true,
      title: {
        text: undefined
      },
      visible: false
    }],

    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.color + '">●</span>';
          s += '<div style="display: flex; justify-content: space-between; min-width: 150px;">' +
            '<span style="text-align:left;">' + marker + ' ' + point.series.name + ':</span>' +
            '<span style="text-align:right;">' + point.y + (point.series.name === '終値' ? '' : '%') + '</span>' +
            '</div>';
        });
        return '<div style="min-width: 150px;">' + s + '</div>';
      }
    }

    ,
    legend: {
      align: 'left',
      verticalAlign: 'top',
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [{
      type: 'column',
      color: '#FF0000',
      yAxis: 0,
      name: '当日 分布',
      showInLegend: false,
      data: chartState.todayDistribution,
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      type: 'column',
      color: '#00ff40',
      yAxis: 0,
      name: '過去平均 分布',
      showInLegend: false,
      data: chartState.historicalDistribution,
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      name: '当日 累計',
      data: chartState.todayCumulative,
      color: settingsState.colors[14],
      tooltip: {
        valueSuffix: '%'
      },
      marker: {
        enabled: true, 
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      name: '過去平均 累計',
      data: chartState.historicalCumulative,
      tooltip: {
        valueSuffix: '%'
      },
      marker: {
        enabled: true, 
      }
    }, {
      showInLegend: false,
      type: 'spline',
      name: '終値',
      color: settingsState.colors[16],
      yAxis: 2,
      data: chartState.ClosePrice,
      visible: settingsState.checkboxStates[4],
      tooltip: {
        valueSuffix: ''
      },
      marker: {
        enabled: true, 
      }

    }]
    , credits: {
      enabled: false
    },
    exporting: {
      enabled: false,
    }
  };
  const chartOptions1: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: chartState.xAxisLabels,
      crosshair: true,
      labels: {
        style: {
          color: settingsState.colors[3]
        }
      }
    },
    yAxis: [
      {
        labels: {
          style: {
            color: settingsState.colors[3]
          },
          format: '{value}%',
        },
        title: { text: undefined },
        max: todayMaxDistribution !== undefined ? Number(todayMaxDistribution) : undefined,
        min: isValidValue ? 0 : undefined,
        alignTicks: true, 
        endOnTick: true, 
      },
      {
        labels: {
          style: {
            color: settingsState.colors[3]
          },
          format: '{value}%',
        },
        opposite: true,
        title: { text: undefined },
        max: todayMaxCumulative !== undefined ? Number(todayMaxCumulative) : undefined,
        min: isValidValue ? 0 : undefined,
        alignTicks: true, 
        endOnTick: true,
      },
      {
        labels: {
          style: {
            color: settingsState.colors[3]
          },
          format: '{value} ',
          enabled: false
        },
        opposite: true,
        title: { text: undefined },
        visible: false
      }
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.color + '">●</span>';
          s += '<div style="display: flex; justify-content: space-between; min-width: 150px;">' +
            '<span style="text-align:left;">' + marker + ' ' + point.series.name + ':</span>' +
            '<span style="text-align:right;">' + point.y + (point.series.name === '終値' ? '' : '%') + '</span>' +
            '</div>';
        });
        return '<div style="min-width: 150px;">' + s + '</div>';
      }
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [
      {
        showInLegend: false,
        type: 'column',
        color: '#FF0000',
        yAxis: 0,
        name: '当日 分布',
        data: chartState.todayDistribution,
        tooltip: { valueSuffix: '%' }
      },
      {
        showInLegend: false,
        type: 'spline',
        yAxis: 1,
        name: '当日 累計',
        color: settingsState.colors[14],
        data: chartState.todayCumulative,
        tooltip: { valueSuffix: '%' } 
        ,
        marker: {
        enabled: true, 
      }
      },
      {
        showInLegend: false,
        type: 'spline',
        yAxis: 2,
        color: settingsState.colors[16],
        name: '終値',
        data: chartState.ClosePrice,
        visible: settingsState.checkboxStates[4],
        tooltip: { valueSuffix: '' }
        ,
        marker: {
        enabled: true, 
      }
      }
    ],
    credits: { enabled: false },
    exporting: { enabled: false },
  };
  
  
  const chartOptions2: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: chartState.xAxisLabels,
      crosshair: true,
      labels: {
        style: {
          color: settingsState.colors[3]
        }
      }
    },
    yAxis: [{
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value}%',
      }, title: {
        text: undefined
      },
      max: ADMaxDistribution !== undefined ? Number(ADMaxDistribution) : undefined, 
      min: isValidValue ? 0 : undefined, 
      gridLineWidth: 0, 
    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %',

      },
      opposite: true,
      title: {
        text: undefined
      },
      max:ADMaxCumulative !== undefined ? Number(ADMaxCumulative) : undefined,
      min: isValidValue ? 0 : undefined,
      alignTicks: false,
      endOnTick: false, 
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.color + '">●</span>';
          s += '<div style="display: flex; justify-content: space-between; min-width: 150px;">' +
            '<span style="text-align:left;">' + marker + ' ' + point.series.name + ':</span>' +
            '<span style="text-align:right;">' + point.y + '%</span>' +
            '</div>';
        });
        return '<div style="min-width: 150px;">' + s + '</div>';
      }
    }
    ,
    legend: {
      align: 'left',
      verticalAlign: 'top',
    },
    series: [
      {
        showInLegend: false,
        type: 'column',
        yAxis: 0,
        name: '過去平均 分布',
        data: chartState.historicalDistribution,
        tooltip: {
          valueSuffix: '%'
        },
      },
      {
        showInLegend: false,
        type: 'spline',
        yAxis: 1,
        name: '過去平均 累計',
        data: chartState.historicalCumulative,
        tooltip: {
          valueSuffix: '%'
        },
        marker: {
          enabled: true, 
        }
      }
    ]
    , credits: {
      enabled: false
    },
    exporting: {
      enabled: false,
    }
  };

  useEffect(() => {
    const dailyAndCumulative = document.getElementById('chart-container');
    const daily = document.getElementById('chart-container1');
    const cumulative = document.getElementById('chart-container2');
    if (dailyAndCumulative) {
      dailyAndCumulative.innerHTML = '';
      dailyAndCumulativeChart.current = Highcharts.chart('chart-container', {
        ...chartOptions, accessibility: {
          enabled: false
        }, chart: { height: props.height, width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    if (daily) {
      daily.innerHTML = '';
      dailyChart.current = Highcharts.chart('chart-container1', {
        ...chartOptions1, accessibility: {
          enabled: false
        }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    if (cumulative) {
      cumulative.innerHTML = '';
      cumulativeChart.current = Highcharts.chart('chart-container2', {
        ...chartOptions2, accessibility: {
          enabled: false
        }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    addRightClickExportMenu(dailyAndCumulativeChart.current, 'chart-container');
    addRightClickExportMenu(dailyChart.current, 'chart-container1');
    addRightClickExportMenu(cumulativeChart.current, 'chart-container2');
  }, [settingsState, chartState]);

  return (
    <div className='chart'>
      <div className="container-chart">
        <FormControlLabel
          className='chart-top'
          control={<Checkbox checked={settingsState.checkboxStates[4]} onChange={handleChange} />}
          label="当日の価格チャートを表示"
          labelPlacement="start"
        />
      </div>

      <div>
        {display ? (
          <>
            <div id="chart-container1" className="chart" ></div>
            <div id="chart-container2" className='chart'></div>
          </>
        ) : (
          <div id="chart-container" className='chart'></div>
        )}
      </div>
    </div>
  );
};

export default Chart; 