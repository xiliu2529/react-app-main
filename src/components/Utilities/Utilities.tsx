import React from 'react';
import SettingsDialog from '../../components/SettingsDialog/SettingsDialog'
import './Utilities.css'



const Utilities: React.FC = () => {
  
  const print = () => {}
  const help = () => {}
  const favorite = () => {}
  const download = () => {}


  return (
    <div className="utilities-container">
      <span className="help-button" onClick={help}>ヘルプ</span>
      <span className="print-icon" onClick={print}></span>
      <span className="favorite-button" onClick={favorite}></span>
      <span className="download-button" onClick={download}></span>
      <SettingsDialog />
    </div>
  )
  
  
};

export default Utilities;