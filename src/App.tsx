import React, {useCallback, useEffect, useMemo} from 'react';
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import './App.scss';
import {todolistType} from "./bll/todolist-reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {state} from "./bll/redux-store";
import {AddTodolistTActionCreate, SetTodolists} from "./bll/todolist-reducers/todolist-create-actions";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {todolistsAPI} from "./api/todolistsAPI";

const App = () => {
   const dispatch = useDispatch()
   const todolist = useSelector<state, Array<todolistType>>(state => state.todolist)

   const addValue = useCallback((value: string) => {
      dispatch(AddTodolistTActionCreate(value))
   }, [dispatch])

   useEffect(() => {
      todolistsAPI.getTodolists().then((data) => {
         dispatch(SetTodolists(data))
      })
   }, [])


   return (
       <div className='app'>
          <InputTodolist addValue={addValue} className='inputTodolist__size'/>

          <div className='app_todolists'>
             {todolist.map(todo => {
                const [id, title, filter] = [todo.id, todo.title, todo.filter]
                return (
                    <TodolistContainer
                        key={id}
                        id={id}
                        title={title}
                        filter={filter}/>
                )
             })}
          </div>
       </div>
   )
}

export default App;
