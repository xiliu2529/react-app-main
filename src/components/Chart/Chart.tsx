import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';
import { useMyContext } from '../../contexts/MyContext';
import a from '../../data/601.1/data3.json'
import b from '../../data/101.1/data3.json'
import c from '../../data/data3.json'

interface ChartData {
  timeLabels: string[];
  todayDistribution: { y: number; color: string }[]
  todayCumulative: { y: number; color: string }[]
  closePrice: { y: number; color: string }[]
  historicalDistribution: { y: number; color: string }[]
  historicalCumulative: { y: number; color: string }[]
  timeLabels1: string[];
  todayDistribution1: { y: number; color: string }[]
  todayCumulative1: { y: number; color: string }[]
  closePrice1: { y: number; color: string }[]
  historicalDistribution1: { y: number; color: string }[]
  historicalCumulative1: { y: number; color: string }[]
  timeLabels2: string[];
  todayDistribution2: { y: number; color: string }[]
  todayCumulative2: { y: number; color: string }[]
  closePrice2: { y: number; color: string }[]
  historicalDistribution2: { y: number; color: string }[]
  historicalCumulative2: { y: number; color: string }[]
}
interface ChartState {
  xAxisLabels: string[];
  todayDistribution: { y: number; color: string }[]
  todayCumulative: { y: number; color: string }[]
  historicalDistribution: { y: number; color: string }[]
  historicalCumulative: { y: number; color: string }[]
  ClosePrice: { y: number; color: string }[]
}
type ChartDatax = {
  Distribution: string;
  Cumulative: string;
  ClosePrice?: string;
};

type TimeFrameData = {
  AverageDaysChart?: ChartDatax;
  TodayChart?: ChartDatax;
};

type TimeFrames = {
  [key: string]: TimeFrameData;
};

type TickFrame = {
  EveningOpenTickFrame?: TimeFrameData;
  EveningTickFrame?: TimeFrames;
  EveningCloseTickFrame?: TimeFrameData;
  AMOpenTickFrame?: TimeFrameData;
  AMTickFrame?: TimeFrames;
  AMCloseTickFrame?: TimeFrameData;
  PMOpenTickFrame?: TimeFrameData;
  PMTickFrame?: TimeFrames;
  PMCloseTickFrame?: TimeFrameData;
};

const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState, conditionSettingState, requestPayload } = useMyContext();

  let data3: TickFrame = {
    EveningOpenTickFrame: {
      AverageDaysChart: {
        Distribution: "",
        Cumulative: "",
      },
      TodayChart: {
        Distribution: "",
        Cumulative: "",
        ClosePrice: "",
      }
    }

  }
  if (requestPayload.Code === '6501') {
    data3 = c;
  } else if (requestPayload.Code === '101.1') {
    data3 = b;
  } else if (requestPayload.Code === '601.1') {
    data3 = a;
  }

  const [checked, setChecked] = useState<boolean>(false);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  let display = settingsState.radioValues[1] === "Arrange"

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


      if (data3.EveningTickFrame) {
        timeLabels = Object.keys(data3.EveningTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution = Object.values(data3.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Distribution),
          color: settingsState.colors[6]
        }));
        todayCumulative = Object.values(data3.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Cumulative),
          color:  settingsState.colors[14]
        }));
        closePrice = Object.values(data3.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.ClosePrice!),
          color: settingsState.colors[16] 
        }));
        historicalDistribution = Object.values(data3.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Distribution),
          color: settingsState.colors[11]
        }));

        historicalCumulative = Object.values(data3.EveningTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Cumulative),
          color: settingsState.colors[15] 
        }));
      }

      if (data3.AMTickFrame) {
        timeLabels1 = Object.keys(data3.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution1 = Object.values(data3.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Distribution),
          color: settingsState.colors[4] 
        }));
        todayCumulative1 = Object.values(data3.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Cumulative),
          color: settingsState.colors[14] 
        }));
        closePrice1 = Object.values(data3.AMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.ClosePrice!),
          color: settingsState.colors[16] 
        }));
        historicalDistribution1 = Object.values(data3.AMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Distribution),
          color: settingsState.colors[9] 
        }));
        historicalCumulative1 = Object.values(data3.AMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Cumulative),
          color: settingsState.colors[15] 
        }));
      }
      if (data3.PMTickFrame) {
        timeLabels2 = Object.keys(data3.PMTickFrame).map(timeFrames2 => timeFrames2.split('-')[0]);
        todayDistribution2 = Object.values(data3.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Distribution),
          color: settingsState.colors[5] 
        }));
        todayCumulative2 = Object.values(data3.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.Cumulative),
          color: settingsState.colors[14]
        }));
        closePrice2 = Object.values(data3.PMTickFrame).map(tick => ({
          y: parseFloat(tick.TodayChart!.ClosePrice!),
          color: settingsState.colors[16] 
        }));
        historicalDistribution2 = Object.values(data3.PMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Distribution),
          color: settingsState.colors[10] 
        }));
        historicalCumulative2 = Object.values(data3.PMTickFrame).map(tick => ({
          y: parseFloat(tick.AverageDaysChart!.Cumulative),
          color: settingsState.colors[15] 
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
  }, [settingsState, conditionSettingState, display]);

  useEffect(() => {
    if (conditionSettingState.marketState.eveningOpening && data3.EveningOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: ['寄付', ...prevState.timeLabels],
        todayDistribution: [
          {
            y: Number(data3.EveningOpenTickFrame!.TodayChart!.Distribution),
            color: settingsState.colors[7] 
          },
          ...prevState.todayDistribution
        ],
        todayCumulative: [
          {
            y: Number(data3.EveningOpenTickFrame!.TodayChart!.Cumulative),
            color: settingsState.colors[14] 
          },
          ...prevState.todayCumulative
        ],
        closePrice: [
          {
            y: Number(data3.EveningOpenTickFrame!.TodayChart!.ClosePrice!),
            color: settingsState.colors[16] 
          },
          ...prevState.closePrice
        ],
        historicalDistribution: [
          {
            y: Number(data3.EveningOpenTickFrame!.AverageDaysChart!.Distribution),
            color: settingsState.colors[12] 
          },
          ...prevState.historicalDistribution
        ],
        historicalCumulative: [
          {
            y: Number(data3.EveningOpenTickFrame!.AverageDaysChart!.Cumulative),
            color: settingsState.colors[15] 
          },
          ...prevState.historicalCumulative
        ],
      }));
    }
    if (conditionSettingState.marketState.eveningClose && data3.EveningCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: [...prevState.timeLabels, '引け'],
        todayDistribution: [
          ...prevState.todayDistribution,
          {
            y: Number(data3.EveningCloseTickFrame!.TodayChart!.Distribution),
            color: settingsState.colors[8] 
          },
        ],
        todayCumulative: [
          ...prevState.todayCumulative,
          {
            y: Number(data3.EveningCloseTickFrame!.TodayChart!.Cumulative),
            color: settingsState.colors[14] 
          }

        ],
        closePrice: [
          ...prevState.closePrice,
          {
            y: Number(data3.EveningCloseTickFrame!.TodayChart!.ClosePrice!),
            color: settingsState.colors[16] 
          }

        ],
        historicalDistribution: [
          ...prevState.historicalDistribution,
          {
            y: Number(data3.EveningCloseTickFrame!.AverageDaysChart!.Distribution),
            color: settingsState.colors[13] 
          }
        ],

        historicalCumulative: [
          ...prevState.historicalCumulative,
          {
            y: Number(data3.EveningCloseTickFrame!.AverageDaysChart!.Cumulative),
            color: settingsState.colors[15] 
          }

        ],

      }));

    }

    if (conditionSettingState.marketState.preMarketOpening && data3.AMOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: ['寄付', ...prevState.timeLabels1],
        todayDistribution1: [
          {
            y: Number(data3.AMOpenTickFrame!.TodayChart!.Distribution),
            color: settingsState.colors[7] 
          },
          ...prevState.todayDistribution1
        ],
        todayCumulative1: [
          {
            y: Number(data3.AMOpenTickFrame!.TodayChart!.Cumulative),
            color: settingsState.colors[14] 
          },
          ...prevState.todayCumulative1
        ],
        closePrice1: [
          {
            y: Number(data3.AMOpenTickFrame!.TodayChart!.ClosePrice!),
            color: settingsState.colors[16]
          },
          ...prevState.closePrice1
        ],
        historicalDistribution1: [
          {
            y: Number(data3.AMOpenTickFrame!.AverageDaysChart!.Distribution),
            color: settingsState.colors[12] 
          },
          ...prevState.historicalDistribution1
        ],
        historicalCumulative1: [
          {
            y: Number(data3.AMOpenTickFrame!.AverageDaysChart!.Cumulative),
            color: settingsState.colors[15] 
          },
          ...prevState.historicalCumulative1
        ],
      }));
    }

    if (conditionSettingState.marketState.preMarketClose && data3.AMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: [...prevState.timeLabels1, '引け'],
        todayDistribution1: [...prevState.todayDistribution1,
        {
          y: Number(data3.AMCloseTickFrame!.TodayChart!.Distribution),
          color: settingsState.colors[8]  
        },

        ],
        todayCumulative1: [...prevState.todayCumulative1,
        {
          y: Number(data3.AMCloseTickFrame!.TodayChart!.Cumulative),
          color: settingsState.colors[14] 
        },

        ],
        closePrice1: [...prevState.closePrice1,
        {
          y: Number(data3.AMCloseTickFrame!.TodayChart!.ClosePrice!),
          color: settingsState.colors[16] 
        },

        ],
        historicalDistribution1: [...prevState.historicalDistribution1,
        {
          y: Number(data3.AMCloseTickFrame!.AverageDaysChart!.Distribution),
          color: settingsState.colors[13] 
        },

        ],
        historicalCumulative1: [...prevState.historicalCumulative1,
        {
          y: Number(data3.AMCloseTickFrame!.AverageDaysChart!.Cumulative),
          color: settingsState.colors[15]
        },

        ],
      }));
    }
    if (conditionSettingState.marketState.postMarketOpening && data3.PMOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: ['寄付', ...prevState.timeLabels2],
        todayDistribution2: [
          {
            y: Number(data3.PMOpenTickFrame!.TodayChart!.Distribution),
            color: settingsState.colors[7] 
          },
          ...prevState.todayDistribution2
        ],
        todayCumulative2: [
          {
            y: Number(data3.PMOpenTickFrame!.TodayChart!.Cumulative),
            color: settingsState.colors[14] 
          },
          ...prevState.todayCumulative2
        ],
        closePrice2: [
          {
            y: Number(data3.PMOpenTickFrame!.TodayChart!.ClosePrice!),
            color: settingsState.colors[16] 
          },
          ...prevState.closePrice2
        ],
        historicalDistribution2: [
          {
            y: Number(data3.PMOpenTickFrame!.AverageDaysChart!.Distribution),
            color: settingsState.colors[12] 
          },
          ...prevState.historicalDistribution2
        ],
        historicalCumulative2: [
          {
            y: Number(data3.PMOpenTickFrame!.AverageDaysChart!.Cumulative),
            color: settingsState.colors[15] 
          },
          ...prevState.historicalCumulative2
        ],
      }));
    }
    if (conditionSettingState.marketState.postMarketClose && data3.PMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: [...prevState.timeLabels2, '引け'],
        todayDistribution2: [...prevState.todayDistribution2,
        {
          y: Number(data3.PMCloseTickFrame!.TodayChart!.Distribution),
          color: settingsState.colors[8] 
        },

        ],
        todayCumulative2: [...prevState.todayCumulative2,
        {
          y: Number(data3.PMCloseTickFrame!.TodayChart!.Cumulative),
          color: settingsState.colors[14] 
        },

        ],
        closePrice2: [...prevState.closePrice2,
        {
          y: Number(data3.PMCloseTickFrame!.TodayChart!.ClosePrice!),
          color: settingsState.colors[16] 
        },

        ],
        historicalDistribution2: [...prevState.historicalDistribution2,
        {
          y: Number(data3.PMCloseTickFrame!.AverageDaysChart!.Distribution),
          color: settingsState.colors[13] 
        },

        ],
        historicalCumulative2: [...prevState.historicalCumulative2,
        {
          y: Number(data3.PMCloseTickFrame!.AverageDaysChart!.Cumulative),
          color: settingsState.colors[15] 
        },

        ],
      }));
    }


  }, [conditionSettingState, settingsState, display]);

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

  useEffect(() => {
    const container = document.getElementById('chart-container');
    if (container) {
      container.innerHTML = '';
      Highcharts.chart('chart-container', {
        ...chartOptions, accessibility: {
          enabled: false
        }, chart: { height: props.height, width: props.width, backgroundColor: settingsState.colors[2] }
      });
    }
    if (display) {
      const container1 = document.getElementById('chart-container1');
      const container2 = document.getElementById('chart-container2');

      if (container1) {
        container1.innerHTML = '';
        Highcharts.chart('chart-container1', {
          ...chartOptions1, accessibility: {
            enabled: false
          }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
        });
      }
      if (container2) {
        container2.innerHTML = '';
        Highcharts.chart('chart-container2', {
          ...chartOptions2, accessibility: {
            enabled: false
          }, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] }
        });
      }
    }

  }, [display, settingsState, conditionSettingState, chartState, chartData, checked]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      height: '4000px',
      width: '600px',

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
      shared: true
    },
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
      data: chartState.todayDistribution
    }, {
      type: 'column',
      color: '#00ff40',
      yAxis: 0,
      name: '過去平均 分布',
      showInLegend: false,
      data: chartState.historicalDistribution
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 0,
      name: '当日 累計',
      data: chartState.todayCumulative,
      color:settingsState.colors[14],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      name: '過去平均 累計',
      color:settingsState.colors[16],
      data: chartState.historicalCumulative
    }, {
      showInLegend: false,
      type: 'spline',
      name: '終値',
      color:settingsState.colors[16],
      yAxis: 2,
      data: chartState.ClosePrice,
      visible: checked,

    }]
    , credits: {
      enabled: false
    }
  };

  const chartOptions1: Highcharts.Options = {
    chart: {
      type: 'column',
      height: '200px',
      width: '600px',
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
      shared: true
    },
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
      color:settingsState.colors[14],
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
      visible: checked,

    }
    ], credits: {
      enabled: false
    }
  };

  const chartOptions2: Highcharts.Options = {
    chart: {
      type: 'column',
      height: '200px',
      width: '600px',
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
      shared: true
    },
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
      },
      {
        showInLegend: false,
        type: 'spline',
        yAxis: 1,
        name: '過去平均 累計',
        color:settingsState.colors[15],
        data: chartState.historicalCumulative,
      }
    ]
    , credits: {
      enabled: false
    }
  };
  
  return (
    <div>
      <FormControlLabel
        className='chart-top'
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="当日の価格チャートを表示"
        labelPlacement="start"
      />
      <div>
        {display ? (
          <>
            <div id="chart-container1" className='chart'></div>
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