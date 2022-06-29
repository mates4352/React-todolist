import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {FilterValueType, tasksType, taskType} from "../../bll/task-reducers/tasks-reducer";
import {
   ChangeTitle,
} from "../../bll/todolist-reducers/todolist-create-actions";
import {useAppDispatch, useAppSelector} from "../../bll/redux-store";
import {getTasks, setTask} from "../../bll/task-reducers/task-thunk";
import {TasksStatus} from "../../api/taskAPI";
import {deleteTodolist, updateTodolistTitle} from "../../bll/todolist-reducers/todolist-thunk";

type TodolistContainerType = {
   todolistId: string
   title: string
   filter: FilterValueType
};

export const TodolistContainer: React.FC<TodolistContainerType> = React.memo((props) => {
       const {
          todolistId,
          title,
          filter,
       } = props
       console.log('todolist', title)
       const dispatch = useAppDispatch()
       const tasks = useAppSelector<tasksType>(state => state.tasks)

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
       }, [todolistId])

       useEffect(() => {
          dispatch(getTasks(todolistId))
       }, [])

      const filterTasks = useCallback(() => {
         switch (filter) {
            case "ACTIVE":
               return {...tasks, [todolistId]: tasks[todolistId].filter((task: taskType) => task.status === TasksStatus.Completed)}
            case "COMPLETED":
               return {...tasks, [todolistId]: tasks[todolistId].filter((task: taskType) => task.status === TasksStatus.New)}
            default:
               return tasks;
         }
      }, [tasks, filter, todolistId])

       return <Todolist
           todolistId={todolistId}
           title={title}
           filter={filter}
           changeTitle={changeTitle}
           addTask={addTask}
           filterTasks={filterTasks}
           removeTodolist={removeTodolist}
           updateTodolistText={updateTodolistText}
       />
    }
)
