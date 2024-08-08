import React, { useState } from 'react';
import './MainPage.css';
import Header from '../Header/Header';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import {
  SettingsChartGridPage,
  GridChartPage,
  SettingsGridPage,
  GridPage,
  SettingsChartPage,
  GraphPage,
  ConfigChartBottom,
  ChartBottom,
  HistoryAndSettings,
  HistoricalData
} from '../PageSwitcher/PageSwitcher'; 
import { useMyContext } from '../../contexts/MyContext'; 
const MainPage: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const { isHistoricalActive} = useMyContext(); 
  const handleButtonClick = (buttonName: number) => {
    setClickedButton(buttonName);
  };
 
  return (
    <div className="layout">
      <Header />
      <div className="body">
        <LeftSidebar onButtonClick={handleButtonClick}/>
        {renderContent()}
      </div>
    </div>
  );
  function renderContent() {
    if (!isHistoricalActive) {
      switch (clickedButton) {
        case 9:
          return <HistoryAndSettings />;
        case 10:
          return <HistoricalData />;
        default:
          return <HistoryAndSettings />;
      }
    }
    switch (clickedButton) {
      case 0:
        return <SettingsChartGridPage />;
      case 1:
        return <SettingsChartGridPage />;
      case 2:
        return <GridChartPage />;
      case 3:
        return <SettingsGridPage />;
      case 4:
        return <GridPage />;
      case 5:
        return <SettingsChartPage />;
      case 6:
        return <GraphPage />;
      case 7:
        return <ConfigChartBottom />;
      case 8:
        return <ChartBottom />;
      default:
        return <SettingsChartGridPage />;
    }
  }
};

export default MainPage;
