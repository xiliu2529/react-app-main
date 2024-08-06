import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';
import { useMyContext } from '../../contexts/MyContext';
// import data3 from '../../data/601.1/data3.json'
// import data3 from '../../data/101.1/data3.json'
import data3 from '../../data/data3.json'

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
// 定义 Chart 组件
const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState, conditionSettingState } = useMyContext();
  const [checked, setChecked] = useState<boolean>(false); // 状态管理复选框的选中状态
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
    setChecked(event.target.checked); // 更新复选框的状态
  };
  let display = settingsState.radioValues[1] === "Arrange" //切换1/2个表

  useEffect(() => {
    const processData = () => {
      // 初始化数据
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

      // 获取晚上数据
      if (data3.EveningTickFrame) {
        timeLabels = Object.keys(data3.EveningTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.TodayChart.Distribution));
        todayCumulative = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.TodayChart.Cumulative));
        historicalDistribution = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Distribution));
        historicalCumulative = Object.values(data3.EveningTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Cumulative));
      }
      // 获取前场数据
      if (data3.AMTickFrame) {
        timeLabels1 = Object.keys(data3.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);
        todayDistribution1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.TodayChart.Distribution));
        todayCumulative1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.TodayChart.Cumulative));
        historicalDistribution1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Distribution));
        historicalCumulative1 = Object.values(data3.AMTickFrame).map(tick => parseFloat(tick.AverageDaysChart.Cumulative));
      }
      // 获取后场数据
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
  }, [settingsState, conditionSettingState,display]);

  console.log(chartData, 'chartData');
  // 2个

  useEffect(() => {
    //晚寄
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
    //晚引
    if (conditionSettingState.marketState.eveningClose && data3.EveningCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels: [...prevState.timeLabels,'引け'],
        todayDistribution: [ ...prevState.todayDistribution,Number(data3.EveningCloseTickFrame.TodayChart.Distribution)],
        todayCumulative: [Number(...prevState.todayDistribution,data3.EveningCloseTickFrame.TodayChart.Cumulative)],
        historicalDistribution: [ ...prevState.historicalDistribution,Number(data3.EveningCloseTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative: [...prevState.historicalCumulative,Number(data3.EveningOpenTickFrame.AverageDaysChart.Cumulative)],
      }));
    }

    //前寄
    if (conditionSettingState.marketState.preMarketOpening ) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: ['寄付', ...prevState.timeLabels1],
        todayDistribution1: [Number(data3.AMOpenTickFrame.TodayChart.Distribution), ...prevState.todayDistribution1],
        todayCumulative1: [Number(data3.AMOpenTickFrame.TodayChart.Cumulative), ...prevState.todayDistribution1],
        historicalDistribution1: [Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution), ...prevState.historicalDistribution1],
        historicalCumulative1: [Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative), ...prevState.historicalCumulative1],
      }));


    }
    //前引
    if (conditionSettingState.marketState.preMarketClose) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels1: [...prevState.timeLabels1,'引け'],
        todayDistribution1: [ ...prevState.todayDistribution1,Number(data3.AMOpenTickFrame.TodayChart.Distribution)],
        todayCumulative1: [Number(...prevState.todayDistribution1,data3.AMOpenTickFrame.TodayChart.Cumulative)],
        historicalDistribution1: [ ...prevState.historicalDistribution1,Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative1: [...prevState.historicalCumulative1,Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative)],
      }));

    }
    //后寄
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
    //后引
    if (conditionSettingState.marketState.postMarketClose && data3.PMCloseTickFrame) {
      setChartData(prevState => ({
        ...prevState,
        timeLabels2: [...prevState.timeLabels2,'引け'],
        todayDistribution2: [ ...prevState.todayDistribution2,Number(data3.PMCloseTickFrame.TodayChart.Distribution)],
        todayCumulative2: [Number(...prevState.todayDistribution2,data3.PMCloseTickFrame.TodayChart.Cumulative)],
        historicalDistribution2: [ ...prevState.historicalDistribution2,Number(data3.PMCloseTickFrame.AverageDaysChart.Distribution)],
        historicalCumulative2: [...prevState.historicalCumulative2,Number(data3.PMCloseTickFrame.AverageDaysChart.Cumulative)],
      }));

    }
  }, [conditionSettingState, settingsState,display]);
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
    // 其他逻辑...
  }, [chartData]);
  useEffect(() => {
    // 处理图表创建和更新
    const container = document.getElementById('chart-container');
    if (container) {
      container.innerHTML = ''; // 清空容器内容
      Highcharts.chart('chart-container', { ...chartOptions, chart: { height: props.height, width: props.width, backgroundColor: settingsState.colors[2] } });
    }
    if (display) {
      const container1 = document.getElementById('chart-container1');
      const container2 = document.getElementById('chart-container2');

      if (container1) {
        container1.innerHTML = '';
        Highcharts.chart('chart-container1', { ...chartOptions1, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] } });
      }
      if (container2) {
        container2.innerHTML = '';
        Highcharts.chart('chart-container2', { ...chartOptions2, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] } });
      }
    }

  }, [display, settingsState, conditionSettingState,chartState,chartData]); // 依赖项：checked 状态和图表的高度、宽度

  const a = chartState.xAxisLabels
  const b = chartState.todayCumulative
  const c = chartState.todayDistribution
  console.log('abc',a,b,c);
  console.log('chartState',chartState);
  console.log('chartData',chartData);
  
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column', // 图表类型为柱状图
      height: '4000px', // 图表高度
      width: '600px',   // 图表宽度

    },
    title: {
      text: '1' // 图表标题
    },
    xAxis: {
      categories: chartState.xAxisLabels,
      crosshair: true, // 启用十字准线
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
        format: '{value}%', // Y 轴标签格式
      }, title: {
        text: undefined
      }
    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %', // Y 轴标签格式

      },
      opposite: true, // 将此 Y 轴放在右边
      title: {
        text: undefined
      }
    }],

    tooltip: {
      shared: true // 启用共享提示
    },
    legend: {
      align: 'left', // 图例对齐方式
      verticalAlign: 'top', // 图例垂直对齐方式
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)' // 图例背景颜色
    },
    series: [{
      type: 'column', // 数据系列类型为柱状图
      color: '#FF0000', // 柱状图颜色
      yAxis: 0, // 使用第一个 Y 轴.
      name: '当日分布',
      data: chartState.todayDistribution
    }, {
      type: 'column', // 数据系列类型为柱状图
      color: '#00ff40', // 柱状图颜色
      name: '历史分布',
      yAxis: 0, // 使用第一个 Y 轴
      data: chartState.historicalDistribution
    }, {
      name: '当日累计', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 0, // 使用第一个 Y 轴
      data: chartState.todayCumulative, // 数据来源
      tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }, {
      name: '历史累计', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: chartState.historicalCumulative// 数据来源
    }]
  };
  // // 今天
  const chartOptions1: Highcharts.Options = {
    chart: {
      type: 'column', // 图表类型为柱状图
      height: '200px', // 图表高度
      width: '600px',  // 图表宽度
    },
    title: {
      text: '今天' // 图表标题
    },
    xAxis: {
      categories: a,
      crosshair: true, // 启用十字准线
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
        format: '{value}%', // Y 轴标签格式
      }, title: {
        text: undefined
      }
    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %', // Y 轴标签格式

      },
      opposite: true, // 将此 Y 轴放在右边
      title: {
        text: undefined
      }
    }],
    tooltip: {
      shared: true // 启用共享提示
    },
    legend: {
      align: 'left', // 图例对齐方式
      verticalAlign: 'top', // 图例垂直对齐方式
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || 'rgba(255,255,255,0.25)' // 图例背景颜色
    },
    series: [{
      name: '分布',
      type: 'column', // 数据系列类型为柱状图
      color: '#FF0000', // 柱状图颜色
      yAxis: 0, // 使用第一个 Y 轴
      data: c // 数据来源
      , tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }, {
      name: '累計', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第一个 Y 轴
      data: b, // 数据来源
      tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }]
  };
  // //以前
  const chartOptions2: Highcharts.Options = {
    chart: {
      type: 'column', // 图表类型为柱状图
      height: '200px', // 图表高度
      width: '600px', // 图表宽度
    },

    title: {
      text: '历史' // 图表标题
    },
    xAxis: {
      categories: chartState.xAxisLabels,
      crosshair: true, // 启用十字准线
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
        format: '{value}%', // Y 轴标签格式
      }, title: {
        text: undefined
      }
    }, {
      labels: {
        style: {
          color: settingsState.colors[3]
        },
        format: '{value} %', // Y 轴标签格式

      },
      opposite: true, // 将此 Y 轴放在右边
      title: {
        text: undefined
      }
    }],
    tooltip: {
      shared: true // 启用共享提示
    },
    legend: {
      align: 'left', // 图例对齐方式
      verticalAlign: 'top', // 图例垂直对齐方式
    },
    series: [{
      name: '分布',
      type: 'column', // 数据系列类型为柱状图
      color: '#00ff40', // 柱状图颜色
      yAxis: 0, // 使用第一个 Y 轴
      data: chartState.historicalDistribution // 数据来源
    }, {
      name: '柱图', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: chartState.historicalCumulative // 数据来源
    }]
  };
  return (
    <div>
      <FormControlLabel
        className='chart-top' // 为 FormControlLabel 组件添加自定义样式
        control={<Checkbox checked={checked} onChange={handleChange} />} // 渲染复选框
        label="当日の価格チャートを表示" // 复选框标签
        labelPlacement="start" // 标签放置位置
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

export default Chart; // 导出 Chart 组件
