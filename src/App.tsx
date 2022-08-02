import React, {useCallback, useEffect} from 'react';
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import './App.scss';
import {appStoreType, useAppDispatch, useAppSelector} from "./bll/redux-store";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {addTodolist, getTodolits} from "./bll/todolist-reducers/todoList-thunk";
import {LinearProgress} from '@material-ui/core';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";

const App = () => {
   const dispatch = useAppDispatch()
   const {todolist, app} = useAppSelector<appStoreType>(state => state)

   const addValue = useCallback((value: string) => {
      dispatch(addTodolist(value))
   }, [dispatch])

   useEffect(() => {
      dispatch(getTodolits())
   }, [dispatch])

   return (
       <>
          {app.status === 'loading' && <LinearProgress/>}

          <div className='app'>
             <ErrorSnackbar/>
             <InputTodolist addValue={addValue} className='inputTodolist__size'/>

             <div className='app_todolists'>
                {todolist.map(todo => {
                   const [todolistId, title, filter] = [todo.id, todo.title, todo.filter]
                   return (
                       <TodolistContainer
                           key={todolistId}
                           todolistId={todolistId}
                           entityStatus={todo.entityStatus}
                           title={title}
                           filter={filter}/>
                   )
                })}
             </div>
          </div>
       </>

   )
}

export default App;
