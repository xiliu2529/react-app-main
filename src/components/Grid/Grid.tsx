import * as React from 'react';
import { Grid, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow } from '@mui/material';
import './Grid.css';
import { useMyContext } from '../../contexts/MyContext';
import { Data } from '../../types/grid';
import { useRef, useEffect, useState } from 'react';

const Grids: React.FC = () => {
  const { clearData, ViewSettings, response, QvVolumeCurveDatajson, QvTotalingInfojson, settingsState, conditionSettingState, griddownload, buttonName, shouldDownload, setShouldDownload } = useMyContext();
  const isInitialized = useRef(false);
  const [QvVolumeCurveData, setQvVolumeCurveData] = useState<GridDisplayData>({});
  const [QvTotalingInfo, setQvTotalingInfo] = useState<Data>({
    QuoteCode: '',
    AbbreviatedName: '',
    MarketName: '',
    ListedSection: '',
    Today: '',
    CalculationDateTime: "",
    AverageDays: []
  });
  useEffect(() => {
    if (response) {
      setQvVolumeCurveData(QvVolumeCurveDatajson);
      setQvTotalingInfo(QvTotalingInfojson);
    }

  }, [QvVolumeCurveDatajson, QvTotalingInfojson]);

  useEffect(() => {
    if (clearData) {
      setQvVolumeCurveData({});
      setQvTotalingInfo({
        QuoteCode: '',
        AbbreviatedName: '',
        MarketName: '',
        ListedSection: '',
        Today: '',
        CalculationDateTime: "",
        AverageDays: []
      });
    }else{
      setQvVolumeCurveData(QvVolumeCurveDatajson);
      setQvTotalingInfo(QvTotalingInfojson);
    }
  }, [clearData]);

  const dates = QvTotalingInfo.AverageDays.map(item => item.Date);
  const count = dates.length;
  const formatDate = (date: string) => {
    const [_year, month, day] = date.split('/');
    return `${month}/${day}`;
  };
  const startDate = dates.length > 0 ? formatDate(dates[dates.length - 1]) : '';
  const endDate = dates.length > 0 ? formatDate(dates[0]) : '';
  let displayText;
  if (count === 1) {
    displayText = dates[0];
  } else {
    displayText = count > 0 ? `${count}日平均(${startDate}-${endDate})` : '';
  }

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

  const exportTableToCSV = () => {
    let headers = ['', displayText, '', '', QvTotalingInfo.Today, '', '', '', '時間帯別最多出来高·価格'];
    if (!ViewSettings.CheckboxStates[1]) {
      headers = ['', displayText, '', '', QvTotalingInfo.Today, '', '', '',];
    }
    const wrapValue = (value: string | number) => {
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    };
    const csvRows: string[] = [];
    csvRows.push(headers.join(','));
    const headerTexts = ['時間', '出来高', '分布', '累計', '出来高', '分布', '累計', '差', '価格', '出来高', '場引けVWAP'];

    if (!ViewSettings.CheckboxStates[1]) {
      headerTexts.splice(8, 2);
    }

    if (!ViewSettings.CheckboxStates[2]) {
      headerTexts.splice(-1, 1);
    }
    csvRows.push(headerTexts.join(','));


    let totalRow = [
      '合計',
      wrapValue(QvVolumeCurveData.TotalFrame!.AverageDaysData.Volume),
      wrapValue(QvVolumeCurveData.TotalFrame!.AverageDaysData.Distribution),
      wrapValue(QvVolumeCurveData.TotalFrame!.AverageDaysData.Cumulative),
      wrapValue(QvVolumeCurveData.TotalFrame!.TodayData.Volume),
      wrapValue(QvVolumeCurveData.TotalFrame!.TodayData.Distribution),
      wrapValue(QvVolumeCurveData.TotalFrame!.TodayData.Cumulative),
      wrapValue(QvVolumeCurveData.TotalFrame!.TodayData.Difference!),
      wrapValue(QvVolumeCurveData.TotalFrame!.MostVolumeAndPrice.Price),
      wrapValue(QvVolumeCurveData.TotalFrame!.MostVolumeAndPrice.Volume),
      wrapValue(QvVolumeCurveData.TotalFrame!.CloseVWAP)
    ];

    if (!ViewSettings.CheckboxStates[1]) {
      totalRow.splice(8, 2);
    }

    if (!ViewSettings.CheckboxStates[2]) {
      totalRow.splice(-1, 1);
    }
    csvRows.push(totalRow.join(','));
    const addRow = (label: string, data: any) => {

      let row = [
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

      if (!ViewSettings.CheckboxStates[1]) {
        row.splice(8, 2);
      }

      if (!ViewSettings.CheckboxStates[2]) {
        row.splice(-1, 1);
      }
      csvRows.push(row.join(','));
    };

    if (conditionSettingState.marketState.eveningOpening && QvVolumeCurveData.EveningOpenTickFrame) {
      addRow('寄付', QvVolumeCurveData.EveningOpenTickFrame);
    }
    if (QvVolumeCurveData.EveningTickFrame) {
      Object.entries(QvVolumeCurveData.EveningTickFrame!).forEach(([key, value]) => addRow(key, value));
    }
    if (conditionSettingState.marketState.eveningClose && QvVolumeCurveData.EveningCloseTickFrame) {
      addRow('引け', QvVolumeCurveData.EveningCloseTickFrame);
    }
    if (QvVolumeCurveData.EveningCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('イブニング合計', QvVolumeCurveData.EveningCloseSessionFrame);
    }
    if (conditionSettingState.marketState.preMarketOpening && QvVolumeCurveData.AMOpenTickFrame) {
      addRow('寄付', QvVolumeCurveData.AMOpenTickFrame);
    }
    if (QvVolumeCurveData.AMTickFrame) {
      Object.entries(QvVolumeCurveData.AMTickFrame!).forEach(([key, value]) => addRow(key, value));
    }
    if (conditionSettingState.marketState.preMarketClose && QvVolumeCurveData.AMCloseTickFrame) {
      addRow('引け', QvVolumeCurveData.AMCloseTickFrame);
    }
    if (QvVolumeCurveData.AMCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('前場合計', QvVolumeCurveData.AMCloseSessionFrame);
    }
    if (conditionSettingState.marketState.postMarketOpening && QvVolumeCurveData.PMOpenTickFrame) {
      addRow('寄付', QvVolumeCurveData.PMOpenTickFrame);
    }
    if (QvVolumeCurveData.PMTickFrame) {
      Object.entries(QvVolumeCurveData.PMTickFrame!).forEach(([key, value]) => addRow(key, value));
    }
    if (conditionSettingState.marketState.postMarketClose && QvVolumeCurveData.PMCloseTickFrame) {
      addRow('引け', QvVolumeCurveData.PMCloseTickFrame);
    }
    if (QvVolumeCurveData.PMCloseSessionFrame && (settingsState.checkboxStates[0] || settingsState.checkboxStates[2])) {
      addRow('後場合計', QvVolumeCurveData.PMCloseSessionFrame);
    }
    return csvRows.join('\n');
  };

  const downloadCSV = (filename: string) => {
    let csvData = exportTableToCSV();
    const bom = '\uFEFF';
    const csvContent = bom + csvData;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
    setShouldDownload(false);
  };

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    if (shouldDownload && QvVolumeCurveData.TotalFrame !== undefined && [1, 2, 3, 4, 7, 8].includes(buttonName)) {
      downloadCSV('grid-data.csv');
    }
  }, [griddownload]);

  useEffect(() => {
    if (settingsState) {
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
      document.documentElement.style.setProperty('--hide-last-column', settingsState.checkboxStates[2] ? 'table-cell' : 'none');
      document.documentElement.style.setProperty('--hide-last-columns', settingsState.checkboxStates[1] ? 'table-cell' : 'none');
      document.documentElement.style.setProperty('--filter-brightness', settingsState.checkboxStates[1] ? 'none' : 'brightness(90%)');
    }
  }, [settingsState]);
  const headerTexts = ['時間', '出来高', '分布', '累計', '出来高', '分布', '累計', '差', '価格', '出来高', '場引けVWAP'];

  return (
    <Box className='grid-container'>
      <Grid container direction="column" spacing={0} >
        <Grid item >
          <TableContainer className="table-container">
            <Table>
              <TableHead className='Tablehead'>
                <TableRow>
                  <TableCell className='table-title'> </TableCell>
                  <TableCell className='table-title' colSpan={3}>
                    {count === 0 ? null : displayText}
                  </TableCell>
                  <TableCell className='table-title' colSpan={2}>
                    {QvTotalingInfo.Today}
                  </TableCell>
                  <TableCell className='table-title'></TableCell>
                  <TableCell className='table-title'></TableCell>
                  <TableCell className='table-title' colSpan={2} id='table-title-right'>
                    時間帯別最多出来高·価格
                  </TableCell>
                  <TableCell className='table-title'></TableCell>
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
                  {QvVolumeCurveData.TotalFrame ? [
                    QvVolumeCurveData.TotalFrame.AverageDaysData.Volume,
                    QvVolumeCurveData.TotalFrame.AverageDaysData.Distribution,
                    QvVolumeCurveData.TotalFrame.AverageDaysData.Cumulative,
                    QvVolumeCurveData.TotalFrame.TodayData.Volume,
                    QvVolumeCurveData.TotalFrame.TodayData.Distribution,
                    QvVolumeCurveData.TotalFrame.TodayData.Cumulative,
                    QvVolumeCurveData.TotalFrame.TodayData.Difference,
                    QvVolumeCurveData.TotalFrame.MostVolumeAndPrice.Price,
                    QvVolumeCurveData.TotalFrame.MostVolumeAndPrice.Volume,
                    QvVolumeCurveData.TotalFrame.CloseVWAP
                  ].map((item, index) => (
                    <TableCell
                      key={index}
                      className={`table-body-cell ${item == "-" ? 'center-align' : ''}`}
                    >
                      {item}
                    </TableCell>
                  )) : null}
                </TableRow>
                {conditionSettingState.marketState.eveningOpening && QvVolumeCurveData.EveningOpenTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.EveningOpenTickFrame} label="寄付" />
                )}
                {QvVolumeCurveData.EveningTickFrame && Object.entries(QvVolumeCurveData.EveningTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.eveningClose && QvVolumeCurveData.EveningCloseTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.EveningCloseTickFrame} label="引け" />
                )}
                {QvVolumeCurveData.EveningCloseSessionFrame && (
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) &&
                  <TableRowComponent data={QvVolumeCurveData.EveningCloseSessionFrame} label="イブニング合計" />
                )}
                {conditionSettingState.marketState.preMarketOpening && QvVolumeCurveData.AMOpenTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.AMOpenTickFrame} label="寄付" />

                )}
                {QvVolumeCurveData.AMTickFrame && Object.entries(QvVolumeCurveData.AMTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.preMarketClose && QvVolumeCurveData.AMCloseTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.AMCloseTickFrame} label="引け" />
                )}
                {QvVolumeCurveData.AMCloseSessionFrame &&
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) && (
                    <TableRowComponent data={QvVolumeCurveData.AMCloseSessionFrame} label="前場合計" />
                  )}
                {conditionSettingState.marketState.postMarketOpening && QvVolumeCurveData.PMOpenTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.PMOpenTickFrame} label="寄付" />
                )}
                {QvVolumeCurveData.PMTickFrame && Object.entries(QvVolumeCurveData.PMTickFrame).map(([key, value], index) => (
                  <TableRowComponent key={index} data={value} label={key} />
                ))}
                {conditionSettingState.marketState.postMarketClose && QvVolumeCurveData.PMCloseTickFrame && (
                  <TableRowComponent data={QvVolumeCurveData.PMCloseTickFrame} label="引け" />
                )}
                {QvVolumeCurveData.PMCloseSessionFrame &&
                  (settingsState.checkboxStates[0] || settingsState.checkboxStates[2]) && (
                    <TableRowComponent data={QvVolumeCurveData.PMCloseSessionFrame} label="後場合計" />
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