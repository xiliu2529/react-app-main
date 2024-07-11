import React from 'react';
import { Grid } from '@mui/material';
import Chart from '../common/Chart/Chart';
import GRid from '../common/Grid/Grid';
import InfoPanel from '../common/InfoPanel/InfoPanel';
import './GridChartPage.css';

const PageFive: React.FC = () => {
  return (
    <div className="page-five-container">
      <div className="page-five-left">
        <InfoPanel />
        <GRid />
      </div>
      <div className="page-five-right">
        <Chart />
      </div>
    </div>
  );
};

export default PageFive;
