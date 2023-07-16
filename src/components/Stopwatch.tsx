import { useEffect } from 'react';

//sounds
import start_stopwatch from '../assets/sounds/start_stopwatch.ogg'
import alarm_stopwatch from '../assets/sounds/alarm_finished.ogg'
//MUI
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type MyComponentProps = {
  setMode: React.Dispatch<React.SetStateAction<number>>;
  mode: number;
  color: string;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  setSavedData: React.Dispatch<React.SetStateAction<any>>
  savedData: any;

};

const Stopwatch = (props: MyComponentProps) => {

    const start_sw = new Audio(start_stopwatch);
    const start_alarm = new Audio(alarm_stopwatch);


  //Notifications
  const handleNotificationClick = (title: string, body: string) => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, {
            body: body,
          });
        }
      });
    }
  }

    useEffect(() => {
        let interval: number | null = null;
    
        if (props.isRunning) {
          interval = window.setInterval(() => {
            props.setTime((prevTime) => {
              if(prevTime <= 0 ){
                if(props.mode === 1){
                  handleNotificationClick('Your time is up!', `Let's take a break!`)
                }
                else{
                  handleNotificationClick('Your time is up!', `Let's Focus!`)
                }
                start_alarm.play()
                handleSkip()  
          
              }
              return prevTime - 1
            });
          
          }, 1000);
        }
    
        return () => {
          if (interval) {
            window.clearInterval(interval);
          }
        };
      }, [props.isRunning]);
    
      const startStopwatch = (): void => {
        props.setIsRunning(true);
      };
    
      const pauseStopwatch = (): void => {
        props.setIsRunning(false);
      };
    
      const formatTime = (time: number): string => {
        const minutes: number = Math.floor(props.time / 60);
        const seconds: number = time % 60;
        document.title =`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Let's Concentrate`
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };
    
    // const  handleRestart = () =>{
    //   props.setTime(25* 60)
    // }

    const handleSkip = () =>{
        const pomodoro = props.savedData.pomodoros + 1
        switch(props.mode){
          case 1:
            
            if(((pomodoro%props.savedData.breakInterval == 0) && (pomodoro != 0))) {
              props.setMode(3)
              props.setSavedData({...props.savedData, pomodoros: props.savedData.pomodoros + 1  })
              return
            }
            props.setMode(props.mode + 1)
            props.setSavedData({...props.savedData, pomodoros: props.savedData.pomodoros + 1  })
            return
          case 2:
            props.setMode(1)
            return
          case 3:
            props.setMode(1)
            return

        }
    }
    


    return (
    <div className='stopwatch_super'>
        <div className='stopwatch_modes'>
            <button className={(props.mode === 1)?
                'modes selected'
                :
                'modes'
                }
            onClick={()=>{
                props.setMode(1)
            }}
            >Pomodoro</button>
            <button className={(props.mode === 2)?
                'modes selected'
                :
                'modes'
                }
            onClick={()=>{
              props.setMode(2)
            }}
            >Short Break</button>
            <button className={(props.mode === 3)?
                'modes selected'
                :
                'modes'
                }
            onClick={()=>{
              props.setMode(3)
            }}
            >Long Break</button>
        </div>
      <p className='countdown'>{formatTime(props.time)}</p>



      <div className='stopwatch_options'>
        <button 
        style={{opacity: '0'}}
        onClick={()=> 
        {
          // handleRestart()
        }
        } className='reStart_button side_button'><RestartAltIcon className='icon'/></button>
        {props.isRunning ? (
            <button className='start_button'
            style={{color: `${props.color}`}}
            onClick={()=>{
                pauseStopwatch()
                start_sw.play()
            }}>PAUSE</button>
        ) : (
            <button className='start_button'
            style={{color: `${props.color}`}}
            onClick={()=>{
                startStopwatch()
                start_sw.play()
            }}>START</button>
        )}
        <button className='skip_button side_button'
        onClick={()=> handleSkip()}
        ><SkipNextIcon className='icon'/></button>
      </div>
  

    </div>
  )
}

export default Stopwatch