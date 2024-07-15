import React from 'react';
import Chart from '../common/Chart/Chart';
import GRid from '../common/Grid/Grid';
import InfoPanel from '../common/InfoPanel/InfoPanel';
import './GridChartPage.css';

const GridChartPage: React.FC = () => {
  return (
    <div className='GridChartPage'>
      <div className="page-left">
        <div className='GridChartPage-InfoPanel'>
          <InfoPanel />
        </div>
       <div className='GridChartPage-GRid'><GRid /></div> 
      </div>
      <div className="GridChartPage-Chart">
        <Chart height={'150%'} width={480}/>
      </div>
    </div>
  );
};

export default GridChartPage;
