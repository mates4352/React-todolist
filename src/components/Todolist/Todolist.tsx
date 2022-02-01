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
  filter: string
  getValue: (value: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: changeFilterType) => void
  changeFilterTasks: (taskId: string) => void
}

export type changeFilterType = "All" | "Active" | "Completed";

export const Todolist: React.FC<todolistType> = ({
                                                   title,
                                                   tasks,
                                                   filter,
                                                   getValue,
                                                   removeTask,
                                                   changeFilter,
                                                   changeFilterTasks
                                                 }) => {

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>('');
  const isClassActiveButton = (value: string) => filter === value
    ? `${s.subitem_button} ${s.subitem_button_active}`
    : s.subitem_button;

  const onChangeInput = (element: ChangeEvent<HTMLInputElement>) => {
    setInputValue(element.currentTarget.value)
  }

  const onKeyUpInput = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter" && key.currentTarget.value !== "") {
      getValue(inputValue)
      setError('')
      setInputValue('')
    } else if (key.key === "Enter" && key.currentTarget.value === "") {
      setError('Title is required')
    }
  }
  const onClinkButton = () => {
    if (inputValue.trim() !== "") {
      getValue(inputValue)
      setError('')
      setInputValue('')
    } else {
      setError('Title is required')
    }
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

      {error &&
          <small className={s.error}>{error}</small>
      }


      <ul className={s.list}>
        {tasks.map((task) =>
          <li className={!task.isDown ? `${s.item_opacity} ${s.item}` : s.item} key={task.id}>
            <input type="checkbox"
                   id={task.id}
                   checked={task.isDown}
                   onClick={() => changeFilterTasks(task.id)}
                   onKeyUp={key => key.key === "Enter" && changeFilterTasks(task.id)}/>

            <label htmlFor={task.id}>{task.text}</label>

            <button className={s.close} onClick={() => removeTask(task.id)}>
              X
            </button>
          </li>
        )}
      </ul>

      <ul className={s.sublist}>
        <li className={s.subitem}>
          <button className={isClassActiveButton("All")}
                  onClick={() => changeFilter("All")}>
            All
          </button>
        </li>

        <li>
          <button className={isClassActiveButton("Active")}
                  onClick={() => changeFilter("Active")}>
            Active
          </button>
        </li>

        <li>
          <button className={isClassActiveButton("Completed")}
                  onClick={() => changeFilter("Completed")}>
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}
