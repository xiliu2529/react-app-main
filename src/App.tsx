import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import './App.css';
import { MyProvider } from './contexts/MyContext'; // 导入上下文提供者

const App: React.FC = () => {
  return (
    <MyProvider>
      <MainPage />
    </MyProvider>
  );
};

export default App;
