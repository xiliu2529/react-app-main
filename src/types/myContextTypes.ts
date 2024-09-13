  export interface MyContextType {
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
    showModal: RequestPayload
    setshowModal: (state: RequestPayload) => void;
    griddownload: boolean
    setGriddownload: (alignment: boolean) => void;
    response: boolean
    setResponse: (alignment: boolean) => void;
    shouldDownload: boolean
    setShouldDownload: (alignment: boolean) => void;
    error: ErrorState;
    setError: (error: ErrorState) => void;
    loading: boolean
    setLoading: (state: boolean) => void;
    showConditionSettings: boolean
    setshowConditionSettings: (state: boolean) => void;
    ViewSettings:any
    setViewSettings:(state: any) => void;
 

  }
  