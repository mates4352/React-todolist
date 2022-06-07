import s from './Todolist.module.scss'
import React, {useCallback, useEffect, useMemo} from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import {Button} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useDispatch, useSelector} from "react-redux";
import { RemoveTodolistActionCreate} from "../../bll/todolist-reducers/todolist-create-actions";
import {FilterValueType, tasksType} from "../../bll/task-reducers/tasks-reducer";
import {ListButtons} from "../ListButtons/ListButtons";
import {ListTasks} from "../ListTasks/ListTasks";
import {state} from "../../bll/redux-store";
import {changeFilterTasks} from "../../bll/task-reducers/task.thunk";
import {todolistsAPI} from "../../api/todolistsAPI";
import {taskAPI} from "../../api/taskAPI";
import {setTaskCreateAction} from "../../bll/task-reducers/task-create-actions";

type todolistType = {
   id: string
   title: string
   filter: FilterValueType
   changeTitle: (value: string) => void
   addValue: (value: string) => void
}

export const Todolist: React.FC<todolistType> = React.memo((props) => {
   const {
      id,
      title,
      filter,
      changeTitle,
      addValue,
   } = props
   const dispatch = useDispatch();
   const tasks = useSelector<state, tasksType>(state => state.tasks);
   const filterTasks = useCallback(() => changeFilterTasks(tasks, id, filter),[tasks, filter, id])
   const removeTodolist = () => {
      todolistsAPI.removeTodolist(id).then(() => dispatch(RemoveTodolistActionCreate(id)))
   }
   const updateText = (value: string) => {
      todolistsAPI.updateTodolist(id, value)
   }

   useEffect(() => {
      taskAPI.getTasks(id).then((tasks) => dispatch(setTaskCreateAction(id, tasks)))
   }, [])

   return (
       <div className={s.todolist}>

          <Button className={s.buttonDelete} aria-label="Button delete"
                  onClick={removeTodolist}>
             <DeleteOutlineIcon fontSize="large"/>
          </Button>

          <h1 className={s.title}><EditModeText text={title} updateText={updateText} changeValue={changeTitle}/></h1>

          <InputTodolist addValue={addValue}/>

          {filterTasks()[id].length !== 0 && <ListTasks id={id} filterTasks={filterTasks()}/>}

          <ListButtons id={id} filter={filter}/>
       </div>
   )
})
