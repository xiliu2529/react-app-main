import './MainPage.css';
import Header from '../../components/Header/Header';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import {
  SettingsChartGridPage,
  GridChartPage,
  SettingsGridPage,
  GridPage,
  SettingsChartPage,
  ChartPage,
  ConfigChartBottom,
  ChartBottom,
  HistoryAndSettings,
  HistoricalData
} from '../../components/PageSwitcher/PageSwitcher';
import { useMyContext, } from '../../contexts/MyContext';
import { useEffect, useState } from 'react';






const MainPage: React.FC = () => {
  const { isHistoricalActive, buttonName, loading, error } = useMyContext();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    console.log('error',error);
    if (error && error.response?.status !== 200) {
      setShowSnackbar(true);
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);



  return (
    <div className="layout">
      <Header />
      <div className="body">
        <LeftSidebar />
        {renderContent()}
        {showSnackbar && (
          <div className="custom-snackbar">
            <span>error</span>
          </div>
        )}
        {loading && <LoadingOverlay />}

      </div>
    </div>
  );
  function renderContent() {
    if (!isHistoricalActive) {
      switch (buttonName) {
        case 1:
          return <HistoryAndSettings />;
        case 2:
          return <HistoricalData />;
        default:
          return <HistoryAndSettings />;
      }
    }
    switch (buttonName) {
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
        return <ChartPage />;
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
