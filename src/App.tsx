import React, {useState} from 'react';
import {Todolist, dataTodolistType, changeFilterType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

const App = () => {

  let [tasks, setTasks] = useState<Array<dataTodolistType>>(
    [
      {id: v1(), isDown: true, text: "Html-Css"},
      {id: v1(), isDown: true, text: "Js"},
      {id: v1(), isDown: false, text: "ReactJs"},
    ]
  );
  let [filter, setFilter] = useState<changeFilterType>("All");

  const changeFilterTasks = (taskId: string) => {
    setTasks(tasks.map( task => task.id === taskId ? {...task, isDown: !task.isDown} : task))
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(item => item.id !== id))
  }

  const changeFilter = (value: changeFilterType) => {
    setFilter(value)
  }

  const getTasks = () => {
    switch (filter) {
      case "Active":
        return tasks.filter((task => task.isDown));

      case "Completed":
        return tasks.filter((task => !task.isDown));

      default:
        return tasks;
    }
  }
  const tasksForTodoList = getTasks();

  const getValue = (value: string) => {
    const task = {id: v1(), isDown: true, text: value};
    setTasks([...tasks, task])
  }

  return (
    <Todolist
      tasks={tasksForTodoList}
      title={"Todolist"}
      removeTask={removeTask}
      changeFilter={changeFilter}
      getValue={getValue}
      changeFilterTasks={changeFilterTasks}/>
  );
}

export default App;
