import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';
import { useMyContext } from '../../contexts/MyContext';
import data3 from '../../../public/data/data3.json'


// 定义 Chart 组件
const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState, conditionSettingState } = useMyContext();
  const [checked, setChecked] = useState<boolean>(false); // 状态管理复选框的选中状态
  const[chattime,setChattime] = useState<string[]>([]);//管理chat的x轴时间
  // const[chattime,setChattime] = useState<string[]>([]);//管理chat的柱
  // const[chattime,setChattime] = useState<string[]>([]);//管理chat的线


  
  
  
  let display = settingsState.radioValues[1] === "Arrange" //切换1/2个表

  // 前场时间
  let timeFrames = Object.keys(data3.AMTickFrame);
  let startTimes = timeFrames.map(timeFrame => timeFrame.split('-')[0]);
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
  const timeFrames2 = Object.keys(data3.PMTickFrame);
  const startTimes2 = timeFrames2.map(timeFrames2 => timeFrames2.split('-')[0]);
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
 
//当天前寄分布
console.log(data3.AMOpenTickFrame.TodayChart.Distribution);
//当天前寄累计
console.log(data3.AMOpenTickFrame.TodayChart.Cumulative);
//当天前引分布
console.log(data3.AMCloseTickFrame.TodayChart.Distribution);
//当天前引累计
console.log(data3.AMCloseTickFrame.TodayChart.Cumulative);


  console.log('chattime',chattime);
  
  


  useEffect(() => {
    //前寄
    if (conditionSettingState.marketState.preMarketOpening) {
      startTimes.unshift("寄付");
      TDistribution.unshift(Number(data3.AMOpenTickFrame.TodayChart.Distribution))
      TCumulative.unshift(Number(data3.AMOpenTickFrame.TodayChart.Cumulative))
      ADistribution.unshift(Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution))
      ACumulative.unshift(Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative))
    }else{
      const time = startTimes.concat(startTimes2)
      setChattime(time)
     
      
    }
    //前引  
    if (conditionSettingState.marketState.preMarketClose) {
      startTimes.push ("引け");
      TDistribution.push(Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution))
      TCumulative.push(Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative))
      ADistribution.push(Number(data3.AMOpenTickFrame.AverageDaysChart.Distribution))
      ACumulative.push(Number(data3.AMOpenTickFrame.AverageDaysChart.Cumulative))
    //后寄
    
    }
  }, [conditionSettingState]);




  // 处理复选框的变化事件
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked); // 更新复选框的状态
  };
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
      categories:startTimes,
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
      yAxis: 0, // 使用第一个 Y 轴
      // data: TDistribution
    }, {
      type: 'column', // 数据系列类型为柱状图
      color: '#00ff40', // 柱状图颜色
      yAxis: 0, // 使用第一个 Y 轴
      // data: TCumulative
    }, {
      name: '线图1', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 0, // 使用第一个 Y 轴
      // data: ADistribution, // 数据来源
      tooltip: {
        valueSuffix: '%' // 提示框后缀
      }
    }, {
      name: '线图2', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: [1,1,1,1,1,1,1,1,1]// 数据来源
      // data: ACumulative// 数据来源
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
      type: 'column', // 数据系列类型为柱状图
      color: '#00ff40', // 柱状图颜色
      yAxis: 0, // 使用第一个 Y 轴
      data: ADistribution // 数据来源
    }, {
      name: '线图2', // 数据系列名称
      type: 'spline', // 数据系列类型为折线图
      yAxis: 1, // 使用第二个 Y 轴
      data: ACumulative // 数据来源
    }]
  };
  // 使用 useEffect 钩子在组件挂载时创建图表  
  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById('chart-container'); // 获取图表容器元素
      if (container) {
        container.innerHTML = ''; // 清空容器内容
        Highcharts.chart('chart-container', { ...chartOptions, chart: { height: props.height, width: props.width, backgroundColor: settingsState.colors[2] } }); // 创建图表
      }
      if (display) {
        const container1 = document.getElementById('chart-container1'); // 获取图表容器元素 1
        const container2 = document.getElementById('chart-container2'); // 获取图表容器元素 2
        
        if (container1) {
          container1.innerHTML = ''; // 清空容器内容
          Highcharts.chart('chart-container1', { ...chartOptions1, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2], } }); // 创建图表 1
        }
        if (container2) {
          container2.innerHTML = ''; // 清空容器内容
          Highcharts.chart('chart-container2', { ...chartOptions2, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width, backgroundColor: settingsState.colors[2] } }); // 创建图表 2
        }
      }

    }, 0); // 确保 DOM 渲染完成
  }, [display, settingsState, conditionSettingState]); // 依赖项：checked 状态和图表的高度、宽度

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
