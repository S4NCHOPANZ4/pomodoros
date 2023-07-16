import React, { useState} from 'react'
import Calendar from 'react-calendar';

import '../stlye/newItem/index.scss'

import 'react-calendar/dist/Calendar.css';

const NewItem: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());

    const handleDateChange =  (value: Date | Date[]) => {
        if (value instanceof Date) {
          setDate(value);
        }
      };
    
  return (
    <>
    <div>NewItem</div>
    <Calendar 
    
    tileClassName="custom-tile"
    onChange={handleDateChange as any} value={date as any} />
    <h1 className='a'>Fecha seleccionada: {date.toString()}</h1>
    </>

  )
}

export default NewItem;