import React, {useCallback, useEffect} from 'react';
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import './App.scss';
import {todolistType} from "./bll/todolist-reducers/todoList-reducer";
import {useAppDispatch, useAppSelector} from "./bll/redux-store";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {addTodolist, getTodolits} from "./bll/todolist-reducers/todoList-thunk";

const App = () => {
   const dispatch = useAppDispatch()
   const todolist = useAppSelector<Array<todolistType>>(state => state.todolist)

   const addValue = useCallback((value: string) => {
      dispatch(addTodolist(value))
   }, [dispatch])

   useEffect(() => {
      dispatch(getTodolits())
   }, [dispatch])

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
