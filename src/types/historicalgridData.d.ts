type DateFrame = {
  Volume?: string;
  Distribution?: string;
};

type TickFrame = {
  [key: string]: DateFrame;
};

type DailyData = {
  TotalFrame?: DateFrame;
  AMOpenTickFrame?: DateFrame;
  AMTickFrame?: {
    [key: string]: DateFrame;
  };
  AMCloseTickFrame?: DateFrame;
  PMOpenTickFrame?: DateFrame;
  PMTickFrame?: {
    [key: string]: DateFrame;
  };
  PMCloseTickFrame?: DateFrame;
};

type HistoricalData = {
  [date: string]: DailyData;
};