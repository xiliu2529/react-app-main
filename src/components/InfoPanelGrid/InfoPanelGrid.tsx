import React from 'react';
import InfoPanel from'../InfoPanel/InfoPanel'
import Grid from'../Grid/Grid'
import './InfoPanelGrid.css'



const InfoPanelGrid: React.FC = () => {
  
    
  return (
    <div className='infoPanelGrid' 
    // style={{ transform: 'scale(1.4)', transformOrigin: '0 0', marginRight: '280px' }}
    >
        <InfoPanel/>
        <div className='infoPanelGrid-Grid'>
             <Grid/> 
        </div>
      
    </div>
  );
  
  
};

export default InfoPanelGrid;