import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import './Grid.css'
import { styled } from '@mui/system';

// 创建一个自定义的 TableCell 组件
const CustomTableCell = styled(TableCell)({
    padding: '3px 3px', // 调整内边距
    borderRight: '1px solid #ddd', 

});

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

const DataTable: React.FC = () => {
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
        { time: '12:31-12:35', volume1: 33500, distribution1: '2.5%', cumulative1: '49.7%', volume2: 40500, distribution2: '4700', cumulative2: '72000', difference: '20', price: '20', volume3: 20, vwap: '370' }
    ];

    return (
        <div className='grid-container'>
               <div className='grid-container-div'> 
                  <p style={{ margin: 0 ,marginLeft:'120px ',color:'#405D83',fontSize:'10px'}}>6日平均(05/17-05/24)2024/05/27</p> 
                  <p style={{margin: 0 ,marginLeft:'270px ',color:'#405D83',fontSize:'10px'}}>時聞带別最多出来高·価格</p>
                  </div>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TableContainer component={Paper} className="table-container">
                    <Table stickyHeader style={{ borderCollapse: 'collapse',minWidth: 600,  }}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>時間</CustomTableCell>
                                    <CustomTableCell>出来高</CustomTableCell>
                                    <CustomTableCell>分布</CustomTableCell>
                                    <CustomTableCell>累計</CustomTableCell>
                                    <CustomTableCell>出来高</CustomTableCell>
                                    <CustomTableCell>分布</CustomTableCell>
                                    <CustomTableCell>累計</CustomTableCell>
                                    <CustomTableCell>差</CustomTableCell>
                                    <CustomTableCell>価格</CustomTableCell>
                                    <CustomTableCell>出来高</CustomTableCell>
                                    <CustomTableCell>場引けVWAP</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <CustomTableCell>{row.time}</CustomTableCell>
                                        <CustomTableCell>{row.volume1}</CustomTableCell>
                                        <CustomTableCell>{row.distribution1}</CustomTableCell>
                                        <CustomTableCell>{row.cumulative1}</CustomTableCell>
                                        <CustomTableCell>{row.volume2}</CustomTableCell>
                                        <CustomTableCell>{row.distribution2}</CustomTableCell>
                                        <CustomTableCell>{row.cumulative2}</CustomTableCell>
                                        <CustomTableCell>{row.difference}</CustomTableCell>
                                        <CustomTableCell>{row.price}</CustomTableCell>
                                        <CustomTableCell>{row.volume3}</CustomTableCell>
                                        <CustomTableCell>{row.vwap}</CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default DataTable;