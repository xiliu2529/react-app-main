
export interface ChartData {
    timeLabels: string[];
    todayDistribution: { y: number; color: string }[];
    todayCumulative: { y: number; color: string }[];
    closePrice: { y: number; color: string }[];
    historicalDistribution: { y: number; color: string }[];
    historicalCumulative: { y: number; color: string }[];
    timeLabels1: string[];
    todayDistribution1: { y: number; color: string }[];
    todayCumulative1: { y: number; color: string }[];
    closePrice1: { y: number; color: string }[];
    historicalDistribution1: { y: number; color: string }[];
    historicalCumulative1: { y: number; color: string }[];
    timeLabels2: string[];
    todayDistribution2: { y: number; color: string }[];
    todayCumulative2: { y: number; color: string }[];
    closePrice2: { y: number; color: string }[];
    historicalDistribution2: { y: number; color: string }[];
    historicalCumulative2: { y: number; color: string }[];
  }
  
  export interface ChartState {
    xAxisLabels: string[];
    todayDistribution: { y: number; color: string }[];
    todayCumulative: { y: number; color: string }[];
    historicalDistribution: { y: number; color: string }[];
    historicalCumulative: { y: number; color: string }[];
    ClosePrice: { y: number; color: string }[];
  }
  
  export type ChartDatax = {
    Distribution: string;
    Cumulative: string;
    ClosePrice?: string;
  };
  
  export type TimeFrameData = {
    AverageDaysChart?: ChartDatax;
    TodayChart?: ChartDatax;
  };
  
  export type TimeFrames = {
    [key: string]: TimeFrameData;
  };
  
  export type TickFrame = {
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
  