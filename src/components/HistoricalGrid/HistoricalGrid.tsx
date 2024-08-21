import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Box } from '@mui/material';
import './HistoricalGrid.css';
import { useMyContext } from '../../contexts/MyContext';
import { useEffect, useRef } from 'react';
import a from '../../../src/data/data4.json';
import b from '../../../src/data/101.1/data4.json';
import c from '../../../src/data//601.1/data4.json';
import Papa from 'papaparse';



interface TickFrameData {
  Volume: string;
  Distribution: string;
}



const HistoricalGrid: React.FC = () => {
  const { settingsState, conditionSettingState, requestPayload,griddownload ,buttonName} = useMyContext();
  const isInitialized = useRef(false);
  const [shouldDownload, setShouldDownload] = React.useState(false);
  type Data4Type = {
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

  let data4: Data4Type = {};
  if (requestPayload.Code === '6501') {
    data4 = a;
  } else if (requestPayload.Code === '101.1') {
    data4 = b;
  } else if (requestPayload.Code === '601.1') {
    data4 = c;
  }
  const dates1 = Object.keys(data4);

  useEffect(() => {
    if (settingsState) {
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);

  const extractDates = (jsonData: any) => Object.keys(jsonData);
  const extractTotalFrame = (data: Data4Type) =>
    Object.entries(data).map(([date, dayData]) => ({
      date,
      volume: dayData.TotalFrame?.Volume || '-',
      distribution: dayData.TotalFrame?.Distribution || '-',
    }));

  const extractTimeSlots = (data: Data4Type, frameType: string) => {
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
    extractDates(data4).map(date => {
      // @ts-ignore
      const timeSlotData = data4[date]?.[frameType]?.[timeSlot] || {};
      return {
        volume: timeSlotData.Volume || '-',
        distribution: timeSlotData.Distribution || '-',
      };
    });

  const getEveningOpenTickFrame = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.EveningOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getAMOpenTickFrameData = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.AMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getPMOpenTickFrameData = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.PMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getAMCloseTickFrameData = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.AMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getEveningCloseTickFrame = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.EveningCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getPMCloseTickFrameData = () =>
    extractDates(data4).map(date => {
      // @ts-ignore
      const data = data4[date]?.PMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const dates = extractDates(data4);
  const totalFrame = extractTotalFrame(data4);
  const timeSlots = extractTimeSlots(data4, 'EveningTickFrame');
  const timeSlots1 = extractTimeSlots(data4, 'AMTickFrame');
  const timeSlots2 = extractTimeSlots(data4, 'PMTickFrame');
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
    rows.push(['时间', ...dates.flatMap(_date => [`出来高`, `分布`])]);
    const totalFrameRow = ['合计', ...totalFrame.flatMap(item => [item.volume, item.distribution])];
    rows.push(totalFrameRow);
    const addTimeSlotRows = (slots: string[], frameType: string) => {
      slots.forEach(timeSlot => {
        const row = [timeSlot, ...getTimeSlotData(timeSlot, frameType).flatMap(item => [item.volume, item.distribution])];
        rows.push(row);
      });
    };
    if (conditionSettingState.marketState.eveningOpening && data4[dates1[0]]?.EveningOpenTickFrame) {
      const eveningOpenRow = ['寄付', ...getEveningOpenTickFrame().flatMap(item => [item.volume, item.distribution])];
      rows.push(eveningOpenRow);
    }
    // @ts-ignore
    if (data4[dates1[0]]?.EveningTickFrame) {
      addTimeSlotRows(timeSlots, 'EveningTickFrame');
    }
    if (conditionSettingState.marketState.eveningClose && data4[dates1[0]]?.EveningCloseTickFrame) {
      const eveningCloseRow = ['引け', ...getEveningCloseTickFrame().flatMap(item => [item.volume, item.distribution])];
      rows.push(eveningCloseRow);
    }
    // @ts-ignore
    if (conditionSettingState.marketState.preMarketOpening && data4[dates1[0]]?.AMOpenTickFrame) {
      const amOpenRow = ['寄付', ...getAMOpenTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(amOpenRow);
    }
    // @ts-ignore
    if (data4[dates1[0]]?.AMTickFrame) {
      addTimeSlotRows(timeSlots1, 'AMTickFrame');
    }
    // @ts-ignore
    if (conditionSettingState.marketState.preMarketClose && data4[dates1[0]]?.AMCloseTickFrame) {
      const amCloseRow = ['引け', ...getAMCloseTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(amCloseRow);
    }
    if (conditionSettingState.marketState.postMarketOpening && data4[dates1[0]]?.PMOpenTickFrame) {
      const pmOpenRow = ['寄付', ...getPMOpenTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(pmOpenRow);
    }
    if (data4[dates1[0]]?.PMTickFrame) {
      addTimeSlotRows(timeSlots2, 'PMTickFrame');
    }
    if (conditionSettingState.marketState.postMarketClose && data4[dates1[0]]?.PMCloseTickFrame) {
      const pmCloseRow = ['引け', ...getPMCloseTickFrameData().flatMap(item => [item.volume, item.distribution])];
      rows.push(pmCloseRow);
    }
    return rows;
  };

  React.useEffect(() => {
    if (isInitialized.current) {
      setShouldDownload(true); // 组件初始化完成后，允许下载
    }
  }, []); 
  React.useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return; 
    }
    if (shouldDownload &&  [1, 2, 3, 4, 7, 8].includes(buttonName)) {
      downloadCSV(extractTableData(), 'grid-data.csv')
    } 
  }, [griddownload]); 
  const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
                  {Object.keys(data4).length == 0 ? (
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
                  {Object.keys(data4).length == 0 ? (
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

                {conditionSettingState.marketState.eveningOpening && Object.keys(data4).length != 0 && data4[dates1[0]].EveningOpenTickFrame ?
                  <TableRow>
                    <TableCell className="custom-table-cell">寄付</TableCell>
                    {getEveningOpenTickFrame().map((data, index) => (
                      <React.Fragment key={index}>
                        <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
                        <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow> : null}


                {Object.keys(data4).length != 0 && data4[dates1[0]].EveningOpenTickFrame ? renderTimeSlotRows(timeSlots, 'EveningTickFrame') : null}

                {conditionSettingState.marketState.eveningClose && Object.keys(data4).length != 0 && data4[dates1[0]].EveningCloseTickFrame ?
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
                {conditionSettingState.marketState.postMarketOpening && Object.keys(data4).length != 0 && data4[dates1[0]].PMOpenTickFrame ?
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
                {Object.keys(data4).length != 0 && data4[dates1[0]].PMTickFrame ? renderTimeSlotRows(timeSlots2, 'PMTickFrame') : null}
                {conditionSettingState.marketState.postMarketClose && Object.keys(data4).length != 0 && data4[dates1[0]].PMCloseTickFrame ?
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
