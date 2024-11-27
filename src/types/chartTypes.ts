export interface ChartData {
  timeLabels: string[];
  todayDistribution: { y: number|null; color: string }[];
  todayCumulative: { y: number|null; color: string }[];
  closePrice: { y: number|null; color: string }[];
  historicalDistribution: { y: number|null; color: string }[];
  historicalCumulative: { y: number|null; color: string }[];
  timeLabels1: string[];
  todayDistribution1: { y: number|null; color: string }[];
  todayCumulative1: { y: number|null; color: string }[];
  closePrice1: { y: number|null; color: string }[];
  historicalDistribution1: { y: number|null; color: string }[];
  historicalCumulative1: { y: number|null; color: string }[];
  timeLabels2: string[];
  todayDistribution2: { y: number|null; color: string }[];
  todayCumulative2: { y: number|null; color: string }[];
  closePrice2: { y: number|null; color: string }[];
  historicalDistribution2: { y: number|null; color: string }[];
  historicalCumulative2: { y: number|null; color: string }[];
}

export interface ChartState {
  xAxisLabels: string[];
  todayDistribution: { y: number|null; color: string }[];
  todayCumulative: { y: number|null; color: string }[];
  historicalDistribution: { y: number|null; color: string }[];
  historicalCumulative: { y: number|null; color: string }[];
  ClosePrice: { y: number|null; color: string }[];
}

type ChartDatax = {
  Distribution: string;
  Cumulative: string;
  ClosePrice?: string; 
};

export type TimeFrameData = {
  AverageDaysData?: ChartDatax;
  TodayData?: ChartDatax;
};

export type TimeFrames = {
  [key: string]: TimeFrameData;
};

export type AxisInfo = {
  AverageDaysData: {
    MaxDistribution: string;
    MaxCumulative: string;
  };
  TodayData: {
    MaxDistribution: string;
    MaxCumulative: string;
  };
};

export type TickFrame = {
  AxisInfo?: AxisInfo; 
  EveningOpenTickFrame?: TimeFrameData;
  EveningTickFrame?: TimeFrames;
  EveningCloseTickFrame?: TimeFrameData;
  AMOpenTickFrame?: TimeFrameData;
  AMTickFrame?: TimeFrames;
  AMCloseTickFrame?: TimeFrameData;
  PMOpenTickFrame?: TimeFrameData;
  PMTickFrame?: TimeFrames;
  PMCloseTickFrame?: TimeFrameData;
};