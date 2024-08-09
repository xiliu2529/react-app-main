import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {
  isHistoricalActive: boolean; 
  setisHistoricalActive: (alignment: boolean) => void; 
  settingsState: SettingsState; 
  setSettingsState: (state: SettingsState) => void; 
  buttonName: number;
  setbuttonName: (state: number) => void;
  conditionSettingState: ConditionSettingState;
  setConditionSettingState: (state: ConditionSettingState) => void;
  requestPayload: RequestPayload; 
  setRequestPayload: (state: RequestPayload) => void;
  showModal:RequestPayload
  setshowModal: (state: RequestPayload) => void;
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
  const [requestPayload, setRequestPayload] = useState<RequestPayload>(
    {
      Code: '',
      HistoricalSetting: {
        Category: '',
        Range: {
          DateFrom: '',
          DateTo: '',
          Days: '',
          SQ: {
            LargeSQ: '',
            SmallSQ: '',
            WeeklySQ: '',
          },
        },
      },
      CalculationSetting: {
        Category: '',
        Range: {
          TimeFrom: '',
          TimeTo: '',
          Minutes: '',
        },
        Individual: {
          AM: {
            OpenTick: '',
            CloseTick: '',
          },
          PM: {
            OpenTick: '',
            CloseTick: '',
          },
          Evening: {
            OpenTick: '',
            CloseTick: '',
          },
        },
      },
      ViewSetting: {
        MostVolumeAndPriceType: '',
        PercentageOfDayType: '',
      },
    }
  );
  const [showModal, setshowModal] = useState<RequestPayload>(
    {
      Code: '',
      HistoricalSetting: {
        Category: '',
        Range: {
          DateFrom: '',
          DateTo: '',
          Days: '',
          SQ: {
            LargeSQ: '',
            SmallSQ: '',
            WeeklySQ: '',
          },
        },
      },
      CalculationSetting: {
        Category: '',
        Range: {
          TimeFrom: '',
          TimeTo: '',
          Minutes: '',
        },
        Individual: {
          AM: {
            OpenTick: '',
            CloseTick: '',
          },
          PM: {
            OpenTick: '',
            CloseTick: '',
          },
          Evening: {
            OpenTick: '',
            CloseTick: '',
          },
        },
      },
      ViewSetting: {
        MostVolumeAndPriceType: '',
        PercentageOfDayType: '',
      },
    }
  );
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
        requestPayload,
        setRequestPayload,
        showModal,
        setshowModal,

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
