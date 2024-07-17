import React from 'react';
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import Grid from '../common/Grid/Grid'
import InfoPanelGrid from '../common/InfoPanelGrid/InfoPanelGrid'
import Chart from '../common/Chart/Chart'
import './ConfigChartBottom.css'
const ConfigChartBottom: React.FC = () => {


    return (
        <div className='ConfigChartBottom'>
            <div className='left-column'>
                <ConditionSetting />
            </div>
            <div className='right-column'>
                <div className='right-top'>   <InfoPanelGrid /></div>
                <div className='right-bottom'> <Chart height={'23%'}width={'900'} /></div>
            </div>
        </div>
    );


};

export default ConfigChartBottom;
