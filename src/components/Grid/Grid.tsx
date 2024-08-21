import * as React from 'react';
import { Grid, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow } from '@mui/material';
import './Grid.css';
import { useMyContext } from '../../contexts/MyContext';
import a from '../../data/601.1/data2.json';
import b from '../../data/101.1/data2.json';
import c from '../../data/data2.json';
import d from '../../data/data1.json';
import d1 from '../../data/101.1/data1.json';
import d2 from '../../data/601.1/data1.json';
import { useRef } from 'react';

interface AverageDay {
  Date: string;
  TotalVolume: string;
  HighLowMark: string;
  SQMark: string;
}

interface Data {
  QuoteCode: string;
  AbbreviatedName: string;
  MarketName: string;
  ListedSection: string;
  Today: string;
  AverageDays: AverageDay[];
}

const Grids: React.FC = () => {
  const { settingsState, requestPayload, conditionSettingState, griddownload, buttonName } = useMyContext();
  const isInitialized = useRef(false);
  const [shouldDownload, setShouldDownload] = React.useState(false);
  let data2: GridDisplayData = {
  }
  let data1: Data = {
    QuoteCode: '',
    AbbreviatedName: '',
    MarketName: '',
    ListedSection: '',
    Today: '',
    AverageDays: []
  };
  if (requestPayload.Code === '6501') {
    data2 = c;
    data1 = d;
  } else if (requestPayload.Code === '101.1') {
    data2 = b;
    data1 = d1;
  } else if (requestPayload.Code === '601.1') {
    data2 = a;
    data1 = d2;
  }

  const dates = data1.AverageDays.map(item => item.Date);
  const count = dates.length;
  const formatDate = (date: string) => {
    const [_year, month, day] = date.split('/');
    return `${month}/${day}`;
  };
  const startDate = dates.length > 0 ? formatDate(dates[dates.length - 1]) : '';
  const endDate = dates.length > 0 ? formatDate(dates[0]) : '';

  const displayText = count > 0 ? `${count}日平均(${startDate}-${endDate})` : '';

  const TableRowComponent = ({ data, label }: { data: any; label: string }) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    if (settingsState.checkboxStates[2] && !settingsState.checkboxStates[0] &&
      (label == 'イブニング合計' || label == '前場合計' || label == '後場合計')
    ) {
      dataCopy.TodayData.Volume = '-'
    } else {
    }
    return (
      <TableRow>
        <TableCell className="table-body-cell-a">{label}</TableCell>
        <TableCell className={`table-body-cell ${data.AverageDaysData.Volume == "-" ? 'center-align' : ''}`}>{data.AverageDaysData.Volume}</TableCell>
        <TableCell className={`table-body-cell ${data.AverageDaysData.Distribution == "-" ? 'center-align' : ''}`}>{data.AverageDaysData.Distribution}</TableCell>
        <TableCell className={`table-body-cell ${data.AverageDaysData.Cumulative == "-" ? 'center-align' : ''}`}>{data.AverageDaysData.Cumulative}</TableCell>
        <TableCell className={`table-body-cell ${dataCopy.TodayData.Volume == "-" ? 'center-align' : ''}`}>{dataCopy.TodayData.Volume}</TableCell>
        <TableCell className={`table-body-cell ${data.TodayData.Distribution == "-" ? 'center-align' : ''}`}>{data.TodayData.Distribution}</TableCell>
        <TableCell className={`table-body-cell ${data.TodayData.Cumulative == "-" ? 'center-align' : ''}`}>{data.TodayData.Cumulative}</TableCell>
        <TableCell className={`table-body-cell ${data.TodayData.Difference == "-" ? 'center-align' : ''}`}>{data.TodayData.Difference}</TableCell>
        <TableCell className={`table-body-cell ${data.MostVolumeAndPrice.Price == "-" ? 'center-align' : ''}`}>{data.MostVolumeAndPrice.Price}</TableCell>
        <TableCell className={`table-body-cell ${data.MostVolumeAndPrice.Volume == "-" ? 'center-align' : ''}`}>{data.MostVolumeAndPrice.Volume}</TableCell>
        <TableCell className={`table-body-cell ${data.CloseVWAP == "-" ? 'center-align' : ''}`}>{data.CloseVWAP}</TableCell>
      </TableRow>
    )
  };
  React.useEffect(() => {
    if (settingsState) {


      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
      document.documentElement.style.setProperty('--hide-last-column', settingsState.checkboxStates[2] ? 'table-cell' : 'none');
      document.documentElement.style.setProperty('--hide-last-columns', settingsState.checkboxStates[1] ? 'table-cell' : 'none');
      document.documentElement.style.setProperty('--filter-brightness', settingsState.checkboxStates[1] ? 'none' : 'brightness(90%)');
    }
  }, [settingsState]);
  const headerTexts = ['時間', '出来高', '分布', '累計', '出来高', '分布', '累計', '差', '価格', '出来高', '場引けVWAP'];

  const exportTableToCSV = () => {
    const headers = ['', displayText, '', '', data1.Today, '', '', '', '時間帯別最多出来高·価格'];
    const wrapValue = (value: string | number) => {
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    };
    const csvRows: string[] = [];
    csvRows.push(headers.join(','));
    csvRows.push(headerTexts.join(','));
    const totalRow = [
      '合計',
      wrapValue(data2.TotalFrame!.AverageDaysData.Volume),
      wrapValue(data2.TotalFrame!.AverageDaysData.Cumulative),
      wrapValue(data2.TotalFrame!.AverageDaysData.Distribution),
      wrapValue(data2.TotalFrame!.TodayData.Volume),
      wrapValue(data2.TotalFrame!.TodayData.Distribution),
      wrapValue(data2.TotalFrame!.TodayData.Cumulative),
      wrapValue(data2.TotalFrame!.TodayData.Difference!),
      wrapValue(data2.TotalFrame!.MostVolumeAndPrice.Price),
      wrapValue(data2.TotalFrame!.MostVolumeAndPrice.Volume),
      wrapValue(data2.TotalFrame!.CloseVWAP)
    ];
    csvRows.push(totalRow.join(','));
    const addRow = (label: string, data: any) => {
      const row = [
        label,
        wrapValue(data.AverageDaysData.Volume),
        wrapValue(data.AverageDaysData.Distribution),
        wrapValue(data.AverageDaysData.Cumulative),
        wrapValue(data.TodayData.Volume),
        wrapValue(data.TodayData.Distribution),
        wrapValue(data.TodayData.Cumulative),
        wrapValue(data.TodayData.Difference),
        wrapValue(data.MostVolumeAndPrice.Price),
        wrapValue(data.MostVolumeAndPrice.Volume),
        wrapValue(data.CloseVWAP)
      ];
      csvRows.push(row.join(','));
    };

    if (conditionSettingState.marketState.eveningOpening && data2.EveningOpenTickFrame) {
      addRow('寄付', data2.EveningOpenTickFrame);
    }
    if (data2.EveningTickFrame) {
      Object.entries(data2.EveningTickFrame!).forEach(([key, value]) => addRow(key, value));
    }

    if (conditionSettingState.marketState.eveningClose && data2.EveningCloseTickFrame) {
      addRow('引け', data2.EveningCloseTickFrame);
    }

    if (data2.EveningCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('イブニング合計', data2.EveningCloseSessionFrame);
    }
    if (conditionSettingState.marketState.preMarketOpening && data2.AMOpenTickFrame) {
      addRow('寄付', data2.AMOpenTickFrame);
    }
    if (data2.AMTickFrame) {
      Object.entries(data2.AMTickFrame!).forEach(([key, value]) => addRow(key, value));
    }
    if (conditionSettingState.marketState.preMarketClose && data2.AMCloseTickFrame) {
      addRow('引け', data2.AMCloseTickFrame);
    }
    if (data2.AMCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('前場合計', data2.AMCloseSessionFrame);
    }
    if (conditionSettingState.marketState.postMarketOpening && data2.PMOpenTickFrame) {
      addRow('寄付', data2.PMOpenTickFrame);
    }
    if (data2.PMTickFrame) {
      Object.entries(data2.PMTickFrame!).forEach(([key, value]) => addRow(key, value));
    }
    if (conditionSettingState.marketState.postMarketClose && data2.PMCloseTickFrame) {
      addRow('引け', data2.PMCloseTickFrame);
    }
    if (data2.PMCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('後場合計', data2.PMCloseSessionFrame);
    }

    return csvRows.join('\n');
  };
  React.useEffect(() => {
    if (isInitialized.current) {
      setShouldDownload(true);
    }
  }, []);
  React.useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    if (shouldDownload && data2.TotalFrame !== undefined && [1, 2, 3, 4, 7, 8].includes(buttonName)) {
      downloadCSV('grid-data.csv');
    }
  }, [griddownload]);

  const downloadCSV = (filename: string) => {
    const csvData = exportTableToCSV();
  
    // Ensure the CSV data is encoded in UTF-8 and prepend a BOM (Byte Order Mark)
    const bom = '\uFEFF'; // BOM for UTF-8
    const csvContent = bom + csvData;
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  
    // Cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <Box className='grid-container'>
      <Grid container direction="column" spacing={0}>
        <Box className='grid-container-div' />
        <Grid item>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className='table-title'> </TableCell>
                  <TableCell className='table-title' colSpan={3}>
                    {count == 0 ? null : displayText}
                  </TableCell>
                  <TableCell className='table-title' colSpan={2}>
                    {data1.Today}
                  </TableCell>
                  <TableCell className='table-title'></TableCell>
                  <TableCell className='table-title'></TableCell>
                  <TableCell className='table-title' colSpan={2} id='table-title-right'>
                    時間帯別最多出来高·価格
                  </TableCell>
                </TableRow>
                <TableRow>
                  {headerTexts.map((text, index) => (
                    <TableCell
                      key={index}
                      className={`table-head-cell ${text === '出来高' ? 'highlight-cell' : ''}`}
                    >
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="table-body-cell-a">合計</TableCell>
                  {data2.TotalFrame ? [
                    data2.TotalFrame.AverageDaysData.Volume,
                    data2.TotalFrame.AverageDaysData.Distribution,
                    data2.TotalFrame.AverageDaysData.Cumulative,
                    data2.TotalFrame.TodayData.Volume,
                    data2.TotalFrame.TodayData.Distribution,
                    data2.TotalFrame.TodayData.Cumulative,
                    data2.TotalFrame.TodayData.Difference,
                    data2.TotalFrame.MostVolumeAndPrice.Price,
                    data2.TotalFrame.MostVolumeAndPrice.Volume,
                    data2.TotalFrame.CloseVWAP
                  ].map((item, index) => (
                    <TableCell
                      key={index}
                      className={`table-body-cell ${item == "-" ? 'center-align' : ''}`}
                    >
                      {item}
                    </TableCell>
                  )) : null}
                </TableRow>

                {conditionSettingState.marketState.eveningOpening && data2.EveningOpenTickFrame && (
                  <TableRowComponent data={data2.EveningOpenTickFrame} label="寄付" />
                )}
                {data2.EveningTickFrame && Object.entries(data2.EveningTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.eveningClose && data2.EveningCloseTickFrame && (
                  <TableRowComponent data={data2.EveningCloseTickFrame} label="引け" />
                )}
                {data2.EveningCloseSessionFrame && (
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) &&
                  <TableRowComponent data={data2.EveningCloseSessionFrame} label="イブニング合計" />
                )}
                {conditionSettingState.marketState.preMarketOpening && data2.AMOpenTickFrame && (
                  <TableRowComponent data={data2.AMOpenTickFrame} label="寄付" />

                )}
                {data2.AMTickFrame && Object.entries(data2.AMTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.preMarketClose && data2.AMCloseTickFrame && (
                  <TableRowComponent data={data2.AMCloseTickFrame} label="引け" />
                )}
                {data2.AMCloseSessionFrame &&
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) && (
                    <TableRowComponent data={data2.AMCloseSessionFrame} label="前場合計" />
                  )}
                {conditionSettingState.marketState.postMarketOpening && data2.PMOpenTickFrame && (
                  <TableRowComponent data={data2.PMOpenTickFrame} label="寄付" />
                )}
                {data2.PMTickFrame && Object.entries(data2.PMTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.postMarketClose && data2.PMCloseTickFrame && (
                  <TableRowComponent data={data2.PMCloseTickFrame} label="引け" />
                )}
                {data2.PMCloseSessionFrame &&
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) && (
                    <TableRowComponent data={data2.PMCloseSessionFrame} label="後場合計" />
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>

  );
};

export default Grids;

