import React, {useState} from 'react';
import {Todolist, dataTodolistType, changeFilterType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

type todolist = {
  id: string
  title: string
  filter: string
}

const App = () => {

  const [todolistId1, todolistId2] = [v1(), v1()]

  let [todolist, setTodolist] = useState<Array<todolist>>([
    {id: todolistId1, title: 'Todolist1', filter: 'ACTIVE'},
    {id: todolistId2, title: 'Todolist2', filter: 'COMPLETED'},
  ])

  let [tasks, setTasks] = useState({
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

  const changeCheckedTask = (taskId: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId ? {...task, isDown: !task.isDown} : task)
    setTasks({...tasks})
  }

  const removeTask = (id: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter(item => item.id !== id)
    setTasks({...tasks})
  }

  const removeTodolist = (todolistId: string) => {
    delete tasks[todolistId]
    setTodolist(todolist.filter(todo => todo.id !== todolistId))
  }

  const changeFilter = (value: changeFilterType, todolistId: string) => {
    const todo = todolist.find(item => item.id === todolistId)
    if (todo) {
      todo.filter = value
      setTodolist([...todolist])
    }
  }

  const addTask = (value: string, todolistId: string) => {
    const newTask = {id: v1(), isDown: true, text: value};
    tasks[todolistId] = [...tasks[todolistId], newTask]
    setTasks({...tasks})
  }

  return (
    <>
      {todolist.map(todo => {
        const getFitlerTasks = () => {
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
          <Todolist
            key={todo.id}
            id={todo.id}
            tasks={getFitlerTasks()}
            title={todo.title}
            removeTask={removeTask}
            removeTodolist={removeTodolist}
            changeFilter={changeFilter}
            filter={todo.filter}
            addTask={addTask}
            changeCheckedTask={changeCheckedTask}/>
        )
      })}
    </>
  );
}

export default App;
