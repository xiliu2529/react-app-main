
import React from 'react';
import ConditionSettingsPage from './ConditionSettingsPage'
import InfoPanel from './common/InfoPanel/InfoPanel'
import Grid from './common/Grid/Grid'
import Chart from './common/Chart/Chart'
import './PageEight.css'
const PageEight: React.FC = () => {
  

  return (
    <div className='grid-container'>
    <div className='column'>
      <ConditionSettingsPage />
    </div>
    <div className='column'>
      <div className='info-grid-container'>
        <InfoPanel />
        <Grid />
      </div>
    </div>
    <div className='column'>
      <Chart />
    </div>
  </div>
  
  
  );
};

export default PageEight;
