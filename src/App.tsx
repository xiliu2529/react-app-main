import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import './App.css';
import { MyProvider } from './contexts/MyContext';

const App: React.FC = () => {
  return (
    <MyProvider>
      <MainPage />
    </MyProvider>
  );
};
export default App;
