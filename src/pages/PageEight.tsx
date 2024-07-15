import React from 'react';
import C from './common/ConditionSetting/ConditionSetting'
import InfoPanel from './common/InfoPanel/InfoPanel'
import Grid from './common/Grid/Grid'
import Chart from './common/Chart/Chart'
// import GridChartPage from'./GridChartPage/GridChartPage'
// import './PageEight.css'
const PageEight: React.FC = () => {
  

  return (
    <div className='grid-container'>
      <div className='C'> 
        <C />
      </div>
      <div className='grid-chart-page'>
        {/* <GridChartPage /> */}
      </div>
    </div>
  );
  
  
};

export default PageEight;
