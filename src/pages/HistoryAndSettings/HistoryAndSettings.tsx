import React from 'react';
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import InfoPanelHistoricalGrid from '../common/InfoPanelGrid/InfoPanelHistoricalGrid'
// import './SettingsGridPage.css'
const SettingsGridPage: React.FC = () => {
  

  return (
    <div className='SettingsGridPage'>
  <div className='SettingsGridPage-ConditionSetting'>
    <ConditionSetting />
  </div>
  <div className='SettingsGridPage-InfoPanelGrid'>
    <InfoPanelHistoricalGrid />
  </div>
</div>

  );
  
  
};

export default SettingsGridPage;
