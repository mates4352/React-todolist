import React, {useCallback, useEffect, useMemo} from 'react';
import {Todolist} from "./Todolist";
import {FilterValueType, tasksType, taskType} from "../../bll/task-reducers/tasks-reducer";
import {
   ChangeTitle,
} from "../../bll/todolist-reducers/todoList-create-actions/todoList-create-actions";
import {useAppDispatch, useAppSelector} from "../../bll/redux-store";
import {getTasks, setTask} from "../../bll/task-reducers/task-thunk";
import {deleteTodolist, updateTodolistTitle} from "../../bll/todolist-reducers/todoList-thunk";
import {appStatusType} from "../../bll/app-reducers/app-reduer";

type TodolistContainerType = {
   todolistId: string
   title: string
   filter: FilterValueType
   entityStatus: appStatusType
};

export const TodolistContainer: React.FC<TodolistContainerType> = React.memo((props) => {
       const {
          todolistId,
          title,
          filter,
          entityStatus,
       } = props
       console.log('todolist', title)
       const dispatch = useAppDispatch()
       const tasks = useAppSelector<Array<taskType>>(state => state.tasks[todolistId])

       const changeTitle = useCallback((value: string): void => {
          dispatch(ChangeTitle(todolistId, value))
       }, [dispatch, todolistId])

       const addTask = useCallback((value: string) => {
          dispatch(setTask(todolistId, value));
       }, [dispatch, todolistId])

       const removeTodolist = useCallback(() => {
          dispatch(deleteTodolist(todolistId))
       }, [dispatch, todolistId])

       const updateTodolistText = useCallback((value: string) => {
          dispatch(updateTodolistTitle(todolistId, value))
       }, [dispatch, todolistId])

       useEffect(() => {
          dispatch(getTasks(todolistId, filter))
       }, [dispatch, filter, todolistId])

   return <Todolist
           todolistId={todolistId}
           title={title}
           filter={filter}
           entityStatus={entityStatus}
           changeTitle={changeTitle}
           addTask={addTask}
           tasks={tasks}
           removeTodolist={removeTodolist}
           updateTodolistText={updateTodolistText}/>
    }
)
