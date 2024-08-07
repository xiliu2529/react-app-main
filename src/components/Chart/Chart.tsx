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
  todayDistribution: number[];
  todayCumulative: number[];
  historicalDistribution: number[];
  historicalCumulative: number[];
  timeLabels1: string[];
  todayDistribution1: number[];
  todayCumulative1: number[];
  historicalDistribution1: number[];
  historicalCumulative1: number[];
  timeLabels2: string[];
  todayDistribution2: number[];
  todayCumulative2: number[];
  historicalDistribution2: number[];
  historicalCumulative2: number[];
}
interface ChartState {
  xAxisLabels: string[];
  todayDistribution: number[];
  todayCumulative: number[];
  historicalDistribution: number[];
  historicalCumulative: number[];
}

const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState, conditionSettingState } = useMyContext();
  let data3 = {
  }
  if (conditionSettingState.inputValue === '6501') {
    data3 = c;
  } else if (conditionSettingState.inputValue === '101.1') {
    data3 = b;
  } else if (conditionSettingState.inputValue === '601.1') {
    data3 = a;
  }
  const [checked, setChecked] = useState<boolean>(false);
  const [chartState, setChartState] = useState<ChartState>({
    xAxisLabels: [],
    todayDistribution: [],
    todayCumulative: [],
    historicalDistribution: [],
    historicalCumulative: [],
  });
  const [chartData, setChartData] = useState<ChartData>({
    timeLabels: [],
    todayDistribution: [],
    todayCumulative: [],
    historicalDistribution: [],
    historicalCumulative: [],
    timeLabels1: [],
    todayDistribution1: [],
    todayCumulative1: [],
    historicalDistribution1: [],
    historicalCumulative1: [],
    timeLabels2: [],
    todayDistribution2: [],
    todayCumulative2: [],
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
      let todayDistribution: number[] = [];
      let todayCumulative: number[] = [];
      let historicalDistribution: number[] = [];
      let historicalCumulative: number[] = [];

      let timeLabels1: string[] = [];
      let todayDistribution1: number[] = [];
      let todayCumulative1: number[] = [];
      let historicalDistribution1: number[] = [];
      let historicalCumulative1: number[] = [];

      let timeLabels2: string[] = [];
      let todayDistribution2: number[] = [];
      let todayCumulative2: number[] = [];
      let historicalDistribution2: number[] = [];
      let historicalCumulative2: number[] = [];


      if (data3.EveningTickFrame) {
        timeLabels = Object.keys(data3.EveningTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.TodayChart.Distribution));
        todayCumulative = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.TodayChart.Cumulative));
        historicalDistribution = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Distribution));
        historicalCumulative = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Cumulative));
      }
      if (data3.AMTickFrame) {
        timeLabels1 = Object.keys(data3.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.TodayChart.Distribution));
        todayCumulative1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.TodayChart.Cumulative));
        historicalDistribution1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Distribution));
        historicalCumulative1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Cumulative));
      }
      if (data3.PMTickFrame) {
        timeLabels2 = Object.keys(data3.PMTickFrame).map(timeFrames2 => timeFrames2.split('-')[0]);
        todayDistribution2 = Object.values(data3.PMTickFrame).map(tick => parseFloat(tick.TodayChart.Distribution));
        todayCumulative2 = Object.values(data3.PMTickFrame).map(tick => parseFloat(tick.TodayChart.Cumulative));
        historicalDistribution2 = Object.values(data3.PMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Distribution));
        historicalCumulative2 = Object.values(data3.PMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Cumulative));
      }
      return {
        timeLabels,
        todayDistribution,
        todayCumulative,
        historicalDistribution,
        historicalCumulative,
        timeLabels1,
        todayDistribution1,
        todayCumulative1,
        historicalDistribution1,
        historicalCumulative1,
        timeLabels2,
        todayDistribution2,
        todayCumulative2,
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
        todayDistribution: [Number(data3.EveningOpenTickFrame.TodayChart.Distribution), ...prevState.todayDistribution],
        todayCumulative: [Number(data3.EveningOpenTickFrame.TodayChart.Cumulative), ...prevState.todayDistribution],
        historicalDistribution: [Number(data3.EveningOpenTickFrame.AverageDaysChart.Distribution), ...prevState.historicalDistribution],
        historicalCumulative: [Number(data3.EveningOpenTickFrame.AverageDaysChart.Cumulative), ...prevState.historicalCumulative],
      }));
    }
    if (conditionSettingState.marketState.eveningClose && data3.EveningCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: [...prevState.timeLabels, '引け'],
        todayDistribution: [...prevState.todayDistribution, Number(data3.EveningCloseTickFrame.TodayChart.Distribution)],
        todayCumulative: [Number(...prevState.todayDistribution, data3.EveningCloseTickFrame.TodayChart.Cumulative)],
        historicalDistribution: [...prevState.historicalDistribution, Number(data3.EveningCloseTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative: [...prevState.historicalCumulative, Number(data3.EveningOpenTickFrame.AverageDaysChart.Cumulative)],
      }));
    }

    if (conditionSettingState.marketState.preMarketOpening) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: ['寄付', ...prevState.timeLabels1],
        todayDistribution1: [Number(data3.AMOpenTickFrame.TodayChart.Distribution), ...prevState.todayDistribution1],
        todayCumulative1: [Number(data3.AMOpenTickFrame.TodayChart.Cumulative), ...prevState.todayDistribution1],
        historicalDistribution1: [Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution), ...prevState.historicalDistribution1],
        historicalCumulative1: [Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative), ...prevState.historicalCumulative1],
      }));


    }
    if (conditionSettingState.marketState.preMarketClose) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: [...prevState.timeLabels1, '引け'],
        todayDistribution1: [...prevState.todayDistribution1, Number(data3.AMOpenTickFrame.TodayChart.Distribution)],
        todayCumulative1: [Number(...prevState.todayDistribution1, data3.AMOpenTickFrame.TodayChart.Cumulative)],
        historicalDistribution1: [...prevState.historicalDistribution1, Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative1: [...prevState.historicalCumulative1, Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative)],
      }));

    }
    if (conditionSettingState.marketState.postMarketOpening && data3.PMOpenTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: ['寄付', ...prevState.timeLabels2],
        todayDistribution2: [Number(data3.PMOpenTickFrame.TodayChart.Distribution), ...prevState.todayDistribution2],
        todayCumulative2: [Number(data3.PMOpenTickFrame.TodayChart.Cumulative), ...prevState.todayDistribution2],
        historicalDistribution2: [Number(data3.PMOpenTickFrame.AverageDaysChart.Distribution), ...prevState.historicalDistribution2],
        historicalCumulative2: [Number(data3.PMOpenTickFrame.AverageDaysChart.Cumulative), ...prevState.historicalCumulative2],
      }));


    }
    if (conditionSettingState.marketState.postMarketClose && data3.PMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: [...prevState.timeLabels2, '引け'],
        todayDistribution2: [...prevState.todayDistribution2, Number(data3.PMCloseTickFrame.TodayChart.Distribution)],
        todayCumulative2: [Number(...prevState.todayDistribution2, data3.PMCloseTickFrame.TodayChart.Cumulative)],
        historicalDistribution2: [...prevState.historicalDistribution2, Number(data3.PMCloseTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative2: [...prevState.historicalCumulative2, Number(data3.PMCloseTickFrame.AverageDaysChart.Cumulative)],
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

  }, [display, settingsState, conditionSettingState, chartState, chartData]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      height: '4000px',
      width: '600px',

    },
    title: {
      text: '1'
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
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [{
      type: 'column',
      color: '#FF0000',
      yAxis: 0,
      showInLegend: false,
      data: chartState.todayDistribution
    }, {
      type: 'column',
      color: '#00ff40',
      yAxis: 0,
      showInLegend: false,
      data: chartState.historicalDistribution
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 0,
      data: chartState.todayCumulative,
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      data: chartState.historicalCumulative
    }]
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
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [{
      showInLegend: false,
      type: 'column',
      color: '#FF0000',
      yAxis: 0,
      data: chartState.todayDistribution
      , tooltip: {
        valueSuffix: '%'
      }
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      data: chartState.todayCumulative,
      tooltip: {
        valueSuffix: '%'
      }
    }]
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
    series: [{
      showInLegend: false,
      type: 'column',
      color: '#00ff40',
      yAxis: 0,
      data: chartState.historicalDistribution
    }, {
      showInLegend: false,
      type: 'spline',
      yAxis: 1,
      data: chartState.historicalCumulative
    }]
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
