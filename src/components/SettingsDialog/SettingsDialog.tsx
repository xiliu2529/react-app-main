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
import './SettingsDialog.css';

const SettingsDialog = () => {
    const [open, setOpen] = useState(false); // 定义状态管理对话框的打开/关闭状态
    const [selectedOption, setSelectedOption] = useState('option1'); // 定义状态管理选中的选项值
    const [isChecked1, setIsChecked1] = useState(false); // 第一个多选框的状态
    const [isChecked2, setIsChecked2] = useState(false); // 第二个多选框的状态
    const [isChecked3, setIsChecked3] = useState(false); // 第3个多选框的状态
    const [isChecked4, setIsChecked4] = useState(false); // 第4个多选框的状态
    const [isChecked5, setIsChecked5] = useState(false); // 第5个多选框的状态
    const [isChecked6, setIsChecked6] = useState(false); // 第6个多选框的状态
    const [isChecked7, setIsChecked7] = useState(false); // 第7个多选框的状态
    const [radioValue, setRadioValue] = useState('option1'); // 第一个单选框的选中值
    const [radioValue2, setRadioValue2] = useState('optionA'); // 第二个单选框的选中值
    const [color1, setColor1] = useState('#FFFFFF'); // 第一个颜色选择器的值，默认白色
    const [color2, setColor2] = useState('#000000'); // 第二个颜色选择器的值，默认黑色
    const [color3, setColor3] = useState('#FFFFFF'); // 第一个颜色选择器的值，默认白色
    const [color4, setColor4] = useState('#000000'); // 第二个颜色选择器的值，默认黑色
    const [color5, setColor5] = useState('#d22331'); // 第一个颜色选择器的值，默认白色
    const [color6, setColor6] = useState('#d22331'); // 第二个颜色选择器的值，默认黑色
    const [color7, setColor7] = useState('#d22331'); // 第一个颜色选择器的值，默认白色
    const [color8, setColor8] = useState('#d22331'); // 第二个颜色选择器的值，默认黑色 const [color1, setColor1] = useState('#FFFFFF'); // 第一个颜色选择器的值，默认白色
    const [color9, setColor9] = useState('#d22331'); // 第二个颜色选择器的值，默认黑色
    const [color10, setColor10] = useState('#52a69f'); // 第一个颜色选择器的值，默认白色
    const [color11, setColor11] = useState('#52a69f'); // 第二个颜色选择器的值，默认黑色
    const [color12, setColor12] = useState('#52a69f'); // 第二个颜色选择器的值，默认黑色
    const [color13, setColor13] = useState('#52a69f'); // 第二个颜色选择器的值，默认黑色
    const [color14, setColor14] = useState('#52a69f'); // 第二个颜色选择器的值，默认黑色
    const [color15, setColor15] = useState('#596db8'); // 第二个颜色选择器的值，默认黑色
    const [color16, setColor16] = useState('#5bbcd1'); // 第二个颜色选择器的值，默认黑色
    const [color17, setColor17] = useState('#7e522e'); // 第二个颜色选择器的值，默认黑色



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
    const handleCheckboxChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked6(event.target.checked); // 处理第四个多选框变化的事件
    };
    const handleCheckboxChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked7(event.target.checked); // 处理第四个多选框变化的事件
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
    const handleColorChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor3(event.target.value);
    };

    const handleColorChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor4(event.target.value);
    };
    const handleColorChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor5(event.target.value);
    };

    const handleColorChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor6(event.target.value);
    };
    const handleColorChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor7(event.target.value);
    };

    const handleColorChange8 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor8(event.target.value);
    };
    const handleColorChange9 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor9(event.target.value);
    };
    const handleColorChange10 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor10(event.target.value);
    };

    const handleColorChange11 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor11(event.target.value);
    };
    const handleColorChange12 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor12(event.target.value);
    };

    const handleColorChange13 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor13(event.target.value);
    };
    const handleColorChange14 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor14(event.target.value);
    };
    const handleColorChange15 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor15(event.target.value);
    };
    const handleColorChange16 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor16(event.target.value);
    };
    const handleColorChange17 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor17(event.target.value);
    };
    const handleButtonClick = () => {
        // 按钮点击事件处理逻辑
        console.log('按钮被点击了！');
    };










    return (
        <div>
            
            <span className="settings-icon" onClick={handleOpen}></span>

            {/* 对话框组件 */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                {/* 对话框标题 */}
                <DialogTitle sx={{ backgroundColor: '#143867', color: '#fff' }}>オプション設定</DialogTitle>

                {/* 对话框内容 */}
                <DialogContent dividers>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl component="fieldset" sx={{ width: '89%' }}>
                        <Grid className='main-container' container spacing={2}>
                            <Grid item xs={12} sm={6} className='left-container'>
                                <p>表示項目</p>
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

                            <Grid item xs={12} sm={6} className='right-container'>

                                <p>色</p>
                                <p>グリッド</p>
                                {/* 第一个颜色选择器，默认白色 */}
                                <div className="wrapper">
                                    <span className="inline-container">
                                        <p>背景</p>
                                        <input type="color" value={color1} style={{ width: '100px' }} onChange={handleColorChange1} />
                                    </span>
                                    {/* 第二个颜色选择器，默认黑色 */}
                                    <span className="inline-container">
                                        <p>文字</p>
                                        <input type="color" value={color2} style={{ width: '100px' }} onChange={handleColorChange2} />
                                    </span>
                                </div>

                                <p style={{ margin: '0px' }}>グラフ</p>
                                <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                    {/* 第一个颜色选择器，默认白色 */}
                                    <div className="wrapper">
                                        <span className="inline-container">
                                            <p>背景</p>
                                            <input type="color" value={color3} style={{ width: '100px' }} onChange={handleColorChange3} />
                                        </span>
                                        {/* 第二个颜色选择器，默认黑色 */}
                                        <span className="inline-container">
                                            <p>文字</p>
                                            <input type="color" value={color4} style={{ width: '100px' }} onChange={handleColorChange4} />
                                        </span>
                                    </div>
                                    <p style={{ margin: '0px' }}>分布</p>
                                    <div>  
                                    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <p className="header-p">当日              過去平均</p>
                                            </Grid>
                                            <Grid item xs={2.5}>
                                                <div className="text-column">前場</div>
                                                <div className="text-column">後場</div>
                                                <div className="text-column">イブニング</div>
                                                <div className="text-column">寄付</div>
                                                <div className="text-column">引け</div>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color5} onChange={handleColorChange5} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color6} onChange={handleColorChange6} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color7} onChange={handleColorChange7} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color8} onChange={handleColorChange8} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color9} onChange={handleColorChange9} />
                                                </div>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color10} onChange={handleColorChange10} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color11} onChange={handleColorChange11} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color12} onChange={handleColorChange12} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color13} onChange={handleColorChange13} />
                                                </div>
                                                <div className="color-picker-column">
                                                    <input type="color" value={color14} onChange={handleColorChange14} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        <div className="wrapper">
                                            <p>累計</p>
                                            <span className="inline-container">
                                                <input type="color" value={color15} style={{ width: '100px' }} onChange={handleColorChange15} />
                                            </span>
                                            <span className="inline-container">
                                                <input type="color" value={color16} style={{ width: '100px' }} onChange={handleColorChange16} />
                                            </span>

                                        </div>
                                        <div className="wrapper">
                                            <p>チャート</p>
                                            <span className="inline-container">
                                                <input type="color" value={color17} style={{ width: '100px' }} onChange={handleColorChange17} />
                                            </span>
                                        </div>

                                    </div>
                                    </div>

                                <div>
                                    <div className="container">
                                        <p className="inline-element">並べて表示</p>
                                        <FormControlLabel
                                            control={<Checkbox checked={isChecked6} onChange={handleCheckboxChange6} />}
                                            label="当日の色设定を使用する"
                                            className="inline-element"
                                        />
                                    </div>
                                    <Button variant="contained" onClick={handleButtonClick}  style={{ marginRight: '30px' }}>初期値に戻す</Button>
                                    <FormControlLabel
                                        control={<Checkbox checked={isChecked7} onChange={handleCheckboxChange7} />}
                                        label="すベての面面に適用"
                                    />
                                </div>
                            </Grid>
                        </Grid>

                    </FormControl>
                    </div>
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
