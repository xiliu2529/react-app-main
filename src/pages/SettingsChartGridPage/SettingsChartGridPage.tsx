import React from 'react';
import Chart from'../common/Chart/Chart'
import InfoPanelGrid from '../common/InfoPanelGrid/InfoPanelGrid'
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import './SettingsChartGridPage.css';
const SettingsChartGridPage: React.FC = () => {
  

  return (
    <div className='SettingsChartGridPage'>
        <ConditionSetting/>
      <div className='SettingsChartGridPage-InfoPanelGrid'>
        <InfoPanelGrid/>
        </div>

        <Chart height={800} width={600}/>

    </div>
  );
  
  
};

export default SettingsChartGridPage;
