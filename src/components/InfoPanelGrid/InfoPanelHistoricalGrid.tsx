import React from 'react';
import InfoPanel from '../InfoPanel/InfoPanel'
import HistoricalGrid from '../HistoricalGrid/HistoricalGrid'
import './InfoPanelGrid.css'



const InfoPanelGrid: React.FC = () => {


  return (
    <div className='HistoricalGrid'>
      <div className='HistoricalGrid-InfoPanel'>   
        <InfoPanel />
        </div>

      <div className='infoPanelGrid-Grid'>
        <HistoricalGrid />
      </div>

    </div>
  );


};

export default InfoPanelGrid;