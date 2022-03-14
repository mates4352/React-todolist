import React, {useState} from 'react';
import {Todolist, changeFilterType, dataTodolistType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputTodolist} from "./components/InputTodolist/InputTodolist";
import s from './App.module.scss';

type todolist = {
  id: string
  title: string
  filter: string
}

type tasks = {
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

  const removeTask = (id: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter(item => item.id !== id)
    setTasks({...tasks})
  }

  const removeTodolist = (todolistId: string) => {
    delete tasks[todolistId]
    setTodolist(todolist.filter(todo => todo.id !== todolistId))
  }

  const addTodolist = (value: string) => {
    const newTodolist = {id: v1(), title: value, filter: "ALL"};
    setTodolist([...todolist, newTodolist]);
    setTasks({...tasks, [newTodolist.id]: []})
  }

  const addTask = (value: string, todolistId: string) => {
    const newTask = {id: v1(), isDown: true, text: value};
    tasks[todolistId] = [...tasks[todolistId], newTask]
    setTasks({...tasks})
  }

  const changeCheckedTask = (taskId: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId ? {...task, isDown: !task.isDown} : task)
    setTasks({...tasks})
  }

  const changeFilter = (value: changeFilterType, todolistId: string) => {
    const todo = todolist.find(item => item.id === todolistId)
    if (todo) {
      todo.filter = value
      setTodolist([...todolist])
    }
  }


  const changeTitle = (title: string, todolistId: string) => {
    const todo = todolist.find(el => el.id === todolistId);
    if(todo) {
      todo.title = title;
      setTodolist([...todolist])
    }
  }

  const changeValue = (value: string, taskId: string, todolistId: string) => {
    const todo = tasks[todolistId].find(item => item.id === taskId)
    if (todo) {
      todo.text = value
      setTasks({...tasks})
    }
  }

  const getFitlerTasks = (todo: todolist) => {
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
          const [id, tasks, title, filter] = [todo.id, getFitlerTasks(todo), todo.title, todo.filter]
          return (
            <Todolist
              key={id}
              id={id}
              tasks={tasks}
              title={title}
              removeTask={removeTask}
              removeTodolist={removeTodolist}
              changeFilter={changeFilter}
              changeTitle={changeTitle}
              changeValue={changeValue}
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
