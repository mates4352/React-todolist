import React from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';
import {
  AddTodolistTActionCreate,
  ChangeFilterActionCreate, ChangeTitleTActionCreate,
  RemoveTodolistActionCreate,FilterValueType
} from "./store/todolist-reducers/todolist-reducer";
import {
  addTaskCreateAction, changeFilterTasksCreateAction, changeTaskStatusCreateAction, changeTaskTextCreateAction,
  removeTaskCreateAction, tasksReducer,
} from "./store/task-reducers/tasks-reducer";
import {Context} from "./store/context";

const App = () => {
  return (
    <Context.Consumer>
      {store => {
        const state = store.getState();
        const dispatch = store.dispatch;

        const changeTodolistFilter = (filter: FilterValueType, todolistId: string):void => {
          dispatch(ChangeFilterActionCreate(todolistId, filter))
        }
        const removeTodolist = (todolistId: string):void => {
          dispatch(RemoveTodolistActionCreate(todolistId))
        }
        const addTodolist = (value: string):void => {
          dispatch(AddTodolistTActionCreate(value));
        }
        const changeTodolistTitle = (title: string, todolistId: string):void => {
          dispatch(ChangeTitleTActionCreate(todolistId, title))
        }

        const addTask = (value: string, todolistId: string):void => {
          dispatch(addTaskCreateAction(todolistId, value))
        }
        const removeTask = (id: string, todolistId: string):void => {
          dispatch(removeTaskCreateAction(todolistId, id))
        }
        const changeCheckedTask = (taskId: string, todolistId: string):void => {
          dispatch(changeTaskStatusCreateAction(todolistId, taskId))
        }
        const changeValueTask = (value: string, taskId: string, todolistId: string):void => {
          dispatch(changeTaskTextCreateAction(todolistId, taskId, value))
        }

        return <div className={s.app}>
          <InputTodolist addTask={addTodolist} className={s.inputTodolist__size}/>
          <div className={s.app_todolists}>
            {state.todolist.map(todo => {
              const [id, title, filter, tasks] = [todo.id, todo.title, todo.filter, tasksReducer(state.tasks, changeFilterTasksCreateAction(todo))]
              return (
                <Todolist
                  key={id}
                  id={id}
                  tasks={tasks}
                  title={title}
                  removeTask={removeTask}
                  removeTodolist={removeTodolist}
                  changeTodolistFilter={changeTodolistFilter}
                  changeTodolistTitle={changeTodolistTitle}
                  changeValueTask={changeValueTask}
                  filter={filter}
                  addTask={addTask}
                  changeCheckedTask={changeCheckedTask}/>
              )
            })}
          </div>
        </div>
      }

      }
    </Context.Consumer>
  );
}

export default App;
