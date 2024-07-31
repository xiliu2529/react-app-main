import React from 'react';
import C from './common/ConditionSetting/ConditionSetting'
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
