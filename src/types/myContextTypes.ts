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

    QvTotalingInfojson: any;
    setQvTotalingInfojson: (state: any) => void;
    QvVolumeCurveDatajson: any;
    setQvVolumeCurveDatajson: (state: any) => void;

    QvChartDatajson: any;
    setQvChartDatajson: (state: any) => void;

    QvHistoricalDatajson: any;
    setQvHistoricalDatajson: React.Dispatch<React.SetStateAction<any>>;

    nocal: boolean
    setNocal: (alignment: boolean) => void;



 

  }
  