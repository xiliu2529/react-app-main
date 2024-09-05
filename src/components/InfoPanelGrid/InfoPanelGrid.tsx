import React, { useEffect, useState } from 'react';
import InfoPanel from'../InfoPanel/InfoPanel'
import Grid from'../Grid/Grid'
import './InfoPanelGrid.css'



const InfoPanelGrid: React.FC = () => {
  const [isExpanded , setisExpanded ] = useState<boolean>(false);
  useEffect(() => {
    setisExpanded(window.innerWidth > 1400);
  }, []);

    
  return (
    <div className='infoPanelGrid' 
    style={isExpanded ? { transform: 'scale(1.4)', transformOrigin: '0 0', marginRight: '300px'} : { }}>
        <InfoPanel/>
        <div className='infoPanelGrid-Grid'>
             <Grid/> 
        </div>
      
    </div>
  );
  
  
};

export default InfoPanelGrid;