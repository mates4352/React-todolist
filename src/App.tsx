import React, {Reducer, useReducer} from 'react';
import {Todolist, FilterValueType, dataTodolistType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';
import {
  todolistActionType, AddTodolistTActionCreate,
  ChangeFilterActionCreate, ChangeTitleTActionCreate,
  RemoveTodolistActionCreate,
  todolistReducer
} from "./store/todolist-reducers/todolist-reducer";
import {
  addTaskCreateAction, changeTaskStatusCreateAction, changeTaskTextCreateAction,
  removeTaskCreateAction,
  tasksActionType,
  tasksReducer
} from "./store/task-reducers/tasks-reducer";

export type todolist = {
  id: string
  title: string
  filter: string
}

export type tasks = {
  [todolistId: string]: Array<dataTodolistType>
}

const App = () => {
  console.log('h')
  const [todolistId1, todolistId2] = [v1(), v1()]

  let [todolist, setTodolist] = useReducer<Reducer<Array<todolist>, todolistActionType>>( todolistReducer , [
    {id: todolistId1, title: 'Todolist1', filter: 'ACTIVE'},
    {id: todolistId2, title: 'Todolist2', filter: 'COMPLETED'},
  ])

  let [tasks, setTasks] = useReducer<Reducer<tasks, tasksActionType>>( tasksReducer,{
      [todolistId1]: [
        {id: v1(), isDown: true, text: "Html-Css"},
        {id: v1(), isDown: true, text: "Js"},
        {id: v1(), isDown: false, text: "ReactJs"},
      ],
      [todolistId2]: [
        {id: v1(), isDown: true, text: "Html-Css"},
        {id: v1(), isDown: true, text: "Js"},
        {id: v1(), isDown: false, text: "ReactJs"},
      ]
    }
  );

  const changeTodolistFilter = (filter: FilterValueType, todolistId: string):void => {
    setTodolist(ChangeFilterActionCreate(todolistId, filter))
  }

  const removeTodolist = (todolistId: string):void => {
    setTodolist(RemoveTodolistActionCreate(todolistId))
  }

  const addTodolist = (value: string):void => {
    const action = AddTodolistTActionCreate(value);
    setTodolist(action);
    setTasks(action);
  }

  const changeTodolistTitle = (title: string, todolistId: string):void => {
    setTodolist(ChangeTitleTActionCreate(todolistId, title))
  }

  const addTask = (value: string, todolistId: string):void => {
    setTasks(addTaskCreateAction(todolistId, value))
  }

  const removeTask = (id: string, todolistId: string):void => {
    setTasks(removeTaskCreateAction(todolistId, id))
  }

  const changeCheckedTask = (taskId: string, todolistId: string):void => {
    setTasks(changeTaskStatusCreateAction(todolistId, taskId))
  }

  const changeValueTask = (value: string, taskId: string, todolistId: string):void => {
    setTasks(changeTaskTextCreateAction(todolistId, taskId, value))
  }

  const getFitlerTasks = (todo: todolist):Array<dataTodolistType> => {
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
        {todolist.map(todo => {
          const [id, title, filter, tasks] = [todo.id, todo.title, todo.filter, getFitlerTasks(todo)]
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
