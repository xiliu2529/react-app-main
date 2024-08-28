import React from 'react';
import SettingsDialog from '../../components/SettingsDialog/SettingsDialog'
import './Utilities.css'
import { useMyContext } from '../../contexts/MyContext';




const Utilities: React.FC = () => {
  const { setGriddownload ,griddownload,setShouldDownload} = useMyContext();
  const print = () => {
    window.print();
  }
  const help = () => {}
  const favorite = () => {}

  const download = () => {
    setGriddownload(!griddownload)
    setShouldDownload(true)
    
  }


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