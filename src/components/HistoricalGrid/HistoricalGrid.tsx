import * as React from 'react';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography, Box } from '@mui/material';
import './HistoricalGrid.css';

// 定义数据项接口
interface DataItem {
    time: string;                   // 时间
    date: string;                   // 日期
    volume1: number;                // 合计1
    distribution1: string;          // 分布1
    volume2: number;                // 合计2
    distribution2: string;          // 分布2
    volume3: number;                // 合计3
    distribution3: string;          // 分布3
    volume4: number;                // 合计4
    distribution4: string;          // 分布4
}

// 数据表格组件
const DataTable: React.FC = () => {
    // 假数据作为示例
    const data: DataItem[] = [
        { time: '11:01-11:05', date: '2024/07/11', volume1: 11111, distribution1: '1%', volume2: 32554, distribution2: '34%', volume3: 12, distribution3: '1.2%', volume4: 24000, distribution4: '2.4%' },
        { time: '11:06-11:10', date: '2024/07/12', volume1: 28000, distribution1: '2%', volume2: 34000, distribution2: '30%', volume3: 15, distribution3: '1.5%', volume4: 25000, distribution4: '2.5%' },
        { time: '11:11-11:15', date: '2024/07/13', volume1: 24500, distribution1: '1.5%', volume2: 33000, distribution2: '35%', volume3: 14, distribution3: '1.4%', volume4: 26000, distribution4: '2.6%' },
        { time: '11:16-11:20', date: '2024/07/14', volume1: 25500, distribution1: '1.2%', volume2: 32000, distribution2: '32%', volume3: 13, distribution3: '1.3%', volume4: 27000, distribution4: '2.7%' },
        { time: '11:21-11:25', date: '2024/07/15', volume1: 23000, distribution1: '0.8%', volume2: 31000, distribution2: '30%', volume3: 12.5, distribution3: '1.25%', volume4: 28000, distribution4: '2.8%' },
    ];

    // 计算各列出来高的总和
    const totalVolume1 = data.reduce((sum, item) => sum + item.volume1, 0);
    const totalVolume2 = data.reduce((sum, item) => sum + item.volume2, 0);
    const totalVolume3 = data.reduce((sum, item) => sum + item.volume3, 0);
    const totalVolume4 = data.reduce((sum, item) => sum + item.volume4, 0);

    // 提取所有日期
    const dates = data.map(item => item.date);

    return (
        <Box className='grid-container'>
            <Box className='grid-container-div' />
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <TableContainer component={Paper} className="table-container">
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    {dates.map((date, index) => (
                                        <TableCell key={index} colSpan={2}>{date}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>時間</TableCell>
                                    <TableCell>出来高</TableCell>
                                    <TableCell>分布</TableCell>
                                    <TableCell>出来高</TableCell>
                                    <TableCell>分布</TableCell>
                                    <TableCell>出来高</TableCell>
                                    <TableCell>分布</TableCell>
                                    <TableCell>出来高</TableCell>
                                    <TableCell>分布</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>合計</TableCell>
                                    <TableCell>{totalVolume1}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{totalVolume2}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{totalVolume3}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{totalVolume4}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.volume1}</TableCell>
                                        <TableCell>{row.distribution1}</TableCell>
                                        <TableCell>{row.volume2}</TableCell>
                                        <TableCell>{row.distribution2}</TableCell>
                                        <TableCell>{row.volume3}</TableCell>
                                        <TableCell>{row.distribution3}</TableCell>
                                        <TableCell>{row.volume4}</TableCell>
                                        <TableCell>{row.distribution4}</TableCell>
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

export default DataTable;
