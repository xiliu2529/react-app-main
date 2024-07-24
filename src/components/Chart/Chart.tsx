import React, { useState, useEffect } from 'react'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import Highcharts from 'highcharts';
import { useMyContext } from '../../contexts/MyContext';

// 生成假数据的函数
const generateRandomData = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

// 定义假数据
const seriesData = {
  column1: generateRandomData(10), // 生成 10 个随机数据点用于柱状图 1
  column2: generateRandomData(10), // 生成 10 个随机数据点用于柱状图 2
  spline1: generateRandomData(10), // 生成 10 个随机数据点用于折线图 1
  spline2: generateRandomData(10)  // 生成 10 个随机数据点用于折线图 2
};

// 定义图表配置选项
const chartOptions: Highcharts.Options = {
  chart: {
    type: 'column', // 图表类型为柱状图
    height: '4000px', // 图表高度
    width: '600px'   // 图表宽度
  },
  title: {
    text: undefined // 图表标题
  },
  xAxis: {
    categories: Array.from({ length: 60 }, (_, i) => `時間 ${i + 1}`), // X 轴分类
    crosshair: true // 启用十字准线
  },
  yAxis: [{
    labels: {
      format: '{value}%', // Y 轴标签格式
      enabled: false // 禁用 Y 轴标签
    }
  }, {
    labels: {
      format: '{value} %', // Y 轴标签格式
    },
    opposite: true // 将此 Y 轴放在右边
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
    data: seriesData.column1 // 数据来源
  }, {
    type: 'column', // 数据系列类型为柱状图
    color: '#00ff40', // 柱状图颜色
    yAxis: 0, // 使用第一个 Y 轴
    data: seriesData.column2 // 数据来源
  }, {
    name: '线图1', // 数据系列名称
    type: 'spline', // 数据系列类型为折线图
    yAxis: 0, // 使用第一个 Y 轴
    data: seriesData.spline1, // 数据来源
    tooltip: {
      valueSuffix: '%' // 提示框后缀
    }
  }, {
    name: '线图2', // 数据系列名称
    type: 'spline', // 数据系列类型为折线图
    yAxis: 1, // 使用第二个 Y 轴
    data: seriesData.spline2 // 数据来源
  }]
};

// 定义图表配置选项 1
const chartOptions1: Highcharts.Options = {
  chart: {
    type: 'column', // 图表类型为柱状图
    height: '200px', // 图表高度
    width: '600px'   // 图表宽度
  },
  title: {
    text: undefined // 图表标题
  },
  xAxis: {
    categories: Array.from({ length: 10 }, (_, i) => `時間 ${i + 1}`), // X 轴分类
    crosshair: true // 启用十字准线
  },
  yAxis: [{
    labels: {
      format: '{value}%', // Y 轴标签格式
      enabled: false // 禁用 Y 轴标签
    }
  }, {
    labels: {
      format: '{value} %', // Y 轴标签格式
    },
    opposite: true // 将此 Y 轴放在右边
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
    data: seriesData.column1 // 数据来源
  }, {
    name: '线图1', // 数据系列名称
    type: 'spline', // 数据系列类型为折线图
    yAxis: 0, // 使用第一个 Y 轴
    data: seriesData.spline1, // 数据来源
    tooltip: {
      valueSuffix: '%' // 提示框后缀
    }
  }]
};

// 定义图表配置选项 2
const chartOptions2: Highcharts.Options = {
  chart: {
    type: 'column', // 图表类型为柱状图
    height: '200px', // 图表高度
    width: '600px'   // 图表宽度
  },
  title: {
    text: undefined // 图表标题
  },
  xAxis: {
    categories: Array.from({ length: 10 }, (_, i) => `時間 ${i + 1}`), // X 轴分类
    crosshair: true // 启用十字准线
  },
  yAxis: [{
    labels: {
      format: '{value}%', // Y 轴标签格式
      enabled: false // 禁用 Y 轴标签
    }
  }, {
    labels: {
      format: '{value} %', // Y 轴标签格式
    },
    opposite: true // 将此 Y 轴放在右边
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
    color: '#00ff40', // 柱状图颜色
    yAxis: 0, // 使用第一个 Y 轴
    data: seriesData.column2 // 数据来源
  }, {
    name: '线图2', // 数据系列名称
    type: 'spline', // 数据系列类型为折线图
    yAxis: 1, // 使用第二个 Y 轴
    data: seriesData.spline2 // 数据来源
  }]
};

// 定义 Chart 组件
const Chart: React.FC<{ height: string | number | null, width: string | number | null }> = (props) => {
  const { settingsState } = useMyContext();
  const [checked, setChecked] = useState<boolean>(false); // 状态管理复选框的选中状态
  let display = settingsState.radioValues[2] === "Arrange"
  // 处理复选框的变化事件
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked); // 更新复选框的状态
  };

  // 使用 useEffect 钩子在组件挂载时创建图表
  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById('chart-container'); // 获取图表容器元素
      if (container) {
        container.innerHTML = ''; // 清空容器内容
        Highcharts.chart('chart-container', { ...chartOptions, chart: { height: props.height, width: props.width } }); // 创建图表
      }
      if (display) {
        const container1 = document.getElementById('chart-container1'); // 获取图表容器元素 1
        const container2 = document.getElementById('chart-container2'); // 获取图表容器元素 2
        if (container1) {
          container1.innerHTML = ''; // 清空容器内容
          Highcharts.chart('chart-container1', { ...chartOptions1, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width } }); // 创建图表 1
        }
        if (container2) {
          container2.innerHTML = ''; // 清空容器内容
          Highcharts.chart('chart-container2', { ...chartOptions2, chart: { height: props.height ? `${parseFloat(props.height as string) / 2}px` : '200px', width: props.width } }); // 创建图表 2
        }
      }
    }, 0); // 确保 DOM 渲染完成
  }, [display, props.height, props.width]); // 依赖项：checked 状态和图表的高度、宽度

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
