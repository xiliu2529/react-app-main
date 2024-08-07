import React, { createContext, useContext, useState, ReactNode } from 'react';

type CheckboxState = boolean[];
type RadioValue = string[];
type ColorValue = string[];
type SettingsState = {
  checkboxStates: CheckboxState;
  radioValues: RadioValue;
  colors: ColorValue;
};
type MarketState = {
  preMarketOpening: boolean;
  preMarketClose: boolean;
  postMarketOpening: boolean;
  postMarketClose: boolean;
  eveningOpening: boolean;
  eveningClose: boolean;
};

type ConditionSettingState = {
  marketState: MarketState,
  inputValue:string,
};

interface MyContextType {
  isHistoricalActive: boolean; 
  setisHistoricalActive: (alignment: boolean) => void; 
  settingsState: SettingsState; 
  setSettingsState: (state: SettingsState) => void; 
  buttonName: number;
  setbuttonName: (state: number) => void;
  conditionSettingState: ConditionSettingState;
  setConditionSettingState: (state: ConditionSettingState) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHistoricalActive, setisHistoricalActive] = useState<boolean>(true);
  const [buttonName, setbuttonName] = useState<number>(1);
  const [settingsState, setSettingsState] = useState<SettingsState>({
    checkboxStates: Array(7).fill(false), 
    radioValues: ['0', 'Arrange'], 
    colors: [
      '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
      '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
      '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
    ],
  });
  const initialConditionSettingState: ConditionSettingState = {
    marketState: {
      preMarketOpening: false,
      preMarketClose: false,
      postMarketOpening: false,
      postMarketClose: false,
      eveningOpening: false,
      eveningClose: false,
    },
    inputValue:'',
  };
  const [conditionSettingState, setConditionSettingState] = useState<ConditionSettingState>(initialConditionSettingState);

  return (
    <MyContext.Provider
      value={{
        isHistoricalActive,
        setisHistoricalActive,
        settingsState,
        setSettingsState,
        buttonName,
        setbuttonName,
        conditionSettingState,
        setConditionSettingState,
      }}
    >
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
