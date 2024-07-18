import React from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { MyProvider } from './contexts/MyContext'; // 导入上下文提供者

const App: React.FC = () => {
  return (
    <MyProvider>
      <Layout />
    </MyProvider>
  );
};

export default App;
