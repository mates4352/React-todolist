import React, {useCallback, useEffect} from 'react';
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import './App.scss';
import {appStoreType, useAppDispatch, useAppSelector} from "./bll/redux-store";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {addTodolist, getTodolits} from "./bll/todolist-reducers/todoList-thunk";
import {LinearProgress} from '@material-ui/core';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Routes, Route, Navigate, NavLink} from 'react-router-dom';
import {Login} from "./components/Login/Login";
import {deleteLogin, isMe} from "./bll/auth/auth-thunk";

const App = () => {
   const dispatch = useAppDispatch()
   const {todolist, app, auth} = useAppSelector<appStoreType>(state => state)

   const addValue = useCallback((value: string) => {
      dispatch(addTodolist(value))
   }, [dispatch])

   const endPage = () => {
      dispatch(deleteLogin())
   }

   useEffect(() => {
      dispatch(isMe())
   }, [auth.isLoggedIn, dispatch])

   return (
       <>
          {app.status === 'loading' && <LinearProgress/>}
          <ErrorSnackbar/>

          <Routes>
             <Route path={'/'} element={<Navigate to={'/main'}/>}/>
             <Route path={'/*'} element={<Navigate to={'/main'}/>}/>
             <Route path={'/main'} element={!auth.isLoggedIn ? <Navigate to={'/login'}/> :
                <div className='app'>
                   <button
                       className={'button'}
                       onClick={endPage}>
                      END
                   </button>

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
             }/>
             <Route path={'/login'} element={auth.isLoggedIn ? <Navigate to={'/main'}/> : <Login/>}/>
             <Route path={'/login/*'} element={<Navigate to={'/login'}/>}/>
          </Routes>
       </>

   )
}

export default App;
