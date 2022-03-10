import s from './Todolist.module.scss'
import React, {ChangeEvent, useState} from "react";

export type dataTodolistType = {
  id: string
  text: string
  isDown: boolean
}

type todolistType = {
  id: string
  title: string
  tasks: Array<dataTodolistType>
  filter: string
  addTask: (value: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: changeFilterType, todolistId: string) => void
  changeCheckedTask: (taskId: string, todolistId: string) => void
}

export type changeFilterType = "ALL" | "ACTIVE" | "COMPLETED";

export const Todolist: React.FC<todolistType> = (
  {
    id,
    title,
    tasks,
    filter,
    addTask,
    removeTask,
    changeFilter,
    changeCheckedTask
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
      addTask(inputValue, id)
      setError('')
      setInputValue('')
    } else if (key.key === "Enter" && key.currentTarget.value === "") {
      setError('Title is required')
    }
  }
  const onClinkButton = () => {
    if (inputValue.trim() !== "") {
      addTask(inputValue, id)
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
                   onClick={() => changeCheckedTask(task.id, id)}
                   onKeyUp={key => key.key === "Enter" && changeCheckedTask(task.id, id)}/>

            <label htmlFor={task.id}>{task.text}</label>

            <button className={s.close} onClick={() => removeTask(task.id, id)}>
              X
            </button>
          </li>
        )}
      </ul>

      <ul className={s.sublist}>
        <li className={s.subitem}>
          <button className={isClassActiveButton("ALL")}
                  onClick={() => changeFilter("ALL", id)}>
            All
          </button>
        </li>

        <li>
          <button className={isClassActiveButton("ACTIVE")}
                  onClick={() => changeFilter("ACTIVE", id)}>
            Active
          </button>
        </li>

        <li>
          <button className={isClassActiveButton("COMPLETED")}
                  onClick={() => changeFilter("COMPLETED", id)}>
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}
