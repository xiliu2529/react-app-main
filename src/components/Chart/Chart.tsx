import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';
import { useMyContext } from '../../contexts/MyContext';
import data3 from '../../data/data3.json'


// 定义 Chart 组件
const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState, conditionSettingState } = useMyContext();
  const [checked, setChecked] = useState<boolean>(false); // 状态管理复选框的选中状态
  // const[chattime,setChattime] = useState<string[]>([]);//管理chat的柱
  // const[chattime,setChattime] = useState<string[]>([]);//管理chat的线
  const [hasAddedData, setHasAddedData] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked); // 更新复选框的状态
  };



  let display = settingsState.radioValues[1] === "Arrange" //切换1/2个表
  // 前场时间
  let startTimes = Object.keys(data3.AMTickFrame).map(timeFrame => timeFrame.split('-')[0]);
  //当天分布前场
  let TDistribution = Object.values(data3.AMTickFrame).map(
    (tick) => tick.TodayChart.Distribution
  ).map(dist => parseFloat(dist));
  //当天累计前场
  let TCumulative = Object.values(data3.AMTickFrame).map(
    (tick) => tick.TodayChart.Cumulative
  ).map(dist => parseFloat(dist));

  // 过去分布前场
  let ADistribution = Object.values(data3.AMTickFrame).map(
    (tick) => tick.AverageDaysChart.Distribution
  ).map(dist => parseFloat(dist));
  // 过去累计前场
  let ACumulative = Object.values(data3.AMTickFrame).map(
    (tick) => tick.AverageDaysChart.Cumulative
  ).map(dist => parseFloat(dist));


  // 后场时间
  const startTimes2 = Object.keys(data3.PMTickFrame).map(timeFrames2 => timeFrames2.split('-')[0]);
  //当天分布后场
  const TDistribution2 = Object.values(data3.PMTickFrame).map(
    (tick) => tick.TodayChart.Distribution
  ).map(dist => parseFloat(dist));
  //当天累计后场
  const TCumulative2 = Object.values(data3.PMTickFrame).map(
    (tick) => tick.TodayChart.Cumulative
  ).map(dist => parseFloat(dist));
  // 过去分布后场
  let ADistribution2 = Object.values(data3.PMTickFrame).map(
    (tick) => tick.AverageDaysChart.Distribution
  ).map(dist => parseFloat(dist));
  // 过去累计后场
  let ACumulative2 = Object.values(data3.PMTickFrame).map(
    (tick) => tick.AverageDaysChart.Cumulative
  ).map(dist => parseFloat(dist));

  // 2个
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
      categories: startTimes,
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
      data: TDistribution
    }, {
      type: 'column', // 数据系列类型为柱状图
      color: '#00ff40', // 柱状图颜色
      name: '历史分布',
      yAxis: 0, // 使用第一个 Y 轴
      data: ADistribution
    }, {
      name: '当日累计', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 0, // 使用第一个 Y 轴
      data: TCumulative, // 数据来源
      tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }, {
      name: '历史累计', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: ACumulative// 数据来源
    }]
  };

  // 今天
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
      categories: startTimes,
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
      data: TDistribution // 数据来源
      , tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }, {
      name: '累計', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第一个 Y 轴
      data: TCumulative, // 数据来源
      tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }]
  };

  //以前
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
      categories: startTimes,
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
      data: ADistribution // 数据来源
    }, {
      name: '柱图', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: ACumulative // 数据来源
    }]
  };
  useEffect(() => {
    //前寄
    if (conditionSettingState.marketState.preMarketOpening && !startTimes.includes("寄付")) {
      startTimes.unshift("寄付");
      TDistribution.unshift(Number(data3.AMOpenTickFrame.TodayChart.Distribution));
      TCumulative.unshift(Number(data3.AMOpenTickFrame.TodayChart.Cumulative));
      ADistribution.unshift(Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution));
      ACumulative.unshift(Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative));
    }
  //前引
    if (conditionSettingState.marketState.preMarketClose && !startTimes.includes("引け")) {
      startTimes.push("引け");
      TDistribution.push(Number(data3.AMCloseTickFrame.TodayChart.Distribution));
      TCumulative.push(Number(data3.AMCloseTickFrame.TodayChart.Cumulative));
      ADistribution.push(Number(data3.AMCloseTickFrame.AverageDaysChart.Distribution));
      ACumulative.push(Number(data3.AMCloseTickFrame.AverageDaysChart.Cumulative));
    }
    //后寄
    if (conditionSettingState.marketState.postMarketOpening && !startTimes2.includes("寄付")) {
      startTimes2.unshift("寄付");
      TDistribution2.unshift(Number(data3.PMOpenTickFrame.TodayChart.Distribution));
      TCumulative2.unshift(Number(data3.PMOpenTickFrame.TodayChart.Cumulative));
      ADistribution2.unshift(Number(data3.PMOpenTickFrame.AverageDaysChart.Distribution));
      ACumulative2.unshift(Number(data3.PMOpenTickFrame.AverageDaysChart.Cumulative));
    }
    //后引
    if (conditionSettingState.marketState.postMarketClose && !startTimes2.includes("引け")) {
      startTimes2.push("引け");
      TDistribution2.push(Number(data3.PMCloseTickFrame.TodayChart.Distribution));
      TCumulative2.push(Number(data3.PMCloseTickFrame.TodayChart.Cumulative));
      ADistribution2.push(Number(data3.PMCloseTickFrame.AverageDaysChart.Distribution));
      ACumulative2.push(Number(data3.PMCloseTickFrame.AverageDaysChart.Cumulative));
    }
    // 确保不重复添加额外的数据
    if (startTimes2.length > 0 && !startTimes.slice(-startTimes2.length).every((val, idx) => val === startTimes2[idx])) {
      startTimes.push(...startTimes2);
      TDistribution.push(...TDistribution2);
      TCumulative.push(...TCumulative2);
      ADistribution.push(...ADistribution2);
      ACumulative.push(...ACumulative2);
    }
  }, [conditionSettingState,settingsState]);


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
  
  }, [display,settingsState,conditionSettingState]); // 依赖项：checked 状态和图表的高度、宽度

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
