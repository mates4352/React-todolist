import s from './Todolist.module.scss'
import React, {ChangeEvent, useState} from "react";

export type dataTodolistType = {
  id: string
  text: string
  isDown: boolean
}

type todolistType = {
  title: string
  tasks: Array<dataTodolistType>
  removeTask: (id: string) => void;
  changeFilter: (value: changeFilterType) => void;
  getValue: (value: string) => void;
  changeFilterTasks: (taskId: string) => void;
}

export type changeFilterType = "All" | "Active" | "Completed";

export const Todolist: React.FC<todolistType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   getValue,
                                                   changeFilterTasks
                                                 }) => {

  const [inputValue, setInputValue] = useState('');
  const onChangeInput = (element: ChangeEvent<HTMLInputElement>) => {
    setInputValue(element.currentTarget.value)
  }
  const onKeyUpInput = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter" && key.currentTarget.value !== "") {
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
        <input
          className={s.input}
          type="text"
          value={inputValue}
          onChange={element => onChangeInput(element)}
          onKeyUp={key => onKeyUpInput(key)}/>

        <button className={s.button}
                type={"button"}
                onClick={onClinkButton}>
          +
        </button>
      </div>

      <ul className={s.list}>
        {tasks.map((item) =>
          <li className={s.item} key={item.id}>
            <input type="checkbox"
                   id={item.id}
                   checked={item.isDown}
                   onClick={() => changeFilterTasks(item.id)}
                   onKeyUp={key => key.key === "Enter" && changeFilterTasks(item.id)}/>

            <label htmlFor={item.id}>{item.text}</label>

            <button className={s.close} onClick={() => removeTask(item.id)}>
              X
            </button>
          </li>
        )}
      </ul>

      <ul className={s.sublist}>
        <li className={s.subitem}>
          <button className={s.subitem_button} onClick={() => changeFilter("All")}>
            All
          </button>
        </li>

        <li>
          <button className={s.subitem_button} onClick={() => changeFilter("Active")}>
            Active
          </button>
        </li>

        <li>
          <button className={s.subitem_button} onClick={() => changeFilter("Completed")}>
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}
