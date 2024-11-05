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

type ErrorState = {
  show: string;
  type: string;
}
type ConditionSettingState = {
  marketState: MarketState,
  inputValue: string,
};
type RequestPayload = {
  Code: string;
  HistoricalSetting: HistoricalSetting;
  CalculationSetting: CalculationSetting;
  ViewSetting?: ViewSetting;
};

type HistoricalSetting = {
  Category: string;
  Range: Rangex;
};

type Rangex = {
  startDate?: string;
  endDate?: string;
  DateFrom: string;
  DateTo: string;
  Days: string;
  SQ: SQ;
};

type SQ = {
  LargeSQ: string;
  SmallSQ: string;
  WeeklySQ: string;
};

type CalculationSetting = {
  Category: string;
  Range: CalculationRange;
  Individual: IndividualCalculation;
};

type CalculationRange = {
  TimeFrom: string;
  TimeTo: string;
  Minutes: string;
};

type IndividualCalculation = {
  AM: TimeSetting;
  PM: TimeSetting;
  Evening: TimeSetting;
};

type TimeSetting = {
  OpenTick: string;
  CloseTick: string;
};

type ViewSetting = {
  MostVolumeAndPriceType: string;
  PercentageOfDayType: string;
};


interface RequestPayload {
  Code: string;
  HistoricalSetting: HistoricalSetting;
  CalculationSetting: CalculationSetting;
  ViewSetting: ViewSetting;
}

interface HistoricalSetting {
  Category: string;
  Range: Range;
}
interface Range {
  DateFrom: string;
  DateTo: string;
  Days: string;
  SQ: SQ;
}

interface SQ {
  LargeSQ: string;
  SmallSQ: string;
  WeeklySQ: string;
}

interface CalculationSetting {
  Category: string;
  Range: CalculationRange;
  Individual: IndividualCalculation;
}

interface CalculationRange {
  TimeFrom: string;
  TimeTo: string;
  Minutes: string;
}
interface IndividualCalculation {
  AM: TimeSetting;
  PM: TimeSetting;
  Evening: TimeSetting;
}

interface TimeSetting {
  OpenTick: string;
  CloseTick: string;
}

interface ViewSetting {
  MostVolumeAndPriceType: string;
  PercentageOfDayType: string;
}

interface ViewSettings {
  Layout: number;
  SettingSwitch: boolean;
  Tab: number;
  HighLow: string;
  Glaph: string;
  CheckboxStates: boolean[];
  Colors: string[];
};