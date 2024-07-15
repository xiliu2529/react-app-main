import React from 'react';
import ConditionSetting from '../common/ConditionSetting/ConditionSetting'
import Grid from '../common/InfoPanelGrid/InfoPanelGrid'
import './SettingsGridPage.css'
const SettingsGridPage: React.FC = () => {
  

  return (
    <div className='SettingsGridPage'>
  <div className='SettingsGridPage-ConditionSetting'>
    <ConditionSetting />
  </div>
  <div className='SettingsGridPage-Grid'>
    <Grid />
  </div>
</div>

  );
  
  
};

export default SettingsGridPage;
