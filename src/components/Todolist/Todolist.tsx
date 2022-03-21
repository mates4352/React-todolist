import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, createStyles, makeStyles, Theme} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > button': {
        borderRadius: '6px',
      },
    },
  }),
);

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
  changeTitle: (title: string, todolistId: string) => void
  changeValue: (value: string, taskId: string, todolistId: string) => void
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
    changeTitle,
    changeValue,
    changeCheckedTask
  }) => {
  const classes = useStyles();

  const isClassActiveButton = (value: string) => filter === value
    ? `${s.subitem_button_active}`
    : '';

  const addTaskTodolist = (value: string): void => {
    addTask(value, id);
  }

  const changeTodolistTitle = (value: string): void => {
    changeTitle(value, id)
  }

  return (
    <div className={s.todolist}>

      <Button className={s.buttonDelete} aria-label="Button delete" onClick={() => removeTodolist(id)}>
        <DeleteOutlineIcon fontSize="large" />
      </Button>

      <h1 className={s.title}><EditModeText text={title} changeValue={changeTodolistTitle}/></h1>

      <InputTodolist addTask={addTaskTodolist}/>

      <ul className={s.list}>
        {tasks.map((task) => {
            const changeTodolistTaskValue = (value: string) => {
              changeValue(value, task.id, id)
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
                  onClick={() => changeFilter("ALL", id)}
                  color="primary">
            All
          </Button>
        </li>

        <li>
          <Button className={isClassActiveButton("ACTIVE")}
                  onClick={() => changeFilter("ACTIVE", id)}
                  color="secondary" >
            Active
          </Button >
        </li>

        <li>
          <Button className={isClassActiveButton("COMPLETED")}
                  onClick={() => changeFilter("COMPLETED", id)}>
            Completed
          </Button>
        </li>
      </ul>
    </div>
  );
}
