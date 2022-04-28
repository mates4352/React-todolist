import React from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';
import {
  todolistType
} from "./bll/todolist-reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {state} from "./bll/redux-store";
import {AddTodolistTActionCreate, RemoveTodolistActionCreate} from "./bll/todolist-reducers/todolist-create-actions";

const App = () => {
  const dispatch = useDispatch()
  const todolist = useSelector<state, Array<todolistType>>( state => state.todolist)

  const removeTodolist = (todolistId: string): void => {
    dispatch(RemoveTodolistActionCreate(todolistId))
  }

  const addValue = (value: string) => {
    dispatch(AddTodolistTActionCreate(value))
  }

  return (
  <div className={s.app}>
    <InputTodolist addValue={addValue} className={s.inputTodolist__size}/>
    <div className={s.app_todolists}>
      {todolist.map(todo => {
        const [id, title, filter] = [todo.id, todo.title, todo.filter]
        return (
          <Todolist
            key={id}
            id={id}
            title={title}
            filter={filter}
            removeTodolist={removeTodolist}/>
        )
      })}
    </div>
  </div>
)
  ;
}

export default App;
