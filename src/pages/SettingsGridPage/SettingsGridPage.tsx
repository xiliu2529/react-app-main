import React from 'react';
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import InfoPanelGrid from '../common/InfoPanelGrid/InfoPanelGrid'
import './SettingsGridPage.css'
const SettingsGridPage: React.FC = () => {
  

  return (
    <div className='SettingsGridPage'>
  <div className='SettingsGridPage-ConditionSetting'>
    <ConditionSetting />
  </div>
  <div className='SettingsGridPage-InfoPanelGrid'>
    <InfoPanelGrid />
  </div>
</div>

  );
  
  
};

export default SettingsGridPage;
