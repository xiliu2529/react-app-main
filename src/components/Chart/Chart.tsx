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
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const chartRef1 = useRef<Highcharts.Chart | null>(null);
  const chartRef2 = useRef<Highcharts.Chart | null>(null);
  const { response,QvChartDatajson, settingsState, conditionSettingState, setSettingsState } = useMyContext();
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
    if(response){
      setQvChartData(QvChartDatajson);
    }
    
  }, [QvChartDatajson]);


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
      let todayDistribution: { y: number; color: string }[] = [];
      let todayCumulative: { y: number; color: string }[] = [];
      let closePrice: { y: number; color: string }[] = [];
      let historicalDistribution: { y: number; color: string }[] = [];
      let historicalCumulative: { y: number; color: string }[] = [];

      let timeLabels1: string[] = [];
      let todayDistribution1: { y: number; color: string }[] = [];
      let todayCumulative1: { y: number; color: string }[] = [];
      let closePrice1: { y: number; color: string }[] = [];
      let historicalDistribution1: { y: number; color: string }[] = [];
      let historicalCumulative1: { y: number; color: string }[] = [];

      let timeLabels2: string[] = [];
      let todayDistribution2: { y: number; color: string }[] = [];
      let todayCumulative2: { y: number; color: string }[] = [];
      let closePrice2: { y: number; color: string }[] = [];
      let historicalDistribution2: { y: number; color: string }[] = [];
      let historicalCumulative2: { y: number; color: string }[] = [];

      if (QvChartData.EveningTickFrame) {
        timeLabels = Object.keys(QvChartData.EveningTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution = Object.values(QvChartData.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Distribution),
          color: settingsState.colors[6]
        }));
        todayCumulative = Object.values(QvChartData.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Cumulative),
          color: settingsState.colors[14]
        }));
        closePrice = Object.values(QvChartData.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.ClosePrice!),
          color: settingsState.colors[16]
        }));
        historicalDistribution = Object.values(QvChartData.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Distribution),
          color: !useDailyColor ? settingsState.colors[11] : settingsState.colors[6]
        }));

        historicalCumulative = Object.values(QvChartData.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Cumulative),
          color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
        }));
      }
      if (QvChartData.AMTickFrame) {
        timeLabels1 = Object.keys(QvChartData.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution1 = Object.values(QvChartData.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Distribution),
          color: settingsState.colors[4]
        }));
        todayCumulative1 = Object.values(QvChartData.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Cumulative),
          color: settingsState.colors[14]
        }));
        closePrice1 = Object.values(QvChartData.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.ClosePrice!),
          color: settingsState.colors[16]
        }));
        historicalDistribution1 = Object.values(QvChartData.AMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Distribution),
          color: !useDailyColor ? settingsState.colors[9] : settingsState.colors[4]
        }));
        historicalCumulative1 = Object.values(QvChartData.AMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Cumulative),
          color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
        }));
      }
      if (QvChartData.PMTickFrame) {
        timeLabels2 = Object.keys(QvChartData.PMTickFrame).map(timeFrames2 => timeFrames2.split('-')[0]);
        todayDistribution2 = Object.values(QvChartData.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Distribution),
          color: settingsState.colors[5]
        }));
        todayCumulative2 = Object.values(QvChartData.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.Cumulative),
          color: settingsState.colors[14]
        }));
        closePrice2 = Object.values(QvChartData.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayData!.ClosePrice!),
          color: settingsState.colors[16]
        }));
        historicalDistribution2 = Object.values(QvChartData.PMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Distribution),
          color: !useDailyColor ? settingsState.colors[10] : settingsState.colors[5]
        }));
        historicalCumulative2 = Object.values(QvChartData.PMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysData!.Cumulative),
          color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
        }));
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
  }, [settingsState, display, QvChartData]);

  useEffect(() => {
    if (conditionSettingState.marketState.eveningOpening && QvChartData.EveningOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: ['寄付', ...prevState.timeLabels],
        todayDistribution: [
          {
            y: Number(QvChartData.EveningOpenTickFrame!.TodayData!.Distribution),
            color: settingsState.colors[7]
          },
          ...prevState.todayDistribution
        ],
        todayCumulative: [
          {
            y: Number(QvChartData.EveningOpenTickFrame!.TodayData!.Cumulative),
            color: settingsState.colors[14]
          },
          ...prevState.todayCumulative
        ],
        closePrice: [
          {
            y: Number(QvChartData.EveningOpenTickFrame!.TodayData!.ClosePrice!),
            color: settingsState.colors[16]
          },
          ...prevState.closePrice
        ],
        historicalDistribution: [
          {
            y: Number(QvChartData.EveningOpenTickFrame!.AverageDaysData!.Distribution),
            color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
          },
          ...prevState.historicalDistribution
        ],
        historicalCumulative: [
          {
            y: Number(QvChartData.EveningOpenTickFrame!.AverageDaysData!.Cumulative),
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
          ...prevState.historicalCumulative
        ],
      }));
    }
    if (conditionSettingState.marketState.eveningClose && QvChartData.EveningCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: [...prevState.timeLabels, '引け'],
        todayDistribution: [
          ...prevState.todayDistribution,
          {
            y: Number(QvChartData.EveningCloseTickFrame!.TodayData!.Distribution),
            color: settingsState.colors[8]
          },
        ],
        todayCumulative: [
          ...prevState.todayCumulative,
          {
            y: Number(QvChartData.EveningCloseTickFrame!.TodayData!.Cumulative),
            color: settingsState.colors[14]
          }

        ],
        closePrice: [
          ...prevState.closePrice,
          {
            y: Number(QvChartData.EveningCloseTickFrame!.TodayData!.ClosePrice!),
            color: settingsState.colors[16]
          }

        ],
        historicalDistribution: [
          ...prevState.historicalDistribution,
          {
            y: Number(QvChartData.EveningCloseTickFrame!.AverageDaysData!.Distribution),
            color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
          }
        ],

        historicalCumulative: [
          ...prevState.historicalCumulative,
          {
            y: Number(QvChartData.EveningCloseTickFrame!.AverageDaysData!.Cumulative),
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          }

        ],

      }));

    }
    if (conditionSettingState.marketState.preMarketOpening && QvChartData.AMOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: ['寄付', ...prevState.timeLabels1],
        todayDistribution1: [
          {
            y: Number(QvChartData.AMOpenTickFrame!.TodayData!.Distribution),
            color: settingsState.colors[7]
          },
          ...prevState.todayDistribution1
        ],
        todayCumulative1: [
          {
            y: Number(QvChartData.AMOpenTickFrame!.TodayData!.Cumulative),
            color: settingsState.colors[14]
          },
          ...prevState.todayCumulative1
        ],
        closePrice1: [
          {
            y: Number(QvChartData.AMOpenTickFrame!.TodayData!.ClosePrice!),
            color: settingsState.colors[16]
          },
          ...prevState.closePrice1
        ],
        historicalDistribution1: [
          {
            y: Number(QvChartData.AMOpenTickFrame!.AverageDaysData!.Distribution),
            color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
          },
          ...prevState.historicalDistribution1
        ],
        historicalCumulative1: [
          {
            y: Number(QvChartData.AMOpenTickFrame!.AverageDaysData!.Cumulative),
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
          ...prevState.historicalCumulative1
        ],
      }));
    }
    if (conditionSettingState.marketState.preMarketClose && QvChartData.AMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: [...prevState.timeLabels1, '引け'],
        todayDistribution1: [...prevState.todayDistribution1,
        {
          y: Number(QvChartData.AMCloseTickFrame!.TodayData!.Distribution),
          color: settingsState.colors[8]
        },

        ],
        todayCumulative1: [...prevState.todayCumulative1,
        {
          y: Number(QvChartData.AMCloseTickFrame!.TodayData!.Cumulative),
          color: settingsState.colors[14]
        },

        ],
        closePrice1: [...prevState.closePrice1,
        {
          y: Number(QvChartData.AMCloseTickFrame!.TodayData!.ClosePrice!),
          color: settingsState.colors[16]
        },

        ],
        historicalDistribution1: [...prevState.historicalDistribution1,
        {
          y: Number(QvChartData.AMCloseTickFrame!.AverageDaysData!.Distribution),
          color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
        },

        ],
        historicalCumulative1: [...prevState.historicalCumulative1,
        {
          y: Number(QvChartData.AMCloseTickFrame!.AverageDaysData!.Cumulative),
          color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
        },

        ],
      }));
    }
    if (conditionSettingState.marketState.postMarketOpening && QvChartData.PMOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: ['寄付', ...prevState.timeLabels2],
        todayDistribution2: [
          {
            y: Number(QvChartData.PMOpenTickFrame!.TodayData!.Distribution),
            color: settingsState.colors[7]
          },
          ...prevState.todayDistribution2
        ],
        todayCumulative2: [
          {
            y: Number(QvChartData.PMOpenTickFrame!.TodayData!.Cumulative),
            color: settingsState.colors[14]
          },
          ...prevState.todayCumulative2
        ],
        closePrice2: [
          {
            y: Number(QvChartData.PMOpenTickFrame!.TodayData!.ClosePrice!),
            color: settingsState.colors[16]
          },
          ...prevState.closePrice2
        ],
        historicalDistribution2: [
          {
            y: Number(QvChartData.PMOpenTickFrame!.AverageDaysData!.Distribution),
            color: !useDailyColor ? settingsState.colors[12] : settingsState.colors[7]
          },
          ...prevState.historicalDistribution2
        ],
        historicalCumulative2: [
          {
            y: Number(QvChartData.PMOpenTickFrame!.AverageDaysData!.Cumulative),
            color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
          },
          ...prevState.historicalCumulative2
        ],
      }));
    }
    if (conditionSettingState.marketState.postMarketClose && QvChartData.PMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: [...prevState.timeLabels2, '引け'],
        todayDistribution2: [...prevState.todayDistribution2,
        {
          y: Number(QvChartData.PMCloseTickFrame!.TodayData!.Distribution),
          color: settingsState.colors[8]
        },

        ],
        todayCumulative2: [...prevState.todayCumulative2,
        {
          y: Number(QvChartData.PMCloseTickFrame!.TodayData!.Cumulative),
          color: settingsState.colors[14]
        },

        ],
        closePrice2: [...prevState.closePrice2,
        {
          y: Number(QvChartData.PMCloseTickFrame!.TodayData!.ClosePrice!),
          color: settingsState.colors[16]
        },

        ],
        historicalDistribution2: [...prevState.historicalDistribution2,
        {
          y: Number(QvChartData.PMCloseTickFrame!.AverageDaysData!.Distribution),
          color: !useDailyColor ? settingsState.colors[13] : settingsState.colors[8]
        },

        ],
        historicalCumulative2: [...prevState.historicalCumulative2,
        {
          y: Number(QvChartData.PMCloseTickFrame!.AverageDaysData!.Cumulative),
          color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14]
        },

        ],
      }));
    }

  }, [settingsState, display, QvChartData]);

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
  }, [chartData, QvChartData]);

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
      }
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
      }
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
      }
    }],

    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.series.color + '">●</span>';
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
      yAxis: 0,
      name: '当日 累計',
      data: chartState.todayCumulative,
      color: settingsState.colors[14],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      name: '過去平均 累計',
      color: settingsState.colors[15],
      data: chartState.historicalCumulative,
      tooltip: {
        valueSuffix: '%'
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
    yAxis: [{
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value}%',
      }, title: {
        text: undefined
      }
    },
    {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %',

      },
      opposite: true,
      title: {
        text: undefined
      }
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
      title: {
        text: undefined
      }
    }
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.series.color + '">●</span>';
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
      showInLegend: false,
      type: 'column',
      color: '#FF0000',
      yAxis: 0,
      name: '当日 分布',
      data: chartState.todayDistribution
      , tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      name: '当日 累計',
      color: settingsState.colors[14],
      data: chartState.todayCumulative,
      tooltip: {
        valueSuffix: '%'
      }
    }
      , {
      showInLegend: false,
      type: 'spline',
      yAxis: 2,
      color: settingsState.colors[16],
      name: '終値',
      data: chartState.ClosePrice,
      visible: settingsState.checkboxStates[4],
      tooltip: {
        valueSuffix: ''
      }

    }
    ],
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false,
    }
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
      }
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
      }
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let s = '<span>' + this.x + '</span><br/>';
        this.points?.forEach(function (point) {
          const marker = '<span style="color:' + point.series.color + '">●</span>';
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
        }
      },
      {
        showInLegend: false,
        type: 'spline',
        yAxis: 1,
        name: '過去平均 累計',
        color: !useDailyColor ? settingsState.colors[15] : settingsState.colors[14],
        data: chartState.historicalCumulative,
        tooltip: {
          valueSuffix: '%'
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
    const container = document.getElementById('chart-container');
    const container1 = document.getElementById('chart-container1');
    const container2 = document.getElementById('chart-container2');

    if (container) {
      container.innerHTML = '';
      chartRef.current = Highcharts.chart('chart-container', {
        ...chartOptions, accessibility: {
          enabled: false
        }, chart: { height: props.height, width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    if (container1) {
      container1.innerHTML = '';
      chartRef1.current = Highcharts.chart('chart-container1', {
        ...chartOptions1, accessibility: {
          enabled: false
        }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    if (container2) {
      container2.innerHTML = '';
      chartRef2.current = Highcharts.chart('chart-container2', {
        ...chartOptions2, accessibility: {
          enabled: false
        }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    addRightClickExportMenu(chartRef.current, 'chart-container');
    addRightClickExportMenu(chartRef1.current, 'chart-container1');
    addRightClickExportMenu(chartRef2.current, 'chart-container2');

  }, [settingsState, conditionSettingState, chartState, chartData, settingsState.checkboxStates[4], QvChartData]);


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