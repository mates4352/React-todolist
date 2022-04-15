import React from 'react';
import {Todolist} from "./components/Todolist/Todolist";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';
import {
  AddTodolistTActionCreate,
  ChangeFilterActionCreate, ChangeTitleTActionCreate,
  RemoveTodolistActionCreate, todolistType,FilterValueType
} from "./store/todolist-reducers/todolist-reducer";
import {
  addTaskCreateAction, changeTaskStatusCreateAction, changeTaskTextCreateAction,
  removeTaskCreateAction, tasks, taskType
} from "./store/task-reducers/tasks-reducer";
import {state} from "./store/store";
import {Dispatch} from "redux";

type AppType = {
  state: state,
  dispatch: Dispatch
}

const App:React.FC<AppType> = ({state, dispatch}) => {

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

  const getFitlerTasks = (tasks: tasks, todo: todolistType): Array<taskType> => {
    switch (todo.filter) {
      case "ACTIVE":
        return tasks[todo.id].filter(((task: any) => task.isDown));

      case "COMPLETED":
        return tasks[todo.id].filter(((task: any) => !task.isDown));

      default:
        return tasks[todo.id];
    }
  }

  return (
    <div className={s.app}>
      <InputTodolist addTask={addTodolist} className={s.inputTodolist__size}/>
      <div className={s.app_todolists}>
        {state.todolist.map(todo => {
          const [id, title, filter, tasks] = [todo.id, todo.title, todo.filter, getFitlerTasks(state.tasks, todo)]
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
  );
}

export default App;
