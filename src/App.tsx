import React, {useState} from 'react';
import {Todolist, dataTodolistType, changeFilterType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

const App = () => {

   let [tasks, setState] = useState<Array<dataTodolistType>>(
       [
          {id: v1(), isDown: true, label: "Html-Css"},
          {id: v1(), isDown: true, label: "Js"},
          {id: v1(), isDown: false, label: "ReactJs"},
       ]
   );

   let [filter, setFilter] = useState<changeFilterType>("All");

   const removeTask = (id: string) => {
      setState(tasks.filter(item => item.id !== id))
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
      const task = {id: v1(), isDown: true, label: value};
      setState( [...tasks, task])
   }

   return (
       <Todolist
           tasks={tasksForTodoList}
           title={"Todolist"}
           removeTask={removeTask}
           changeFilter={changeFilter}
           getValue = {getValue}/>
   );
}

export default App;
