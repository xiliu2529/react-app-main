import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from '@mui/material';

const SettingsDialog = () => {
    const [open, setOpen] = useState(false); // 定义状态管理对话框的打开/关闭状态
    const [selectedOption, setSelectedOption] = useState('option1'); // 定义状态管理选中的选项值
    const [isChecked1, setIsChecked1] = useState(false); // 第一个多选框的状态
    const [isChecked2, setIsChecked2] = useState(false); // 第二个多选框的状态
    const [isChecked3, setIsChecked3] = useState(false); // 第3个多选框的状态
    const [isChecked4, setIsChecked4] = useState(false); // 第4个多选框的状态
    const [isChecked5, setIsChecked5] = useState(false); // 第5个多选框的状态
    const [radioValue, setRadioValue] = useState('option1'); // 第一个单选框的选中值
    const [radioValue2, setRadioValue2] = useState('optionA'); // 第二个单选框的选中值
    const [color1, setColor1] = useState('#FFFFFF'); // 第一个颜色选择器的值，默认白色
    const [color2, setColor2] = useState('#000000'); // 第二个颜色选择器的值，默认黑色


    const handleOpen = () => {
        setOpen(true); // 处理打开对话框的事件
    };

    const handleClose = () => {
        setOpen(false); // 处理关闭对话框的事件
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value); // 处理单选框选项变化的事件
    };

    const handleCheckboxChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked1(event.target.checked); // 处理第一个多选框变化的事件
    };

    const handleCheckboxChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked2(event.target.checked); // 处理第二个多选框变化的事件
    };
    const handleCheckboxChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked3(event.target.checked); // 处理第三个多选框变化的事件
    };

    const handleCheckboxChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked4(event.target.checked); // 处理第四个多选框变化的事件
    };
    const handleCheckboxChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked5(event.target.checked); // 处理第四个多选框变化的事件
    };

    const handleRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((event.target as HTMLInputElement).value); // 处理第一个单选框变化的事件
    };

    const handleRadioGroupChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue2((event.target as HTMLInputElement).value); // 处理第二个单选框变化的事件
    };
    const handleColorChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor1(event.target.value);
    };

    const handleColorChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor2(event.target.value);
    };
    return (
        <div>
            {/* 打开设置按钮 */}
            <Button variant="outlined" onClick={handleOpen}>
                打开设置
            </Button>

            {/* 对话框组件 */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                {/* 对话框标题 */}
                <DialogTitle sx={{ backgroundColor: '#143867', color: '#fff' }}>オプション設定</DialogTitle>

                {/* 对话框内容 */}
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormLabel component="legend">表示項目</FormLabel>
                                <p>レイアウト</p>
                                {/* 单选框组 */}
                                <Grid container spacing={2}>
                                    {/* 第一列 */}
                                    <Grid item xs={12} sm={6}>
                                        <RadioGroup value={selectedOption} onChange={handleRadioChange} sx={{ width: '100%' }}>
                                            <FormControlLabel value="option1" control={<Radio />} label="条件設定+グリッド+グラフ" />
                                            <FormControlLabel value="option2" control={<Radio />} label="条件設定+グリッド" />
                                            <FormControlLabel value="option3" control={<Radio />} label="条件設定+グラフ" />
                                        </RadioGroup>
                                    </Grid>
                                    {/* 第二列 */}
                                    <Grid item xs={12} sm={6}>
                                        <RadioGroup value={selectedOption} onChange={handleRadioChange}>
                                            <FormControlLabel value="option4" control={<Radio />} label="グリッド+グラフ" />
                                            <FormControlLabel value="option5" control={<Radio />} label="グリッドのみ" />
                                            <FormControlLabel value="option6" control={<Radio />} label="グラフのみ" />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <br />
                                <p>グリッド</p>
                                {/* 多选框 */}
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked1} onChange={handleCheckboxChange1} />}
                                    label="場引け出来高を表示"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked2} onChange={handleCheckboxChange2} />}
                                    label="時間带别最多出来高·価格老表示"
                                />

                                {/* 第一个单选框组 */}
                                <FormLabel component="legend">優先表示</FormLabel>
                                <RadioGroup
                                    value={radioValue}
                                    onChange={handleRadioGroupChange}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginLeft: '20px'  // 向右移动的距离
                                    }}
                                >
                                    <FormControlLabel value="optionA" control={<Radio />} label="高値" />
                                    <FormControlLabel value="optionB" control={<Radio />} label="安値" />
                                </RadioGroup>

                                {/* 第二个多选框 */}
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked3} onChange={handleCheckboxChange3} />}
                                    label="場引けVWAPを表示"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked4} onChange={handleCheckboxChange4} />}
                                    label="当日出来高分布を百分率で表示"
                                />
                                <br />
                                {/* 第二个单选框组 */}
                                <FormLabel component="legend">グラフ</FormLabel>
                                <RadioGroup
                                    value={radioValue2}
                                    onChange={handleRadioGroupChange2}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginLeft: '20px'  // 向右移动的距离
                                    }}
                                >
                                    <FormControlLabel value="optionX" control={<Radio />} label="並ベて表示" />
                                    <FormControlLabel value="optionY" control={<Radio />} label="重ねて表示" />
                                </RadioGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked5} onChange={handleCheckboxChange5} />}
                                    label="当日の価格チャートを表示"
                                />
                            </Grid >

                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>

                                <p>色</p>
                                <p>グリッド</p>
                                {/* 第一个颜色选择器，默认白色 */}
                                <input type="color" value={color1} onChange={handleColorChange1} />
                                <br />
                                {/* 第二个颜色选择器，默认黑色 */}
                                <input type="color" value={color2} onChange={handleColorChange2} />


                            </Grid>
                        </Grid>



                    </FormControl>
                </DialogContent>



                {/* 对话框操作按钮 */}
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClose} autoFocus>
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SettingsDialog;
