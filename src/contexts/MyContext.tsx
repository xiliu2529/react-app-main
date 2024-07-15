// MyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义上下文的类型，包含一个布尔值和一个更新函数
interface MyContextType {
    isHistoricalActive: boolean; // 布尔值
  setisHistoricalActive: (alignment: boolean) => void; // 更新布尔值的函数
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHistoricalActive, setisHistoricalActive] = useState<boolean>(true); // 初始化为 true

  return (
    <MyContext.Provider value={{ isHistoricalActive, setisHistoricalActive}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
