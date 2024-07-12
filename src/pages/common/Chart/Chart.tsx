import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Highcharts from 'highcharts';


const PageTwo: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      zoomType: 'xy',
      
    },
    title: {
      text: null // 设置图表标题为空
    },
    xAxis: {
      categories: [
        '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45',
        '9:50', '9:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30',
        '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15',
        '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00',
        '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45',
        '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30',
        '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15',
        '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00'
      ],
      crosshair: true
    },
    yAxis: [{
      labels: {
        format: '{value}%',
        enabled: false, 
        style: {
          color: Highcharts.getOptions().colors![1]
        }
      }
    }, {
    
      labels: {
        format: '{value} %',
        style: {
          color: Highcharts.getOptions().colors![0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      backgroundColor: Highcharts.defaultOptions.legend!.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [{
      type: 'column',
      color: '#FF0000',
      yAxis: 0,
      data: [16, 8, 20, 4, 18, 12, 5, 17, 7, 14, 11, 9, 3, 15, 10, 19, 2, 6, 13, 1,
        5, 16, 8, 12, 4, 7, 11, 18, 10, 13, 9, 3, 2, 15, 19, 20, 14, 6, 1, 17, 5,
        8, 11, 16, 7, 18, 12, 4, 10, 13, 19, 3, 2, 15, 20, 9, 14, 1, 6, 17, 8, 11,
        16, 5, 7, 18, 12, 4, 10, 13, 19, 3, 15]
    }, {
      type: 'column',
      color: '#00ff40',
      yAxis: 0,
      data: [8, 15, 10, 12, 14, 6, 19, 7, 13, 5, 9, 2, 1, 3, 20, 18, 4, 11, 17, 16,
        3, 8, 15, 11, 19, 7, 12, 10, 13, 4, 16, 20, 18, 6, 9, 2, 14, 5, 1, 17, 11,
        15, 10, 19, 14, 7, 13, 6, 12, 4, 18, 9, 20, 5, 2, 8, 3, 16, 1, 17, 7, 12,
        11, 14, 19, 13, 8, 10, 4, 6, 3, 2, 5]
    }, {
      name: '',
      type: 'spline',
      yAxis: 1,
      data: [
        1, 2, 3, 5, 7, 9, 10, 12, 14, 15,
        17, 18, 20, 22, 23, 25, 27, 28, 30, 32,
        34, 35, 37, 38, 40, 42, 43, 45, 46, 48,
        50, 51, 53, 55, 56, 58, 60, 61, 63, 65,
        67, 68, 70, 72, 73, 75, 77, 78, 80, 81,
        83, 85, 87, 88, 90, 91, 93, 95, 96, 98,
        99, 100, 98, 97, 96, 94, 93, 92, 91, 90,
        89, 88, 87, 86, 85
      ],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: '',
      type: 'spline',
      yAxis: 1,
      data: [
        5, 20, 35, 50, 10, 25, 40, 55, 15, 30,
        45, 60, 20, 35, 50, 65, 25, 40, 55, 70,
        30, 45, 60, 75, 35, 50, 65, 80, 40, 55,
        70, 85, 45, 60, 75, 90, 50, 65, 80, 95,
        55, 70, 85, 100, 60, 75, 90, 95, 65, 80,
        85, 90, 70, 75, 80, 85, 75, 70, 65, 60,
        55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
        5, 100, 95, 90, 85
      ],
      tooltip: {
      }
    }]
  };
  React.useEffect(() => {
    // Create the chart
    Highcharts.chart('chart-container', options);
  }, []);

  return (
    <div>
    <FormControlLabel className='chart-top'
    control={<Checkbox checked={checked} onChange={handleChange} />}
    label="当日の価格チャートを表示"
    labelPlacement="start"
  />
  <div>
  <div id="chart-container" className='chart'></div>

  </div>
  </div>
  );
};

export default PageTwo;
