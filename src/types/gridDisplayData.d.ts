type DataPoint = {
    Volume: string;
    Distribution: string;
    Cumulative: string;
    Difference?: string;
};

type MostVolumeAndPrice = {
    Price: string;
    Volume: string;
};

type TimeFrameData = {
    AverageDaysData: DataPoint;
    TodayData: DataPoint;
    MostVolumeAndPrice: MostVolumeAndPrice;
    CloseVWAP: string;
};

type TimeFrames = {
    [key: string]: TimeFrameData;
};

type GridDisplayData = {
    TotalFrame?: TimeFrameData;
    EveningOpenTickFrame?: TimeFrameData;
    EveningTickFrame?: TimeFrames;
    EveningCloseTickFrame?: TimeFrameData;
    EveningCloseSessionFrame?: TimeFrameData;
    AMOpenTickFrame?: TimeFrameData;
    AMTickFrame?: TimeFrames;
    AMCloseTickFrame?: TimeFrameData;
    AMCloseSessionFrame?: TimeFrameData;
    PMOpenTickFrame?: TimeFrameData;
    PMTickFrame?: TimeFrames;
    PMCloseTickFrame?: TimeFrameData;
    PMCloseSessionFrame?: TimeFrameData;
};

