import s from './Todolist.module.scss'
import React, {ChangeEvent, useState} from "react";

export type dataTodolistType = {
   id: string
   label: string
   isDown: boolean
}

type todolistType = {
   title: string
   tasks: Array<dataTodolistType>
   removeTask: (id: string) => void;
   changeFilter: (value: changeFilterType) => void;
   getValue: (value: string) => void;
}

export type changeFilterType = "All" | "Active" | "Completed";

export const Todolist: React.FC<todolistType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    getValue
                                                 }) => {
   const [inputValue, setInputValue] = useState('');
   const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }
   const onKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         getValue(inputValue)
         setInputValue('')
      }
   }
   const onClinkButton = () => {
         getValue(inputValue)
         setInputValue('')
   }

   return (
       <div className={s.todolist}>
          <h1 className={s.title}>{title}</h1>

          <div className={s.input_wrap}>
             <input className={s.input} type="text" value={inputValue} onChange={e => {
                onChangeInput(e)
             }} onKeyUp={(e) => {
                onKeyUpInput(e)
             }}/>
             <button className={s.button} type={"button"} onClick={() => {
                onClinkButton()
             }}>+
             </button>
          </div>

          <ul className={s.list}>
             {tasks.map((item) =>
                 <li className={s.item} key={item.id}>
                    <input type="checkbox" checked={item.isDown}/>
                    <label>{item.label}</label>
                    <button className={s.close} onClick={() => {
                       removeTask(item.id)
                    }}>X
                    </button>
                 </li>
             )}
          </ul>

          <ul className={s.sublist}>
             <li className={s.subitem}>
                <button className={s.subitem_button} onClick={() => {
                   changeFilter("All")
                }}>All
                </button>
             </li>

             <li>
                <button className={s.subitem_button} onClick={() => {
                   changeFilter("Active")
                }}>Active
                </button>
             </li>

             <li>
                <button className={s.subitem_button} onClick={() => {
                   changeFilter("Completed")
                }}>Completed
                </button>
             </li>
          </ul>
       </div>
   );
}
