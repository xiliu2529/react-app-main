import React from 'react';
import Grid from '../common/Grid/Grid'
import InfoPanelGrid from '../common/InfoPanelGrid/InfoPanelGrid'
import Chart from '../common/Chart/Chart'
import './ChartBottom.css'
const ChartBottom: React.FC = () => {


    return (
        <div className='ChartBottom'>
                <div className='ChartBottom-top'>   <InfoPanelGrid /></div>
                <div className='ChartBottom-bottom'> <Chart height={null}width={null} /></div>
            </div>
    );


};

export default ChartBottom;
