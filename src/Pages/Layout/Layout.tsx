// Layout.tsx
import React, { useState } from 'react';
import './Layout.css';
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
import { useMyContext } from '../../contexts/MyContext'; // 导入上下文提供者

const Layout: React.FC = () => {
  // 定义状态来存储从 LeftSidebar 组件传递过来的值和显示状态
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const { isHistoricalActive } = useMyContext(); // 获取上下文中的 alignment
  // 定义处理函数，用于接收从 LeftSidebar 组件传递过来的值，并控制 MainContent 的显示状态
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

  // 根据接收到的值显示不同的内容
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

export default Layout;
