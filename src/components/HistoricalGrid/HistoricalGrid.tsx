import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Box } from '@mui/material';
import './HistoricalGrid.css';
import { useMyContext } from '../../contexts/MyContext';
import { useEffect, useRef } from 'react';
// import a from '../../../src/data/data4.json';
// import b from '../../../src/data/101.1/data4.json';
// import c from '../../../src/data/601.1/data4.json';
import Papa from 'papaparse';

interface TickFrameData {
  Volume: string;
  Distribution: string;
}
type QvHistoricalDataType = {
  [date: string]: {
    TotalFrame?: {
      Volume: string;
      Distribution: string;
    };
    EveningOpenTickFrame?: any;
    EveningCloseTickFrame?: any;
    PMOpenTickFrame?: any;
    PMTickFrame?: any;
    PMCloseTickFrame?: any;

  };
};

const HistoricalGrid: React.FC = () => {
  const {QvHistoricalDatajson, settingsState, conditionSettingState, griddownload, buttonName, shouldDownload, setShouldDownload } = useMyContext();
  const isInitialized = useRef(false);

  let QvHistoricalData: QvHistoricalDataType = {};
  useEffect(() => {
    QvHistoricalData = QvHistoricalDatajson
  }, [QvHistoricalDatajson]);


  // if (response) {
  //   if (requestPayload.Code === '6501') {
  //     QvHistoricalData = a;
  //   } else if (requestPayload.Code === '101.1') {
  //     QvHistoricalData = b;
  //   } else if (requestPayload.Code === '601.1') {
  //     QvHistoricalData = c;
  //   }
  // }

  const historicalDates = Object.keys(QvHistoricalData);




  const extractDates = (jsonData: any) => Object.keys(jsonData);
  const extractTotalFrame = (data: QvHistoricalDataType) =>
    Object.entries(data).map(([date, dayData]) => ({
      date,
      volume: dayData.TotalFrame?.Volume || '-',
      distribution: dayData.TotalFrame?.Distribution || '-',
    }));

  const extractTimeSlots = (data: QvHistoricalDataType, frameType: string) => {
    const timeSlotsSet = new Set<string>();

    Object.values(data).forEach(dayData => {
      // @ts-ignore
      const frameData = dayData[frameType] as Record<string, TickFrameData> | undefined;
      if (frameData) {
        Object.keys(frameData).forEach(timeSlot => {
          timeSlotsSet.add(timeSlot);
        });
      }
    });
    return Array.from(timeSlotsSet);
  };

  const getTimeSlotData = (timeSlot: string, frameType: any) =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const timeSlotData = QvHistoricalData[date]?.[frameType]?.[timeSlot] || {};
      return {
        volume: timeSlotData.Volume || '-',
        distribution: timeSlotData.Distribution || '-',
      };
    });

  const getEveningOpenTickFrame = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.EveningOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getAMOpenTickFrameData = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.AMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
    
  const getPMOpenTickFrameData = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.PMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getAMCloseTickFrameData = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.AMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getEveningCloseTickFrame = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.EveningCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getPMCloseTickFrameData = () =>
    extractDates(QvHistoricalData).map(date => {
      // @ts-ignore
      const data = QvHistoricalData[date]?.PMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const dates = extractDates(QvHistoricalData);
  const totalFrame = extractTotalFrame(QvHistoricalData);
  const timeSlots = extractTimeSlots(QvHistoricalData, 'EveningTickFrame');
  const timeSlots1 = extractTimeSlots(QvHistoricalData, 'AMTickFrame');
  const timeSlots2 = extractTimeSlots(QvHistoricalData, 'PMTickFrame');
  const renderTimeSlotRows = (slots: string[], frameType: any) =>
    slots.map((timeSlot, index) => (
      <TableRow key={index}>
        <TableCell className="custom-table-cell">{timeSlot}</TableCell>
        {getTimeSlotData(timeSlot, frameType).map((data, i) => (
          <React.Fragment key={i}>
            <TableCell className={`custom-table-cell-a ${data.volume == "-" ? 'center-align' : ''}`}>{data.volume}</TableCell>
            <TableCell className={`custom-table-cell-a ${data.distribution == "-" ? 'center-align' : ''}`}>{data.distribution}</TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    ));

  const extractTableData = () => {
    const rows: any[] = [];
    rows.push(['', ...dates.flatMap(date => [`${date}`, `${date}`])]);
    rows.push(['時間', ...dates.flatMap(_date => [`出来高`, `分布`])]);
    const totalFrameRow = ['合計', ...totalFrame.flatMap(item => [item.volume, item.distribution])];
    rows.push(totalFrameRow);
    const addTimeSlotRows = (slots: string[], frameType: string) => {
      slots.forEach(timeSlot => {
        const row = [timeSlot, ...getTimeSlotData(timeSlot, frameType).flatMap(item => [item.volume, item.distribution])];
        rows.push(row);
      });
    };
    if (conditionSettingState.marketState.eveningOpening && QvHistoricalData[historicalDates[0]]?.EveningOpenTickFrame) {
      const eveningOpenRow = ['寄付', ...getEveningOpenTickFrame().flatMap(item => [item.volume, item.distribution])];
      rows.push(eveningOpenRow);
    }
    // @ts-ignore
    if (QvHistoricalData[historicalDates[0]]?.EveningTickFrame) {
      addTimeSlotRows(timeSlots, 'EveningTickFrame');
    }
    if (conditionSettingState.marketState.eveningClose && QvHistoricalData[historicalDates[0]]?.EveningCloseTickFrame) {
      const eveningCloseRow = ['引け', ...getEveningCloseTickFrame().flatMap(item => [item.volume, item.distribution])];
      rows.push(eveningCloseRow);
    }
    // @ts-ignore
    if (conditionSettingState.marketState.preMarketOpening && QvHistoricalData[historicalDates[0]]?.AMOpenTickFrame) {
      const amOpenRow = ['寄付', ...getAMOpenTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(amOpenRow);
    }
    // @ts-ignore
    if (QvHistoricalData[historicalDates[0]]?.AMTickFrame) {
      addTimeSlotRows(timeSlots1, 'AMTickFrame');
    }
    // @ts-ignore
    if (conditionSettingState.marketState.preMarketClose && QvHistoricalData[historicalDates[0]]?.AMCloseTickFrame) {
      const amCloseRow = ['引け', ...getAMCloseTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(amCloseRow);
    }
    if (conditionSettingState.marketState.postMarketOpening && QvHistoricalData[historicalDates[0]]?.PMOpenTickFrame) {
      const pmOpenRow = ['寄付', ...getPMOpenTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(pmOpenRow);
    }
    if (QvHistoricalData[historicalDates[0]]?.PMTickFrame) {
      addTimeSlotRows(timeSlots2, 'PMTickFrame');
    }
    if (conditionSettingState.marketState.postMarketClose && QvHistoricalData[historicalDates[0]]?.PMCloseTickFrame) {
      const pmCloseRow = ['引け', ...getPMCloseTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(pmCloseRow);
    }
    return rows;
  };
  const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const bom = '\uFEFF';
    const csvWithBom = bom + csv;
    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setShouldDownload(false)
    }
  };

  useEffect(() => {
    if (settingsState) {
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    if (shouldDownload && [1, 2, 3, 4, 7, 8].includes(buttonName)) {
      downloadCSV(extractTableData(), 'grid-data.csv')
    }
  }, [griddownload]);



  return (
    <Box className='grid-container'>
      <Box className='grid-container-div' />
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="custom-header-cell"></TableCell>
                  {Object.keys(QvHistoricalData).length == 0 ? (
                    <>
                      <TableCell className="custom-header-cell"></TableCell>
                      <TableCell className="custom-header-cell"></TableCell>
                    </>
                  ) : (
                    dates.map((date, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-header-cell">{date}</TableCell>
                        <TableCell className="custom-header-cell"></TableCell>
                      </React.Fragment>
                    ))
                  )}

                </TableRow>
                <TableRow>
                  <TableCell className="custom-table-cell">時間</TableCell>
                  {Object.keys(QvHistoricalData).length == 0 ? (
                    <>
                      <TableCell className="custom-table-cell">出来高</TableCell>
                      <TableCell className="custom-table-cell">分布</TableCell>
                    </>
                  ) : (
                    dates.map((_, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell">出来高</TableCell>
                        <TableCell className="custom-table-cell">分布</TableCell>
                      </React.Fragment>
                    ))
                  )}


                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="custom-table-cell">合計</TableCell>
                  {totalFrame.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableCell className={`custom-table-cell-a ${item.volume == "-" ? 'center-align' : ''}`}>{item.volume}</TableCell>
                      <TableCell className={`custom-table-cell-a ${item.distribution == "-" ? 'center-align' : ''}`}>{item.distribution}</TableCell>

                    </React.Fragment>
                  ))}
                </TableRow>

                {conditionSettingState.marketState.eveningOpening && Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].EveningOpenTickFrame ?
                  <TableRow>
                    <TableCell className="custom-table-cell">寄付</TableCell>
                    {getEveningOpenTickFrame().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null}


                {Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].EveningOpenTickFrame ? renderTimeSlotRows(timeSlots, 'EveningTickFrame') : null}

                {conditionSettingState.marketState.eveningClose && Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].EveningCloseTickFrame ?
                  <TableRow>
                    <TableCell className="custom-table-cell">引け</TableCell>
                    {getEveningCloseTickFrame().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null
                }
                {conditionSettingState.marketState.preMarketOpening ?
                  <TableRow>
                    <TableCell className="custom-table-cell">寄付</TableCell>
                    {getAMOpenTickFrameData().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null}

                {renderTimeSlotRows(timeSlots1, 'AMTickFrame')}
                {conditionSettingState.marketState.preMarketClose ?
                  <TableRow>
                    <TableCell className="custom-table-cell">引け</TableCell>
                    {getAMCloseTickFrameData().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null
                }
                {conditionSettingState.marketState.postMarketOpening && Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].PMOpenTickFrame ?
                  <TableRow >
                    <TableCell className="custom-table-cell">寄付</TableCell>
                    {getPMOpenTickFrameData().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                  : null}
                {Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].PMTickFrame ? renderTimeSlotRows(timeSlots2, 'PMTickFrame') : null}
                {conditionSettingState.marketState.postMarketClose && Object.keys(QvHistoricalData).length != 0 && QvHistoricalData[historicalDates[0]].PMCloseTickFrame ?
                  <TableRow>
                    <TableCell className="custom-table-cell">引け</TableCell>
                    {getPMCloseTickFrameData().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box >
  );
};

export default HistoricalGrid;
