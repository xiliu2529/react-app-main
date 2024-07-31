import React, { createContext, useContext, useState, ReactNode } from 'react';

type CheckboxState = boolean[];
type RadioValue = string[];
type ColorValue = string[];
type SettingsState = {
  checkboxStates: CheckboxState;
  radioValues: RadioValue;
  colors: ColorValue;
};
// 定义上下文的类型，包含一个布尔值和一个更新函数
interface MyContextType {
    isHistoricalActive: boolean; // 当前布尔值的状态
    setisHistoricalActive: (alignment: boolean) => void; // 更新布尔值的函数
    settingsState: SettingsState; // 根据实际情况替换为合适的类型
    setSettingsState: (state: SettingsState) => void; // 根据实际情况替换为合适的类型
    buttonName:number;
    setbuttonName:(state: number) => void;
}

// 创建上下文对象，初始值为 undefined
const MyContext = createContext<MyContextType | undefined>(undefined);

// 创建一个上下文提供者组件
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 使用 useState 钩子来管理 isHistoricalActive 状态，初始值为 true
  const [isHistoricalActive, setisHistoricalActive] = useState<boolean>(true);
  const [buttonName, setbuttonName] = useState<number>(1);
  const [settingsState, setSettingsState] = useState<SettingsState>({
    checkboxStates: Array(7).fill(false), // 7 个复选框的初始状态
    radioValues: [ 'optionA', 'Arrange'], // 单选框的初始值
    colors: [
      '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
      '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
      '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
    ], // 颜色选择框的初始值
  });

  return (
    // 使用 MyContext.Provider 组件将上下文值传递给子组件
    <MyContext.Provider value={{ isHistoricalActive, setisHistoricalActive ,settingsState, setSettingsState,buttonName,setbuttonName}}>
      {children} {/* 渲染子组件 */}
    </MyContext.Provider>
  );
};

// 自定义 Hook 用于访问上下文
export const useMyContext = () => {
  // 使用 useContext 钩子获取上下文的当前值
  const context = useContext(MyContext);
  
  // 如果上下文未定义，则抛出错误，确保在 MyProvider 内部使用
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  // 返回上下文的当前值
  return context;
};
