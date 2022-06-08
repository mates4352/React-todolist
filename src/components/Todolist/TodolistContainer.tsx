import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {FilterValueType, tasksType} from "../../bll/task-reducers/tasks-reducer";
import {AddTask, SetTasks} from "../../bll/task-reducers/task-create-actions";
import {
   ChangeTitle,
   RemoveTodolist
} from "../../bll/todolist-reducers/todolist-create-actions";
import {todolistsAPI} from "../../api/todolistsAPI";
import {taskAPI} from "../../api/taskAPI";
import {state} from "../../bll/redux-store";
import {changeFilterTasks} from "../../bll/task-reducers/task.thunk";

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
       const tasks = useSelector<state, tasksType>(state => state.tasks);

       const changeTitle = useCallback((value: string): void => {
          dispatch(ChangeTitle(id, value))
       }, [dispatch, id])

       const addTask = useCallback((value: string) => {
          taskAPI.addTask(id, value).then((task) => dispatch(AddTask(task)))
       }, [dispatch, id])

       const filterTasks = useCallback(() => changeFilterTasks(tasks, id, filter), [tasks, filter, id])
       const removeTodolist = () => {
          todolistsAPI.removeTodolist(id).then(() => dispatch(RemoveTodolist(id)))
       }
       const updateTodolistText = useCallback((value: string) => {
          todolistsAPI.updateTodolist(id, value)
       }, [id])

       useEffect(() => {
          taskAPI.getTasks(id).then((tasks) => dispatch(SetTasks(id, tasks)))
       }, [])

       return <Todolist
           id={id}
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
