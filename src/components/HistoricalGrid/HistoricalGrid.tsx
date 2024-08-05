import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Box } from '@mui/material';
import './HistoricalGrid.css';
import { useMyContext } from '../../contexts/MyContext';
import { useEffect } from 'react';
import data4 from '../../../src/data/data4.json';

interface TimeSlotData {
  Volume?: string;
  Distribution?: string;
}

interface AMTickFrame {
  [timeSlot: string]: TimeSlotData;
}

interface PMTickFrame {
  [timeSlot: string]: TimeSlotData;
}


interface Frame {
  Volume: string;
  Distribution: string;
}

interface DayData {
  TotalFrame: Frame;
  AMTickFrame: AMTickFrame;
  PMTickFrame: PMTickFrame;
  AMOpenTickFrame: Frame;
  AMCloseTickFrame: Frame;
  PMOpenTickFrame: Frame;
  PMCloseTickFrame: Frame;
}

interface DataType {
  [date: string]: DayData;
}
const data4Typed = data4 as DataType;

const HistoricalGrid: React.FC = () => {
  const { settingsState, conditionSettingState } = useMyContext();
  console.log('conditionSettingState', conditionSettingState.marketState);


  useEffect(() => {
    if (settingsState) {
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);

  const extractDates = (jsonData: DataType) => Object.keys(jsonData);

  const extractTotalFrame = (data: DataType) =>
    Object.entries(data).map(([date, dayData]) => ({
      date,
      volume: dayData.TotalFrame.Volume,
      distribution: dayData.TotalFrame.Distribution,
    }));

  const extractTimeSlots = (data: DataType, frameType: 'AMTickFrame' | 'PMTickFrame') => {
    const timeSlotsSet = new Set<string>();
    Object.values(data).forEach(dayData => {
      Object.keys(dayData[frameType]).forEach(timeSlot => {
        timeSlotsSet.add(timeSlot);
      });
    });
    return Array.from(timeSlotsSet);
  };

  const getTimeSlotData = (timeSlot: string, frameType: 'AMTickFrame' | 'PMTickFrame') =>
    extractDates(data4Typed).map(date => {
      const timeSlotData = data4Typed[date]?.[frameType]?.[timeSlot] || {};
      return {
        volume: timeSlotData.Volume || '-',
        distribution: timeSlotData.Distribution || '-',
      };
    });

  const getAMOpenTickFrameData = () =>
    extractDates(data4Typed).map(date => {
      const data = data4Typed[date]?.AMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });
  const getPMOpenTickFrameData = () =>
    extractDates(data4Typed).map(date => {
      const data = data4Typed[date]?.PMOpenTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getAMCloseTickFrameData = () =>
    extractDates(data4Typed).map(date => {
      const data = data4Typed[date]?.AMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const getPMCloseTickFrameData = () =>
    extractDates(data4Typed).map(date => {
      const data = data4Typed[date]?.PMCloseTickFrame || {};
      return {
        volume: data.Volume || '-',
        distribution: data.Distribution || '-',
      };
    });

  const dates = extractDates(data4Typed);
  const totalFrame = extractTotalFrame(data4Typed);
  const timeSlots = extractTimeSlots(data4Typed, 'AMTickFrame');
  const timeSlots2 = extractTimeSlots(data4Typed, 'PMTickFrame');
  const renderTimeSlotRows = (slots: string[], frameType: 'AMTickFrame' | 'PMTickFrame') =>
    slots.map((timeSlot, index) => (
      <TableRow key={index}>
        <TableCell className="custom-table-cell">{timeSlot}</TableCell>
        {getTimeSlotData(timeSlot, frameType).map((data, i) => (
          <React.Fragment key={i}>
            <TableCell className="custom-table-cell-a">{data.volume}</TableCell>
            <TableCell className="custom-table-cell-a">{data.distribution}</TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    ));

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
                  {dates.map((date, index) => (
                    <React.Fragment key={index}>
                      <TableCell className="custom-header-cell">{date}</TableCell>
                      <TableCell className="custom-header-cell"></TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="custom-table-cell">時間</TableCell>
                  {dates.map((_, index) => (
                    <React.Fragment key={index}>
                      <TableCell className="custom-table-cell">出来高</TableCell>
                      <TableCell className="custom-table-cell">分布</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="custom-table-cell">合計</TableCell>
                  {totalFrame.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableCell className="custom-table-cell-a">{item.volume}</TableCell>
                      <TableCell className="custom-table-cell-a">{item.distribution}</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>

                {/* 新添加的 AMOpenTickFrame 数据行 */}
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

                {renderTimeSlotRows(timeSlots, 'AMTickFrame')}
                {/* 新添加的 AMCloseTickFrame 数据行 */}
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
                {conditionSettingState.marketState.postMarketOpening ?
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
                {renderTimeSlotRows(timeSlots2, 'PMTickFrame')}
                {conditionSettingState.marketState.postMarketClose ?
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
