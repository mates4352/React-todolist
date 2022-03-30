import React, {useState} from 'react';
import {Todolist, FilterValueType, dataTodolistType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';

export type todolist = {
  id: string
  title: string
  filter: string
}

export type tasks = {
  [todolistId: string]: Array<dataTodolistType>
}

const App = () => {

  const [todolistId1, todolistId2] = [v1(), v1()]

  let [todolist, setTodolist] = useState<Array<todolist>>([
    {id: todolistId1, title: 'Todolist1', filter: 'ACTIVE'},
    {id: todolistId2, title: 'Todolist2', filter: 'COMPLETED'},
  ])

  let [tasks, setTasks] = useState<tasks>({
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
    const todo = todolist.map(item => item.id === todolistId ? {...item, filter: filter} : item)
    setTodolist([...todo])
  }

  const removeTodolist = (todolistId: string):void => {
    delete tasks[todolistId]
    setTodolist(todolist.filter(todo => todo.id !== todolistId))
  }

  const addTodolist = (value: string):void => {
    const newTodolist = {id: v1(), title: value, filter: "ALL"};
    setTodolist([...todolist, newTodolist]);
    setTasks({...tasks, [newTodolist.id]: []})
  }

  const changeTodolistTitle = (title: string, todolistId: string):void => {
    const todo = todolist.map(item => item.id === todolistId ? {...item, title: title} : item)
    setTodolist([...todo])
  }

  const addTask = (value: string, todolistId: string):void => {
    const newTask = {id: v1(), isDown: true, text: value};
    tasks[todolistId] = [...tasks[todolistId], newTask]
    setTasks({...tasks})
  }

  const removeTask = (id: string, todolistId: string):void => {
    tasks[todolistId] = tasks[todolistId].filter(item => item.id !== id)
    setTasks({...tasks})
  }

  const changeCheckedTask = (taskId: string, todolistId: string):void => {
    tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId ? {...task, isDown: !task.isDown} : task)
    setTasks({...tasks})
  }

  const changeValueTask = (value: string, taskId: string, todolistId: string):void => {
    tasks[todolistId] = tasks[todolistId].map(item => item.id === taskId ? {...item, text: value} : item)
    setTasks({...tasks})
  }

  const getFitlerTasks = (todo: todolist):Array<dataTodolistType> => {
    switch (todo.filter) {
      case "ACTIVE":
        return tasks[todo.id].filter((task => task.isDown));

      case "COMPLETED":
        return tasks[todo.id].filter((task => !task.isDown));

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
