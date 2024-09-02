import React from 'react';
import SettingsDialog from '../../components/SettingsDialog/SettingsDialog'
import './Utilities.css'
import { useMyContext } from '../../contexts/MyContext';




const Utilities: React.FC = () => {
  const { setGriddownload ,griddownload,setShouldDownload} = useMyContext();
  const print = () => {
    window.print();
  }
  const help = () => {
    const pdfUrl = '/volumeCurve_help.pdf'; 
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.target = '_blank'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

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