import { useEffect, useState }  from 'react'
import Stopwatch from '../components/Stopwatch'
//icons
import icon1 from '../assets/icons/mode1_icon.png'
import icon2 from '../assets/icons/mode2_icon.png'
import icon3 from '../assets/icons/mode3_icon.png'
//styles
import '../stlye/home/index.scss';
//mui
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import FormItem from '../components/FormItem';
import DoneIcon from '@mui/icons-material/Done';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveIcon from '@mui/icons-material/Remove';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../components/Settings';


const Home = () => {

 
  const [firstLoad, setFirstLoad] = useState<boolean>(false)
  const [opendTask, setOpenNewTask] = useState<boolean>(false)
  const [openEditTask, setOpenEditTask] = useState<boolean>(false)
  const [savedData, setSavedData] = useState<any>({ 
    pomodoroTime: 25,
    shortBreak: 5,
    longBreak: 15,
    pomodoros: 0,
    breakInterval: 4,
    autoSwitch: false,
    tasks: [],
  });

  //tasks manage
  const [mode, setMode] = useState<number>(1)
  const [bgColor, setBgColor] = useState<string>('#DF4D4D')
  const [selectedTaskEdit, setSelectedTaskEdit] = useState<number | null>(null)
  const [selectedTask, setSelectedtask] = useState<number>(0)
  //stopwatch manage
  const [time, setTime] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [barWidth, setBarWidth] = useState<number>()
  //settings
  const [settingsOpend, setSettingsOpend] = useState(false)



  const  deleteTask = (index: number) => {
    const data = {...savedData}
    data.tasks.splice(index, 1)

    setSavedData(data)
  }
  const promoProg = () =>{
    let done = 0
    let left = 0
    savedData.tasks.map((task: any)=>{
      done += task.pomodorosDone,
      left+= task.pomodoros
    })
    return `${done+'/'+left}`
  }
  const hoursTofinish = () =>{
    let hours = 0
    savedData.tasks.map((task: any)=>{
      if(!task.finished){
        hours+=task.pomodoros;
        hours -= task.pomodorosDone;
      }
    })
    if(hours <= 0){
      return 0
    }
    return hours
  }

  const getStorage = async ()=>{
    try{
      const userData = localStorage.getItem('userData');
      if (userData) {
        setSavedData(JSON.parse(userData));
      }
    }
    catch{
      console.log('no local storage data found');
      
    }


  }

  useEffect(() => {
    getStorage().then(()=>{
      setFirstLoad(true)
    })

  }, []);
  useEffect(() => {
    if(firstLoad) {
      localStorage.setItem("userData", JSON.stringify(savedData));
    }
  },[savedData]);

  useEffect(() => {
    const data = {...savedData}

    if(data.tasks.length > 0) {
      
      data.tasks[selectedTask] = {
        ...data.tasks[selectedTask],
        pomodorosDone: data.tasks[selectedTask].pomodorosDone + 1
      }
      const pomodorosToDO = data.tasks[selectedTask].pomodoros
      const pomodorosDone = data.tasks[selectedTask].pomodorosDone
      
      if(pomodorosDone >= pomodorosToDO) {
        if(savedData.autoSwitch){
          if(selectedTask >= savedData.tasks.length -1){
            setSelectedtask(0)
          }
          else if(savedData.tasks.length === 0){
          }
          else{
            setSelectedtask(selectedTask + 1)
          }
          
        }
        data.tasks[selectedTask] ={
          ...data.tasks[selectedTask],
          finished: true
        }    
      }
    }
   
    
  
  },[savedData.pomodoros])

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    switch (mode) {
      case 1:
        setTime(savedData.pomodoroTime * 60)
        setIsRunning(false)
        setBgColor('#ba4949')
        if (favicon) {
          favicon.setAttribute('href', icon1);
        }
        return
      case 2: 
        setTime(savedData.shortBreak* 60)
        setIsRunning(false)
        setBgColor('#38858a')
        if (favicon) {
          favicon.setAttribute('href', icon2);
        }
      return
      case 3: 
        setTime(savedData.longBreak * 60)
        setIsRunning(false)
        setBgColor('#397097')
        if (favicon) {
          favicon.setAttribute('href', icon3);
        }
        return
    }
  },
  [mode])

  useEffect(() => {
    let totalTime: number
    let progress: number
    switch (mode) {
      case 1:
        totalTime = savedData.pomodoroTime * 60
        progress = ((totalTime - time) / totalTime)*100
        setBarWidth(progress)
        return
      case 2: 
        
        totalTime = savedData.shortBreak * 60
        progress = ((totalTime - time) / totalTime)*100
        setBarWidth(progress)
        return
      case 3: 
        totalTime = savedData.longBreak * 60
        progress = ((totalTime - time) / totalTime)*100
        setBarWidth(progress)
        return
    }
    
  },[time])

  return (
    <div className='super' style={{background: `${bgColor}`}}>
      {firstLoad?
            <>
           <div className='home_super'>
           <div className="top_home">
             <div className='top_content'>
               <div className='top_left'>
                 <div className='icon_cont'>
                   <DoneIcon className='icon' style={{color: bgColor}}/>
                 </div>
                 <p className='title'>Pomofocus</p>
               </div>  
               <div className='top_rigth'>
                 <button
                 onClick={()=>{setSettingsOpend(true)}}
                 className='top_setting_button'>
                   <SettingsIcon/>
                 </button>
               </div>
             </div>
             <div className='top_lowerBar'>
               <div className='lower_bar_progress' style={{width: `${barWidth}%`}}></div>
             </div>
           </div>
   
           <Stopwatch 
           setSavedData={setSavedData}
           savedData={savedData}
           isRunning={isRunning}
           setIsRunning={setIsRunning}
           time={time}
           setTime={setTime}
           color={bgColor}
           mode={mode}
           setMode={setMode}/>
           <p className='pomodoros_done'> <span># {savedData.pomodoros}</span> <span>
           {savedData.tasks.length && (selectedTask <= savedData.tasks.length-1)?
           `${savedData.tasks[selectedTask].title} -`
           :
           ''
           }  Time to focus!</span></p>
           <p className='tasks_title'>Tasks</p>
           
           {savedData.tasks.map((task: any, index: number)=>{
   
             if((index === selectedTaskEdit) && (openEditTask)){
               return (
                 <div className='task_edit' key={index}>
                   <FormItem 
                   index={index}
                   task={task}
                   savedData={savedData}
                   setSavedData={setSavedData}
                   setOpend={setOpenEditTask}/>
                 </div>
                 
               )
             }
             return(
               <div 
               style={((index == selectedTask))?{borderLeft: '5px solid black'}:{}}
               onClick={()=>{
                 setSelectedtask(index)
               }}
               className='task'
               key={index}>
                 <div className='task_main'>
                     <div className='task_rigth'>
                       <button className='task_finish_button' 
                       style={task.finished? { backgroundColor: '#EB7568'}: {}}
                       onClick={()=>{
                         const modified = {...savedData}
                         modified.tasks[index] = {...task, finished: !task.finished}
                         setSavedData(modified)
                       }}
                       >
                         <DoneIcon className='icon'/>
                       </button>
                       <button 
                       onClick={()=>{
                         deleteTask(index)
                       }}
                       className='task_delete_button' style={task.finished? 
                         {display: 'flex'}
                         :
                         {display: 'none'}
                         }>
                           <RemoveIcon className='icon'/>
                       </button>
   
                       <p className='task_name' style={task.finished? 
                       {textDecoration: 'line-through',
                       color: 'gray'
                       } : {}}>{task.title}</p>
                     </div>
                     <div className='task_left'>
                       <p className='task_pomodoros'>{task.pomodorosDone}/{task.pomodoros}</p>
                       <button 
                       onClick={()=>{
                         setSelectedTaskEdit(index)
                         setOpenNewTask(false)
                         setOpenEditTask(true)
                       }}
                       className='task_edit_button'>
                         <ModeEditIcon className='icon'/>
                       </button>
                     </div>
                 </div>
                   {(task.desc.length > 0)?
                     <div className='task_note'>
                       <p className='task_note_cont'>{task.desc}</p>
                     </div>
                     :
                     <></>
                   }
                 </div>
             )
           })}
           
           {opendTask?
             <FormItem 
             index={0}
             savedData={savedData}
             setSavedData={setSavedData}
             setOpend={setOpenNewTask}/>
             :
             <div className='add_tasks' onClick={()=>{
               setOpenNewTask(true)
               setOpenEditTask(false)
             }}>
               <AddAlarmIcon className='icon'/>
               <p>Add Task</p>
             </div>
           }
           {(savedData.tasks.length > 0)?
             <div className='bottom_home'>
               <p>Ends In: <span>
               {(hoursTofinish() * 30)/60}h 
               </span></p>
               <p>Pomos: <span>{promoProg()}</span></p>
             </div>
             :
             <></>
           }
         </div>
         {settingsOpend? 
         <Settings 
         setTime={setTime}
         mode={mode}
         savedData={savedData}
         setSavedData={setSavedData}
         setSettingsOpend={setSettingsOpend}
         />:
         <></>
         }
         </>
        :
        <div className='loader'></div>
      }
     
    </div>
  )
}

export default Home