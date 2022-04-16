import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {tasks} from "../../store/task-reducers/tasks-reducer";
import {FilterValueType} from "../../store/todolist-reducers/todolist-reducer";

type todolistType = {
  id: string
  title: string
  tasks: tasks
  filter: string
  addTask: (value: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistFilter: (value: FilterValueType, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
  changeValueTask: (value: string, taskId: string, todolistId: string) => void
  changeCheckedTask: (taskId: string, todolistId: string) => void
}


export const Todolist: React.FC<todolistType> = (
  {
    id,
    title,
    tasks,
    filter,
    addTask,
    removeTask,
    removeTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    changeValueTask,
    changeCheckedTask
  }) => {

  const isClassActiveButton = (value: string) => filter === value
    ? `${s.subitem_button_active}`
    : '';

  const addTaskTodolist = (value: string): void => {
    addTask(value, id);
  }

  const changeTitle = (value: string): void => {
    changeTodolistTitle(value, id)
  }

  return (
    <div className={s.todolist}>

      <Button className={s.buttonDelete} aria-label="Button delete" onClick={() => removeTodolist(id)}>
        <DeleteOutlineIcon fontSize="large" />
      </Button>

      <h1 className={s.title}><EditModeText text={title} changeValue={changeTitle}/></h1>

      <InputTodolist addTask={addTaskTodolist}/>

      <ul className={s.list}>
        {tasks[id].map((task) => {
            const changeTodolistTaskValue = (value: string) => {
              changeValueTask(value, task.id, id)
            }
            return (
              <li className={!task.isDown ? `${s.item_opacity} ${s.item}` : s.item} key={task.id}>
                <Checkbox
                  checked={task.isDown}
                  onClick={() => changeCheckedTask(task.id, id)}
                  onKeyUp={key => key.key === "Enter" && changeCheckedTask(task.id, id)}
                  defaultChecked
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />

                <EditModeText text={task.text} changeValue={changeTodolistTaskValue}/>

                <IconButton aria-label="Button delete" onClick={() => removeTask(task.id, id)}>
                  <DeleteIcon/>
                </IconButton>
              </li>
            )
          }
        )}
      </ul>

      <ul className={s.sublist}>
        <li className={s.subitem}>
          <Button className={isClassActiveButton("ALL")}
                  onClick={() => changeTodolistFilter("ALL", id)}
                  color="primary">
            All
          </Button>
        </li>

        <li>
          <Button className={isClassActiveButton("ACTIVE")}
                  onClick={() => changeTodolistFilter("ACTIVE", id)}
                  color="secondary" >
            Active
          </Button >
        </li>

        <li>
          <Button className={isClassActiveButton("COMPLETED")}
                  onClick={() => changeTodolistFilter("COMPLETED", id)}>
            Completed
          </Button>
        </li>
      </ul>
    </div>
  );
}
