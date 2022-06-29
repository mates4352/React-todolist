import React, {useCallback, useEffect} from 'react';
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import './App.scss';
import {todolistType} from "./bll/todolist-reducers/todolist-reducer";
import {useAppDispatch, useAppSelector} from "./bll/redux-store";
import {AddTodolist, SetTodolists} from "./bll/todolist-reducers/todolist-create-actions";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {todolistsAPI} from "./api/todolistsAPI";
import {addTodolist, getTodolits} from "./bll/todolist-reducers/todolist-thunk";

const App = () => {
   const dispatch = useAppDispatch()
   const todolist = useAppSelector<Array<todolistType>>(state => state.todolist)

   const addValue = useCallback((value: string) => {
      dispatch(addTodolist(value))
   }, [dispatch])

   useEffect(() => {
      dispatch(getTodolits())
   }, [])

   return (
       <div className='app'>
          <InputTodolist addValue={addValue} className='inputTodolist__size'/>

          <div className='app_todolists'>
             {todolist.map(todo => {
                const [todolistId, title, filter] = [todo.id, todo.title, todo.filter]
                return (
                    <TodolistContainer
                        key={todolistId}
                        todolistId={todolistId}
                        title={title}
                        filter={filter}/>
                )
             })}
          </div>
       </div>
   )
}

export default App;
