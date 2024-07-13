import React, { useState } from 'react';
import './Layout.css';
import Header from '../Header/Header';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import MainContent from '../MainContent/MainContent';
import Page1 from '../../pages/GraphPage/GraphPage'
import Page2 from '../../pages/GridChartPage/GridChartPage'
import Page3 from '../../pages/common/InfoPanel/InfoPanel'
import Page4 from '../../pages/common/Grid/Grid'
import Page5 from '../../pages/common/Chart/Chart'
import Page6 from '../../pages/ConditionSettingsPage'
import Page7 from '../../pages/PageSeven'
import Page8 from '../../pages/PageEight'


const Layout: React.FC = () => {
  // 定义状态来存储从 LeftSidebar 组件传递过来的值和显示状态
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [showMainContent, setShowMainContent] = useState(true); // 默认显示 MainContent
  console.log(clickedButton);
  // 定义处理函数，用于接收从 LeftSidebar 组件传递过来的值，并控制 MainContent 的显示状态
  const handleButtonClick = (buttonName: number) => {
    setClickedButton(buttonName);
    setShowMainContent(false); // 点击按钮后隐藏 MainContent
  };

  return (
    <div className="layout">
      <Header />
      <div className="body">
        <LeftSidebar onButtonClick={handleButtonClick} />
        {showMainContent ? <MainContent /> : renderContent()}
      </div>
    </div>
  );
    
    
  // 根据接收到的值显示不同的内容
  function renderContent() {
    switch (clickedButton) {
      case 0:
          return <MainContent />
      case 1:
          return <Page1 />;
      case 2:
          return <Page2 />;
      case 3:
          return <Page3 />;
      case 4:
          return <Page4 />;
      case 5:
          return <Page5 />;
      case 6:
          return <Page6 />;    
      case 7:
          return <Page7 />;    
      case 8:
          return <Page8 />;    
   
    }
  }
};

export default Layout;
