import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";

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
  removeTodolist: (todolistId: string) => void
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
    removeTodolist,
    changeFilter,
    changeCheckedTask
  }) => {

  const isClassActiveButton = (value: string) => filter === value
    ? `${s.subitem_button} ${s.subitem_button_active}`
    : s.subitem_button;

  const addTaskTodolist = (value: string) => {
    addTask(value, id);
  }

  return (
    <div className={s.todolist}>
      <button className={s.buttonDelete} onClick={() => removeTodolist(id)}>X</button>
      <h1 className={s.title}>{title}</h1>

      <InputTodolist addTask={addTaskTodolist}/>

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
