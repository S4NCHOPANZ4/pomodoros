import React, { ChangeEvent } from 'react'

//MUI
import CloseIcon from '@mui/icons-material/Close';

import '../stlye/settings/settings.scss'

type MyComponentProps = {
    setSettingsOpend: React.Dispatch<React.SetStateAction<boolean>>;
    setSavedData: React.Dispatch<React.SetStateAction<any>>;
    savedData: any;
    mode: number;
    setTime: React.Dispatch<React.SetStateAction<number>>
};

const setCloseSettings = (classe: string, setData: React.Dispatch<React.SetStateAction<boolean>>) =>{
    if(classe === 'settings_super'){
        setData(false)
    }
} 

const changeActuallTime = (inputMode: number, mode: number, setTime: React.Dispatch<React.SetStateAction<number>>, time: number) =>{
    switch (mode) {
        case 1:
            if(inputMode === 1){
                setTime(time * 60)
            }
          return
        case 2: 
            if(inputMode === 2){
                setTime(time* 60)
            }
          return
        case 3: 
            if(inputMode === 3){
                setTime(time * 60)
            }
          return
      }
}

const Settings = (props: MyComponentProps) => {
  return (
    <div 
    onClick={(event: React.MouseEvent<HTMLDivElement>)=>{
        const clickedElement = event.target as HTMLElement;
        const className = clickedElement.className;
        setCloseSettings(className, props.setSettingsOpend)
        }}
    className='settings_super'>
        <div className='settings_window'>
            <div className='settings_top'>
                <p>Settings</p>
                <button 
                onClick={()=>{
                    props.setSettingsOpend(false)
                }
                } 
                className='close_button'>
                    <CloseIcon className='icon'/>
                </button>
            </div>
            <div className='settings_body'>
                <p className='settings_titles'>Time (minutes)</p>
                <div className='time_inputs'>
                    <div className='input_cont'>
                        <p>Pomodoro</p>
                        <input type="number" 
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                            props.setSavedData({...props.savedData, pomodoroTime: event.target.value});
                            changeActuallTime(1,props.mode, props.setTime, Number(event.target.value));
                        }}
                        value={props.savedData.pomodoroTime}/>
                    </div>
                    <div className='input_cont'>
                        <p>Short Break</p>
                        <input type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        props.setSavedData({...props.savedData, shortBreak: event.target.value});
                        changeActuallTime(2, props.mode, props.setTime, Number(event.target.value));
                        }}
                        value={props.savedData.shortBreak} />
                    </div>
                    <div className='input_cont'>
                        <p>Long Break</p>
                        <input type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        props.setSavedData({...props.savedData, longBreak: event.target.value});
                        changeActuallTime(3, props.mode, props.setTime, Number(event.target.value));
                        }}
                        value={props.savedData.longBreak}/>
                    </div>
                </div>
                <div className='input_cont_single'>
                    <p>Long Break interval</p>
                    <input type="number" 
                    onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                        props.setSavedData({...props.savedData, breakInterval: Number(event.target.value)});
                    }}
                    value={props.savedData.breakInterval}/>
                </div>
                <div className='input_cont_single'
                onClick={()=>{
                    props.setSavedData({...props.savedData, autoSwitch: !props.savedData.autoSwitch});
                }}
                >
                    <p>Auto Switch Tasks</p>
                    <div className='switch' style={props.savedData.autoSwitch?
                    {justifyContent: 'flex-end', backgroundColor: 'rgb(139, 212, 156)'}
                    :
                    {justifyContent: 'flex-start', backgroundColor: 'gray'}
                    }>
                        <div className='ball'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings