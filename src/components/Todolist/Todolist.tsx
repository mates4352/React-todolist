import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  addTaskCreateAction, changeFilterTasksCreateAction,
  changeTaskStatusCreateAction, changeTaskTextCreateAction,
  removeTaskCreateAction, tasksReducer,
  tasksType
} from "../../store/task-reducers/tasks-reducer";
import {
  ChangeFilterActionCreate,
  ChangeTitleTActionCreate,
  FilterValueType
} from "../../store/todolist-reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../store/store";

type todolistType = {
  id: string
  title: string
  filter: string
  removeTodolist: (todolistId: string) => void
}
export const Todolist: React.FC<todolistType> = (
  {
    id,
    title,
    filter,
    removeTodolist,
  }) => {

  const dispatch = useDispatch();
  const tasks = useSelector<state, tasksType>( state => state.tasks)
  const filterTasks = tasksReducer(tasks, changeFilterTasksCreateAction(id, filter))

  const changeValueTask = (value: string, taskId: string, todolistId: string): void => {
    dispatch(changeTaskTextCreateAction(todolistId, taskId, value))
  }

  const isClassActiveButton = (value: string) => filter === value
    ? `${s.subitem_button_active}`
    : '';

  const changeTitle = (value: string): void => {
    dispatch(ChangeTitleTActionCreate(id, value))
  }

  const addValue = (value: string) => {
    dispatch(addTaskCreateAction(id, value))
  }

  return (
    <div className={s.todolist}>

      <Button className={s.buttonDelete} aria-label="Button delete" onClick={() => removeTodolist(id)}>
        <DeleteOutlineIcon fontSize="large" />
      </Button>

      <h1 className={s.title}><EditModeText text={title} changeValue={changeTitle}/></h1>

      <InputTodolist addValue={addValue}/>

      <ul className={s.list}>
        {filterTasks[id].map((task) => {
            const changeTodolistTaskValue = (value: string) => {
              changeValueTask(value, task.id, id)
            }

            return (
              <li className={!task.isDown ? `${s.item_opacity} ${s.item}` : s.item} key={task.id}>
                <Checkbox
                  checked={task.isDown}
                  onClick={() => dispatch(changeTaskStatusCreateAction(id, task.id))}
                  onKeyUp={key => key.key === "Enter" && dispatch(changeTaskStatusCreateAction(id, task.id))}
                  defaultChecked
                  color="primary"
                />

                <EditModeText text={task.text} changeValue={changeTodolistTaskValue}/>

                <IconButton aria-label="Button delete task" onClick={() => dispatch(removeTaskCreateAction(task.id, id))}>
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
                  onClick={() => dispatch(ChangeFilterActionCreate(id, "ALL"))}
                  color="primary">
            All
          </Button>
        </li>

        <li>
          <Button className={isClassActiveButton("ACTIVE")}
                  onClick={() => dispatch(ChangeFilterActionCreate(id, "ACTIVE"))}
                  color="secondary" >
            Active
          </Button >
        </li>

        <li>
          <Button className={isClassActiveButton("COMPLETED")}
                  onClick={() => dispatch(ChangeFilterActionCreate(id, "COMPLETED"))}>
            Completed
          </Button>
        </li>
      </ul>
    </div>
  );
}
