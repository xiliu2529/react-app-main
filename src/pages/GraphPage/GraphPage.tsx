import React, { useState } from 'react';
import Chart from '../common/Chart/Chart';
import InfoPanel from '../common/InfoPanel/InfoPanel';
import './GraphPage.css';

const GraphPage: React.FC = () => {

  
  return (
    <div className='GraphPage'>
      <div className='GraphPage-InfoPanel'><InfoPanel /></div>
      <div> <Chart height={'32%'} width={null} /></div>

    </div>
  );
};

export default GraphPage;
