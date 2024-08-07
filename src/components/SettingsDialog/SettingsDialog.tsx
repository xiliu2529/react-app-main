import { useState } from 'react';
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
import { Grid } from '@mui/material';
import './SettingsDialog.css';
import { useMyContext } from '../../contexts/MyContext';

type CheckboxState = boolean[];
type RadioValue = string[];
type ColorValue = string[];
const SettingsDialog = () => {
    const { setSettingsState } = useMyContext();
    const [open, setOpen] = useState(false); // ダイアログの開閉状態を管理する状態を定義
    const [checkboxStates, setCheckboxStates] = useState<CheckboxState>(
        Array(7).fill(false) // 7つのチェックボックスの初期状態をすべて未選択にする
    );
    // 単一選択ボックスの状態を管理するために配列を使用
    const [radioValues, setRadioValues] = useState<RadioValue>(['0', 'Arrange']);
    // 色選択ボックスの状態を管理するために配列を使用
    const [colors, setColors] = useState<ColorValue>([
        '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
        '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
        '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
    ]);
    const [handleTransaction, sethandleTransaction] = useState<any>({});
    // チェックボックスの状態を更新する関数
    const handleCheckboxChange = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };
    // 単一選択ボックスの状態を更新する関数
    const handleRadioChange = (index: number, value: string) => {
        const newRadioValues = [...radioValues];
        newRadioValues[index] = value;
        setRadioValues(newRadioValues);
    };
    // 色選択ボックスの状態を更新する関数
    const handleColorChange = (index: number, colorValue: string) => {
        const newColors = [...colors];
        newColors[index] = colorValue;
        setColors(newColors);
    };
    const handleOpen = () => {
        setOpen(true); // ダイアログを開く処理
        sethandleTransaction({ checkboxStates, radioValues, colors })

    };
    const handleClose = (value: boolean) => {
        if (!value) {
            setCheckboxStates(handleTransaction.checkboxStates);
            setRadioValues(handleTransaction.radioValues);
            setColors(handleTransaction.colors);
        } else {
            setSettingsState({ checkboxStates, radioValues, colors })
        }
        setOpen(false);

    };
    const handleButtonClick = () => {
        // ボタンクリック時の処理
        setCheckboxStates(Array(7).fill(false));
        setRadioValues(['0', 'Arrange']);
        setColors([
            '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#d22331', '#d22331',
            '#d22331', '#d22331', '#d22331', '#52a69f', '#52a69f', '#52a69f',
            '#52a69f', '#52a69f', '#596db8', '#5bbcd1', '#7e522e'
        ]);
    };
    return (
        <div>
            <span className="settings-icon" onClick={handleOpen}></span>
            <Dialog open={open} onClose={() => handleClose(false)} maxWidth="lg" fullWidth sx={{
                zIndex: 9999,
                '& .MuiDialog-paper': {
                    width: '80%',
                    transform: 'scale(0.9)',
                }
            }}>
                <DialogTitle sx={{ backgroundColor: '#143867', color: '#fff' }}>オプション設定</DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl component="fieldset" sx={{ width: '89%' }}>
                            <Grid className='main-container' container spacing={2}>
                                <Grid item xs={12} sm={6} className='left-container'>
                                    <p className='sub-title'>グリッド</p>
                                    <FormControlLabel
                                        control={<Checkbox checked={checkboxStates[0]} onChange={() => handleCheckboxChange(0)} />}
                                        label="場引け出来高を表示"
                                    />
                                    <div></div>
                                    <FormControlLabel
                                        control={<Checkbox checked={checkboxStates[1]} onChange={() => handleCheckboxChange(1)} />}
                                        label="時間帯別最多出来高·価格を表示"
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ fontWeight: 'bold' }}>優先表示</p>

                                        <RadioGroup
                                            value={radioValues[0]}
                                            onChange={(event) => handleRadioChange(0, event.target.value)}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                marginLeft: '20px'
                                            }}
                                        >
                                            <FormControlLabel value="0" control={<Radio />} label="高値" />
                                            <FormControlLabel value="1" control={<Radio />} label="安値" />
                                        </RadioGroup>
                                    </div>


                                    <FormControlLabel
                                        control={<Checkbox checked={checkboxStates[2]} onChange={() => handleCheckboxChange(2)} />}
                                        label="場引けVWAPを表示"
                                    />
                                    <div></div>
                                    <FormControlLabel
                                        control={<Checkbox checked={checkboxStates[3]} onChange={() => handleCheckboxChange(3)} />}
                                        label="当日出来高分布を百分率で表示"
                                    />
                                    <br />
                                    <p className='sub-title'>グラフ</p>
                                    <RadioGroup
                                        value={radioValues[1]}
                                        onChange={(event) => handleRadioChange(1, event.target.value)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginLeft: '20px'
                                        }}
                                    >
                                        <FormControlLabel value="Arrange" control={<Radio />} label="並ベて表示" />
                                        <FormControlLabel value="Overlay" control={<Radio />} label="重ねて表示" />
                                    </RadioGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={checkboxStates[4]} onChange={() => handleCheckboxChange(4)} />}
                                        label="当日の価格チャートを表示"
                                    />
                                </Grid >

                                <Grid item xs={12} sm={6} className='right-container'>

                                    <p className='category-title'>色</p>
                                    <p className='sub-title'>グリッド</p>
                                    <div className="wrapper">
                                        <span className="inline-container">
                                            <p>背景</p>
                                            <input type="color" value={colors[0]} style={{ width: '100px' }} onChange={(event) => handleColorChange(0, event.target.value)} />
                                        </span>
                                        <span className="inline-container">
                                            <p>文字</p>
                                            <input type="color" value={colors[1]} style={{ width: '100px' }} onChange={(event) => handleColorChange(1, event.target.value)} />
                                        </span>
                                    </div>

                                    <p className='sub-title'>グラフ</p>
                                    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                        <div className="wrapper">
                                            <span className="inline-container">
                                                <p>背景</p>
                                                <input type="color" value={colors[2]} style={{ width: '100px' }} onChange={(event) => handleColorChange(2, event.target.value)} />
                                            </span>
                                            <span className="inline-container">
                                                <p>文字</p>
                                                <input type="color" value={colors[3]} style={{ width: '100px' }} onChange={(event) => handleColorChange(3, event.target.value)} />
                                            </span>
                                        </div>
                                        <p> 分布</p>
                                        <div>
                                            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                    </Grid>
                                                    <Grid item xs={2.5} >
                                                        <div className="text-column">前場</div>
                                                        <div className="text-column">後場</div>
                                                        <div className="text-column">イブニング</div>
                                                        <div className="text-column">寄付</div>
                                                        <div className="text-column">引け</div>
                                                    </Grid>
                                                    <Grid item xs={2.5}>
                                                        <p className="header-p">当日</p>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[4]} onChange={(event) => handleColorChange(4, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[5]} onChange={(event) => handleColorChange(5, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[6]} onChange={(event) => handleColorChange(6, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[7]} onChange={(event) => handleColorChange(7, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[8]} onChange={(event) => handleColorChange(8, event.target.value)} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={2.5}>
                                                        <p className="header-p">過去平均</p>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[9]} onChange={(event) => handleColorChange(9, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[10]} onChange={(event) => handleColorChange(10, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[11]} onChange={(event) => handleColorChange(11, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[12]} onChange={(event) => handleColorChange(12, event.target.value)} />
                                                        </div>
                                                        <div className="color-picker-column">
                                                            <input type="color" value={colors[13]} onChange={(event) => handleColorChange(13, event.target.value)} />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="wrapper">
                                                <p>累計</p>
                                                <span className="inline-container">
                                                    <input type="color" value={colors[14]} style={{ width: '100px' }} onChange={(event) => handleColorChange(14, event.target.value)} />
                                                </span>
                                                <span className="inline-container">
                                                    <input type="color" value={colors[15]} style={{ width: '100px' }} onChange={(event) => handleColorChange(15, event.target.value)} />
                                                </span>

                                            </div>
                                            <div className="wrapper">
                                                <p>チャート</p>
                                                <span className="inline-container">
                                                    <input type="color" value={colors[16]} style={{ width: '100px' }} onChange={(event) => handleColorChange(16, event.target.value)} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <div className="container">
                                            <p className="inline-element">並べて表示</p>
                                            <FormControlLabel
                                                control={<Checkbox checked={checkboxStates[5]} onChange={() => handleCheckboxChange(5)} />}
                                                label="当日の色设定を使用する"
                                                className="inline-element"
                                            />
                                        </div>
                                        <Button variant="contained" onClick={handleButtonClick} style={{ backgroundColor: 'white', color: 'gray', border: '1px solid gray', marginRight: '30px' }}>
                                            初期値に戻す</Button>
                                        <FormControlLabel
                                            control={<Checkbox checked={checkboxStates[6]} onChange={() => handleCheckboxChange(6)} />}
                                            label="すベての面面に適用"
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                        </FormControl>
                    </div>
                </DialogContent>



                <DialogActions>
                    <Button onClick={() => handleClose(true)} style={{ backgroundColor: '#143867', color: 'white' }}>OK</Button>
                    <Button onClick={() => handleClose(false)} style={{ border: '2px solid #143867', backgroundColor: 'white', color: '#143867' }}>キャンセル</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SettingsDialog;
