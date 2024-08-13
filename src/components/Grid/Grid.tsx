import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import './Grid.css';
import { useMyContext } from '../../contexts/MyContext';
import a from '../../data/601.1/data2.json';
import b from '../../data/101.1/data2.json';
import c from '../../data/data2.json';
import d from '../../data/data1.json';



const Grids: React.FC = () => {
  const { settingsState, requestPayload, conditionSettingState } = useMyContext();

  let data2: GridDisplayData = {
  }
  if (requestPayload.Code === '6501') {
    data2 = c;
  } else if (requestPayload.Code === '101.1') {
    data2 = b;
  } else if (requestPayload.Code === '601.1') {
    data2 = a;
  }
  const TableRowComponent = ({ data, label }: { data: any; label: string }) => (
    <TableRow>
      <TableCell className="table-body-cell-a">{label}</TableCell>
      <TableCell className="table-body-cell">{data.AverageDaysData.Volume}</TableCell>
      <TableCell className="table-body-cell">{data.AverageDaysData.Distribution}</TableCell>
      <TableCell className="table-body-cell">{data.AverageDaysData.Cumulative}</TableCell>
      <TableCell className="table-body-cell">{data.TodayData.Volume}</TableCell>
      <TableCell className="table-body-cell">{data.TodayData.Distribution}</TableCell>
      <TableCell className="table-body-cell">{data.TodayData.Cumulative}</TableCell>
      <TableCell className="table-body-cell">{data.TodayData.Difference}</TableCell>
      <TableCell className="table-body-cell">{data.MostVolumeAndPrice.Price}</TableCell>
      <TableCell className="table-body-cell">{data.MostVolumeAndPrice.Volume}</TableCell>
      <TableCell className="table-body-cell">{data.CloseVWAP}</TableCell>
    </TableRow>
  );
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
  return (
    <Box className='grid-container'>
      <Grid container direction="column" spacing={1}>
        <Box className='grid-container-div' />
        <Grid item>
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
                    6日平均(05/17-05/24)
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
                    {d.Today}
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title' id='table-title-right'>
                    時間帯別最多出来高·価格
                  </TableCell>
                  <TableCell className='table-title'>
                  </TableCell>
                  <TableCell className='table-title'>
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
                      className={`table-body-cell ${item === '-' ? 'center-align' : ''}`}
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
                {data2.EveningCloseSessionFrame && settingsState.checkboxStates[0] && (
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
                {data2.AMCloseSessionFrame && settingsState.checkboxStates[0] && (
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
                {data2.PMCloseSessionFrame && settingsState.checkboxStates[0] && (
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
