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
  griddownload:boolean
  setGriddownload: (alignment: boolean) => void; 
  response:boolean
  setResponse: (alignment: boolean) => void; 
  shouldDownload:boolean
  setShouldDownload: (alignment: boolean) => void; 
  error: any;
  setError: (error: any) => void; 
  loading:boolean
  setLoading:(state: boolean) => void; 
  
}

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
  const [error, setError] = useState<string | null>(null); 
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
