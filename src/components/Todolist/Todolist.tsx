import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import {Button} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {FilterValueType, tasksType, taskType} from "../../bll/task-reducers/tasks-reducer";
import {ListButtons} from "../ListButtons/ListButtons";
import {ListTasks} from "../ListTasks/ListTasks";
import {appStatusType} from "../../bll/app-reducers/app-reduer";

type todolistType = {
   todolistId: string
   title: string
   filter: FilterValueType
   entityStatus: appStatusType
   tasks: Array<taskType>
   changeTitle: (value: string) => void
   addTask: (value: string) => void
   removeTodolist: () => void
   updateTodolistText: (value: string) => void
}

export const Todolist: React.FC<todolistType> = React.memo((props) => {
   const {
      todolistId,
      title,
      filter,
      entityStatus,
      tasks,
      changeTitle,
      addTask,
      removeTodolist,
      updateTodolistText,
   } = props

   return (
       <div className={s.todolist}>

          <Button
              className={s.buttonDelete}
              disabled={entityStatus === 'loading'}
              aria-label="Button delete"
              onClick={removeTodolist}
          >
             <DeleteOutlineIcon fontSize="large"/>
          </Button>

          <h1 className={s.title}><EditModeText text={title} updateText={updateTodolistText} changeValue={changeTitle}/>
          </h1>

          <InputTodolist addValue={addTask} entityStatus={entityStatus}/>

          {tasks && <ListTasks tasks={tasks}/>}

          <ListButtons todolistId={todolistId} filter={filter}/>
       </div>
   )
})
