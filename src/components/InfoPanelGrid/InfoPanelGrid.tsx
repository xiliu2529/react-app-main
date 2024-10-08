import InfoPanel from'../InfoPanel/InfoPanel'
import Grid from'../Grid/Grid'
import './InfoPanelGrid.css'

const InfoPanelGrid: React.FC = () => {
    
  return (
    <div className='infoPanelGrid'>
    <InfoPanel/>
        <div className='infoPanelGrid-Grid'>
             <Grid/> 
        </div>
    </div>
  );
};

export default InfoPanelGrid;