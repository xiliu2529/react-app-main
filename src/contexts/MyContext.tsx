import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MyContextType } from '../types/myContextTypes';

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHistoricalActive, setisHistoricalActive] = useState<boolean>(true);
  const [buttonName, setbuttonName] = useState<number>(1);
  const [settingsState, setSettingsState] = useState<SettingsState>({
    checkboxStates: Array(6).fill(false),
    radioValues: ['0', '0'],
    colors: [
      '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
      '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
      '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
    ],
  });
  const [error, setError] = useState<ErrorState>({ show: '', type: '' });


  const initialConditionSettingState: ConditionSettingState = {
    marketState: {
      preMarketOpening: false,
      preMarketClose: false,
      postMarketOpening: false,
      postMarketClose: false,
      eveningOpening: false,
      eveningClose: false,
    },
    inputValue: '',
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
  const getTenDaysAgoDate = (): string => {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const year = tenDaysAgo.getFullYear();
    const month = String(tenDaysAgo.getMonth() + 1).padStart(2, '0');
    const day = String(tenDaysAgo.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const today = new Date().toISOString().split('T')[0];
  const tenDaysAgo = getTenDaysAgoDate();
  const [showModal, setshowModal] = useState<RequestPayload>(
    {
      Code: '',
      HistoricalSetting: {
        Category: '0',
        Range: {
          DateFrom: tenDaysAgo,
          DateTo: today,
          Days: '10',
          SQ: {
            LargeSQ: '1',
            SmallSQ: '1',
            WeeklySQ: '1',
          },
        },
      },
      CalculationSetting: {
        Category: '3',
        Range: {
          TimeFrom: '',
          TimeTo: '',
          Minutes: '30',
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
  const [response, setResponse] = useState<boolean>(false);
  const [griddownload, setGriddownload] = useState<boolean>(false);
  const [shouldDownload, setShouldDownload] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [showConditionSettings, setshowConditionSettings] = useState(true);
  const [ViewSettings, setViewSettings] = useState({
    Layout: 1,
    SettingSwitch: true,
    Tab: 1,
    HighLow: '0', 
    Glaph: '0',
    CheckboxStates: [
      false, false, false, false, false, false
    ],
    Colors: [
      '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
      '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
      '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
    ],


  });

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
        griddownload,
        setGriddownload,
        response,
        setResponse,
        shouldDownload,
        setShouldDownload,
        error,
        setError,
        loading,
        setLoading,
        showConditionSettings,
        setshowConditionSettings,
        ViewSettings,
        setViewSettings

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
