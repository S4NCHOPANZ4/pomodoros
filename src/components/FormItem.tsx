import React, { useState, useRef, useEffect, ChangeEvent  } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type MyComponentProps = {
    setOpend: React.Dispatch<React.SetStateAction<boolean>>;
    setSavedData:  React.Dispatch<React.SetStateAction<any>>;
    savedData: any;
    task?: {title: string, pomodoros: number, pomodorosDone: number, desc: string, finished: boolean };
    index: number;
};

const FormItem = (props: MyComponentProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [editing, setEditing] = useState(false) 
    const [addDescription, setAddDes] = useState<boolean>(false)
    const [formData, setFormData] = useState({
      taskName: '',
      nPomodoros: 2,
      pomodorosDone: 0,
      notes: '',
      finished: false
    })

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if(props.task){
        setEditing(true)
        setFormData({
          taskName: props.task.title,
          nPomodoros: props.task.pomodoros,
          pomodorosDone: props.task.pomodorosDone,
          notes: props.task.desc,
          finished: false})
          if(props.task.desc.length > 0){
            setAddDes(true)
          }
      }
   
    }, []);

    const deleteTask = (index: number) =>{
      const data = {...props.savedData}
      data.tasks.splice(index, 1)
  
      props.setSavedData(data)
    }

    const saveData = async() => {
      try{
        const task = {...props.savedData}

        if(editing){
          task.tasks[props.index] = {
            title: formData.taskName,
            pomodoros:  formData.nPomodoros,
            pomodorosDone: formData.pomodorosDone,
            desc: formData.notes,
            finished: false
          }
          props.setSavedData(task)
          return
        }

        task.tasks.push({
          title: formData.taskName,
          pomodoros:  formData.nPomodoros,
          pomodorosDone: formData.pomodorosDone,
          desc: formData.notes,
          finished: false
        })
  
        
        props.setSavedData(task)
        return
      }catch{
        console.log('could not send info');
        
      }
    
    }
    


  return (
    <form className='addtask_form'
    onSubmit={(e)=>{
        e.preventDefault();
        if(formData.taskName.length > 0){
          saveData().then(()=>{
            if(editing){
              props.setOpend(false)
            }
            else{
              setFormData({
                taskName: '',
                nPomodoros: 2,
                notes: '',
                pomodorosDone: 0,
                finished: false
              })
            }
          })
        }
      

    }}>
        <input ref={inputRef} 
        type='text' className='task_name' 
        placeholder='What are you working on?'
        value={formData.taskName}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, taskName: event.target.value });
        }}
        />
        <p className='pomodoro_title'># Pomodoros</p>
          <div className='task_pomodoros'>
            <input 
            type="number" 
            className='input_Npomodoros' 
            value={formData.nPomodoros}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = Number(event.target.value)
              if(value <= 0){
                setFormData({ ...formData, nPomodoros: 0})
                return
              }
              setFormData({ ...formData, nPomodoros: value});
            }}
            />
            <button type="button" className='button_Npomodoros'
            onClick={()=>{
                setFormData({ ...formData, nPomodoros: formData.nPomodoros+1});
            }}
            ><ArrowDropUpIcon className='icon'/></button>
            <button type="button" className='button_Npomodoros'
            onClick={()=>{
                if(formData.nPomodoros<=0) {
                    return
                }
                setFormData({ ...formData, nPomodoros: formData.nPomodoros-1});
            }}><ArrowDropDownIcon className='icon'/></button>
          </div>
      
        {addDescription? 
          <textarea 
          className='add_description_textarea' 
          value={formData.notes}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setFormData({ ...formData, notes: event.target.value });
          }}
          />
          :
          <p 
          onClick={()=>{
            setAddDes(true)
          }}
          className='add_description'>+ Add Description</p>
        }
        
        <div className='task_bottom'>
          {editing?
          <button 
          onClick={()=>{deleteTask(props.index)}}
          type='submit' className='cancel_button'
          >Delete</button>:
          <></>}
     
          <button className='cancel_button'
          type="button"
          onClick={()=>{
            props.setOpend(false)
          }}
          >Close</button>
          <button type='submit' className='accept_button'
          >Save</button>
        
        </div>
      </form>
  )
}

export default FormItem