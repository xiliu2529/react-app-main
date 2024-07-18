import React from 'react';
import InfoPanel from'../InfoPanel/InfoPanel'
import HistoricalGrid from'../HistoricalGrid/HistoricalGrid'
import './InfoPanelGrid.css'



const InfoPanelGrid: React.FC = () => {
  
    
  return (
    <div className='infoPanelGrid'>
        <InfoPanel/>
        <div className='infoPanelGrid-Grid'>
             <HistoricalGrid/> 
        </div>
      
    </div>
  );
  
  
};

export default InfoPanelGrid;