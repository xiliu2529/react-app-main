import React from 'react';
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import Chart from '../common/Chart/Chart';
import InfoPanel from '../common/InfoPanel/InfoPanel';
import './SettingsChartPage.css'
const SettingsChartPage: React.FC = () => {


    return (
        <div className='SettingsChartPage'>
            <ConditionSetting />
            <div className='SettingsChart-InfoPanelChart'>
            <InfoPanel />
            
            <Chart height={'45%'} width={900} />
            </div>
        </div>
    );


};

export default SettingsChartPage;
