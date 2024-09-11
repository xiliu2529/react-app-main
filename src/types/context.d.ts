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
type RequestPayload = {
  Code: string;
  HistoricalSetting: HistoricalSetting;
  CalculationSetting: CalculationSetting;
  ViewSetting: ViewSetting;
};

type HistoricalSetting = {
  Category: string;
  Range: Rangex;
};

type Rangex = {
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
  Code: string; // 集計対象のコード
  HistoricalSetting: HistoricalSetting;
  CalculationSetting: CalculationSetting;
  ViewSetting: ViewSetting;
}

interface HistoricalSetting {
  Category: string; // 取得種別
  Range: Range;
}
interface Range {
  DateFrom: string; // 開始日
  DateTo: string; // 終了日
  Days: string; // 日数
  SQ: SQ;
}

interface SQ {
  LargeSQ: string; // L-SQ日
  SmallSQ: string; // S-SQ日
  WeeklySQ: string; // W-SQ日
}

interface CalculationSetting {
  Category: string; // 算出間隔
  Range: CalculationRange;
  Individual: IndividualCalculation;
}

interface CalculationRange {
  TimeFrom: string; // 開始時刻
  TimeTo: string; // 終了時刻
  Minutes: string; // 分数
}
interface IndividualCalculation {
  AM: TimeSetting;
  PM: TimeSetting;
  Evening: TimeSetting;
}

interface TimeSetting {
  OpenTick: string; // 寄付
  CloseTick: string; // 引け
}

interface ViewSetting {
  MostVolumeAndPriceType: string; // 時間帯別最多出来高・価格の優先表示（高値、安値）の指定
  PercentageOfDayType: string; // 当日出来高分布を百分率で表示の指定
}

interface ViewSettings {
  Layout: number; // レイアウト切り替えボタン
  SettingSwitch: boolean; // 条件設定切り替え
  Tab: number; // ボリュームカーブタブ, ヒストリカルタブ
  HighLow: string; // 優先表示 高値/安値
  Glaph: string; // 並ベて表示/重ねて表示
  CheckboxStates: boolean[]; // 改为数组
  Colors: string[]; // 改为数组
};