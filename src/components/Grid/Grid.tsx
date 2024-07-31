import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import './Grid.css'
import { useMyContext } from '../../contexts/MyContext';
import { useEffect } from 'react';
import data2 from '../../../public/data/国内株式/data2.json'

const Grids: React.FC = () => {
  const { settingsState, conditionSettingState } = useMyContext();
  console.log('conditionSe1234123ttingState', conditionSettingState);

  useEffect(() => {
    if (settingsState) {
      // 假设 settingsState.colors[0] 是你要用作背景色的颜色
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);

  return (
    <Box className='grid-container'>
      <Grid container direction="column" spacing={1}>
        <Box className='grid-container-div' />
        <Grid item>
          <Box className='table-title'>
            <Typography className="table-title-left">
              6日平均(05/17-05/24)2024/05/27
            </Typography>
            <Typography className="table-title-right">
              時聞带別最多出来高·偭格
            </Typography>
          </Box>
          <TableContainer component={Paper} className="table-container">

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* 头 */}
                  <TableCell className="table-head-cell" id='table-head-cell-a'>時間</TableCell>
                  <TableCell className="table-head-cell">出来高</TableCell>
                  <TableCell className="table-head-cell">分布</TableCell>
                  <TableCell className="table-head-cell">累計</TableCell>
                  <TableCell className="table-head-cell">出来高</TableCell>
                  <TableCell className="table-head-cell">分布</TableCell>
                  <TableCell className="table-head-cell">累計</TableCell>
                  <TableCell className="table-head-cell">差</TableCell>
                  <TableCell className="table-head-cell">価格</TableCell>
                  <TableCell className="table-head-cell">出来高</TableCell>
                  <TableCell className="table-head-cell">場引けVWAP</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-body-cell-a">合計</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.TotalFrame.CloseVWAP}</TableCell>

                </TableRow>
                {/* 前寄付 */}
                {conditionSettingState.marketState.preMarketOpening ? (
                  <TableRow>
                    <TableCell className="table-body-cell-a">寄付</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Difference}</TableCell>
                  </TableRow>
                ) : null}

              </TableHead>
              <TableBody>
                {/* 前场 */}
                {Object.entries(data2.AMTickFrame).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-body-cell-a" >{row[0]}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Difference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {conditionSettingState.marketState.preMarketClose ? (
                  <TableRow>
                    {/* 前場引け */}
                    <TableCell className="table-body-cell-a">引け</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Difference}</TableCell>
                  </TableRow>
                ) : null}
                  {/* {conditionSettingState.marketState.postMarketOpening ? (
                  <TableRow>
                    
                    <TableCell className="table-body-cell-a"></TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{data2.AMOpenTickFrame.TodayData.Difference}</TableCell>
                  </TableRow>
                ) : null} */}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Grids;