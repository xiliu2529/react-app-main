type ChartData = {
    Distribution: string;
    Cumulative: string;
    ClosePrice?: string;
    TodayChart?:string;
};

type TickFrame = {
    [key: string]: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
};

type Data = {
    EveningOpenTickFrame?: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
    EveningTickFrame?: TickFrame;
    EveningCloseTickFrame?: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
    AMOpenTickFrame: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
    AMTickFrame: TickFrame;
    AMCloseTickFrame: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
    PMOpenTickFrame: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
    PMTickFrame: TickFrame;
    PMCloseTickFrame: {
        AverageDaysChart: ChartData;
        TodayChart: ChartData;
    };
};
