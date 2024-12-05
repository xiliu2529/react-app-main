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
    const pdfUrl = 'help_volumecurve.pdf';
    window.open(pdfUrl, '_blank');
}

  const download = () => {
    setGriddownload(!griddownload)
    setShouldDownload(true)
  }
  return (
    <div className="utilities-container">
      <div className='help' onClick={help}>
         <span className="help-button"></span>
          <p className='help-p'>ヘルプ</p>
          </div>
      <span className="print-icon" onClick={print}></span>
      <span className="download-button" onClick={download}></span>
      <SettingsDialog/>
    </div>
  )
};
export default Utilities;