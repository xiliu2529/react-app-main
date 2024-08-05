import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import './Grid.css'
import { useMyContext } from '../../contexts/MyContext';
import { useEffect } from 'react';
// import data2 from '../../data/data2.json'
import data2 from '../../data/101.1/data2.json'

const Grids: React.FC = () => {
  const { settingsState, conditionSettingState } = useMyContext();

  useEffect(() => {
    if (settingsState) {
      // 假设 settingsState.colors[0] 是你要用作背景色的颜色
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);
  console.log(conditionSettingState.marketState);


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
              </TableHead>
              {/* 晚上寄 */}
              {conditionSettingState.marketState.eveningOpening ? (
                <TableRow>
                  <TableCell className="table-body-cell-a">寄付</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningOpenTickFrame.CloseVWAP}</TableCell>
                </TableRow>
              ) : null}

              <TableBody>
                {/* 晚上 */}
                {Object.entries(data2.EveningTickFrame).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-body-cell-a" >{row[0]}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Difference}</TableCell>
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Price}</TableCell>
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].CloseVWAP}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* 晚上引 */}
              {conditionSettingState.marketState.eveningClose ? (
                <TableRow>
                  <TableCell className="table-body-cell-a">引け</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.EveningCloseTickFrame.CloseVWAP}</TableCell>
                </TableRow>
              ) : null}
              {/* イブニング合計 */}
              <TableRow>
                <TableCell className="table-body-cell-a">イブニング合計</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.AverageDaysData.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.AverageDaysData.Distribution}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.AverageDaysData.Cumulative}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.TodayData.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.TodayData.Distribution}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.TodayData.Cumulative}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.TodayData.Difference}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.MostVolumeAndPrice.Price}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.MostVolumeAndPrice.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.EveningCloseSessionFrame.CloseVWAP}</TableCell>
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
                  <TableCell className="table-body-cell">{data2.AMOpenTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMOpenTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMOpenTickFrame.CloseVWAP}</TableCell>
                </TableRow>
              ) : null}
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
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Price}</TableCell>
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].CloseVWAP}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {conditionSettingState.marketState.preMarketClose ? (
                <TableRow>
                  {/* 前場引け */}
                  <TableCell className="table-body-cell-a">引け</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.AMCloseTickFrame.CloseVWAP}</TableCell>
                </TableRow>
              ) : null}
  {/*  前场合计*/}
              <TableRow>
                <TableCell className="table-body-cell-a">前場合計</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.AverageDaysData.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.AverageDaysData.Distribution}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.AverageDaysData.Cumulative}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.TodayData.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.TodayData.Distribution}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.TodayData.Cumulative}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.TodayData.Difference}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.MostVolumeAndPrice.Price}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.MostVolumeAndPrice.Volume}</TableCell>
                <TableCell className="table-body-cell">{data2.AMCloseSessionFrame.CloseVWAP}</TableCell>
              </TableRow>

              {/* 后场寄付 */}
              {conditionSettingState.marketState.postMarketOpening &&  data2.PMOpenTickFrame  ? (
                <TableRow>
                  <TableCell className="table-body-cell-a">寄付</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMOpenTickFrame.CloseVWAP}</TableCell>
                </TableRow>
              ) : null}
              <TableBody>
                {/* 后场 */}
                {/* {Object.entries(data2.PMTickFrame).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-body-cell-a" >{row[0]}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].AverageDaysData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Distribution}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Cumulative}</TableCell>
                    <TableCell className="table-body-cell">{row[1].TodayData.Difference}</TableCell>
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Price}</TableCell>
                    <TableCell className="table-body-cell">{row[1].MostVolumeAndPrice.Volume}</TableCell>
                    <TableCell className="table-body-cell">{row[1].CloseVWAP}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody> 
              {/* 后场引け */}
              {/* {conditionSettingState.marketState.postMarketClose ? (
                <TableRow>
                 
                  <TableCell className="table-body-cell-a">引け</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.AverageDaysData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.AverageDaysData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.AverageDaysData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.TodayData.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.TodayData.Distribution}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.TodayData.Cumulative}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.TodayData.Difference}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.MostVolumeAndPrice.Price}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.MostVolumeAndPrice.Volume}</TableCell>
                  <TableCell className="table-body-cell">{data2.PMCloseTickFrame.CloseVWAP}</TableCell>
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