import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import './Grid.css'
import { useMyContext } from '../../contexts/MyContext';
import { useEffect } from 'react';

interface DataItem {
  time: string;
  volume1: number;
  distribution1: string;
  cumulative1: string;
  volume2: number;
  distribution2: string;
  cumulative2: string;
  difference: string;
  price: string;
  volume3: number;
  vwap: string;
}

const Grids: React.FC = () => {
  const { settingsState } = useMyContext();
  console.log('grid', settingsState.colors[1]
  );

  useEffect(() => {
    if (settingsState) {
      // 假设 settingsState.colors[0] 是你要用作背景色的颜色
      document.documentElement.style.setProperty('--cell-bg-color', settingsState.colors[0]);
      document.documentElement.style.setProperty('--cell-color', settingsState.colors[1]);
    }
  }, [settingsState]);
  // 假数据作为示例
  const data: DataItem[] = [
    { time: '11:01-11:05', volume1: 24067, distribution1: '1%', cumulative1: '46%', volume2: 32554, distribution2: '3455', cumulative2: '54254', difference: '12', price: '12', volume3: 12, vwap: '355' },
    { time: '11:06-11:10', volume1: 28000, distribution1: '2%', cumulative1: '48%', volume2: 34000, distribution2: '3750', cumulative2: '60000', difference: '15', price: '15', volume3: 15, vwap: '360' },
    { time: '11:11-11:15', volume1: 24500, distribution1: '1.5%', cumulative1: '47%', volume2: 33000, distribution2: '3500', cumulative2: '57000', difference: '14', price: '14', volume3: 14, vwap: '358' },
    { time: '11:16-11:20', volume1: 25500, distribution1: '1.2%', cumulative1: '46.5%', volume2: 32000, distribution2: '3200', cumulative2: '56000', difference: '13', price: '13', volume3: 13, vwap: '356' },
    { time: '11:21-11:25', volume1: 23000, distribution1: '0.8%', cumulative1: '45%', volume2: 31000, distribution2: '3000', cumulative2: '54000', difference: '12.5', price: '12.5', volume3: 12.5, vwap: '354.5' },
    { time: '11:26-11:30', volume1: 27000, distribution1: '1.2%', cumulative1: '46%', volume2: 33500, distribution2: '3600', cumulative2: '59000', difference: '14.5', price: '14.5', volume3: 14.5, vwap: '359' },
    { time: '11:31-11:35', volume1: 26000, distribution1: '1%', cumulative1: '46.2%', volume2: 32800, distribution2: '3400', cumulative2: '58000', difference: '14', price: '14', volume3: 14, vwap: '357' },
    { time: '11:36-11:40', volume1: 25000, distribution1: '0.9%', cumulative1: '45.8%', volume2: 31500, distribution2: '3100', cumulative2: '55000', difference: '13.5', price: '13.5', volume3: 13.5, vwap: '355.5' },
    { time: '11:41-11:45', volume1: 27500, distribution1: '1.3%', cumulative1: '46.5%', volume2: 34500, distribution2: '3700', cumulative2: '60000', difference: '15', price: '15', volume3: 15, vwap: '360' },
    { time: '11:46-11:50', volume1: 28500, distribution1: '1.5%', cumulative1: '47%', volume2: 35500, distribution2: '3800', cumulative2: '62000', difference: '15.5', price: '15.5', volume3: 15.5, vwap: '361' },
    { time: '11:51-11:55', volume1: 29500, distribution1: '1.7%', cumulative1: '47.5%', volume2: 36500, distribution2: '3900', cumulative2: '64000', difference: '16', price: '16', volume3: 16, vwap: '362' },
    { time: '11:56-12:00', volume1: 30000, distribution1: '1.8%', cumulative1: '48%', volume2: 37000, distribution2: '4000', cumulative2: '65000', difference: '16.5', price: '16.5', volume3: 16.5, vwap: '363' },
    { time: '12:01-12:05', volume1: 30500, distribution1: '1.9%', cumulative1: '48.2%', volume2: 37500, distribution2: '4100', cumulative2: '66000', difference: '17', price: '17', volume3: 17, vwap: '364' },
    { time: '12:06-12:10', volume1: 31000, distribution1: '2%', cumulative1: '48.5%', volume2: 38000, distribution2: '4200', cumulative2: '67000', difference: '17.5', price: '17.5', volume3: 17.5, vwap: '365' },
    { time: '12:11-12:15', volume1: 31500, distribution1: '2.1%', cumulative1: '48.8%', volume2: 38500, distribution2: '4300', cumulative2: '68000', difference: '18', price: '18', volume3: 18, vwap: '366' },
    { time: '12:16-12:20', volume1: 32000, distribution1: '2.2%', cumulative1: '49%', volume2: 39000, distribution2: '4400', cumulative2: '69000', difference: '18.5', price: '18.5', volume3: 18.5, vwap: '367' },
    { time: '12:21-12:25', volume1: 32500, distribution1: '2.3%', cumulative1: '49.2%', volume2: 39500, distribution2: '4500', cumulative2: '70000', difference: '19', price: '19', volume3: 19, vwap: '368' },
    { time: '12:26-12:30', volume1: 33000, distribution1: '2.4%', cumulative1: '49.5%', volume2: 40000, distribution2: '4600', cumulative2: '71000', difference: '19.5', price: '19.5', volume3: 19.5, vwap: '369' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },
    { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' },

  ];

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
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-body-cell-a" >{row.time}</TableCell>
                    <TableCell className="table-body-cell">{row.volume1}</TableCell>
                    <TableCell className="table-body-cell">{row.distribution1}</TableCell>
                    <TableCell className="table-body-cell">{row.cumulative1}</TableCell>
                    <TableCell className="table-body-cell">{row.volume2}</TableCell>
                    <TableCell className="table-body-cell">{row.distribution2}</TableCell>
                    <TableCell className="table-body-cell">{row.cumulative2}</TableCell>
                    <TableCell className="table-body-cell">{row.difference}</TableCell>
                    <TableCell className="table-body-cell">{row.price}</TableCell>
                    <TableCell className="table-body-cell">{row.volume3}</TableCell>
                    <TableCell className="table-body-cell">{row.vwap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Grids;