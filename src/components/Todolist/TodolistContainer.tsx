import React from 'react';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../bll/redux-store";
import {FilterValueType, tasksType} from "../../bll/task-reducers/tasks-reducer";
import {changeFilterTasks} from "../../bll/task-reducers/task.thunk";
import {addTaskCreateAction, changeTaskTextCreateAction} from "../../bll/task-reducers/task-create-actions";
import {ChangeTitleTActionCreate} from "../../bll/todolist-reducers/todolist-create-actions";

type TodolistContainerType = {
   id: string
   title: string
   filter: FilterValueType
};

export const TodolistContainer: React.FC<TodolistContainerType> = React.memo((props) => {
       const {
          id,
          title,
          filter,
       } = props
       console.log('todolist')

       const dispatch = useDispatch();
       const tasks = useSelector<state, tasksType>(state => state.tasks)

       const filterTasks = changeFilterTasks(tasks, id, filter)

       const changeTitle = (value: string): void => {
          dispatch(ChangeTitleTActionCreate(id, value))
       }

       const addValue = (value: string) => {
          dispatch(addTaskCreateAction(id, value))
       }

       return <Todolist
           id={id}
           title={title}
           filter={filter}
           filterTasks={filterTasks}
           changeTitle={changeTitle}
           addValue={addValue}
       />
    }
)
