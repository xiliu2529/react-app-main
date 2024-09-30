
export interface AverageDay {
    Date: string;
    TotalVolume: string;
    HighLowMark: string;
    SQMark: string;
  }
  
  export interface Data {
    QuoteCode: string;
    AbbreviatedName: string;
    MarketName: string;
    ListedSection: string;
    Today: string;
    CalculationDateTime: string,
    AverageDays: AverageDay[];
  }