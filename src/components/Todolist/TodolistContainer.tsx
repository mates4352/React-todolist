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
       console.log('todolist')
       const dispatch = useDispatch();
       const tasks = useSelector<state, tasksType>(state => state.tasks);

       const changeTitle = useCallback((value: string): void => {
          dispatch(ChangeTitle(todolistId, value))
       }, [dispatch, todolistId])

       const addTask = useCallback((value: string) => {
          taskAPI.addTask(todolistId, value).then((task) => dispatch(AddTask(task)))
       }, [dispatch, todolistId])

       const filterTasks = useCallback(() => changeFilterTasks(tasks, todolistId, filter), [tasks, filter, todolistId])
       const removeTodolist = () => {
          todolistsAPI.removeTodolist(todolistId).then(() => dispatch(RemoveTodolist(todolistId)))
       }
       const updateTodolistText = useCallback((value: string) => {
          todolistsAPI.updateTodolist(todolistId, value)
       }, [todolistId])

       useEffect(() => {
          taskAPI.getTasks(todolistId).then((tasks) => dispatch(SetTasks(todolistId, tasks)))
       }, [])

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
