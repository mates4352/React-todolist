import React, {useState} from 'react';
import {Todolist, dataTodolistType, changeFilterType} from "./components/Todolist/Todolist";

const App = () => {

   let [tasks, setState] = useState<Array<dataTodolistType>>(
       [
          {id: 0, isDown: true, label: "Html-Css"},
          {id: 1, isDown: true, label: "Js"},
          {id: 2, isDown: false, label: "ReactJs"},
       ]
   );

   let [filter, setFilter] = useState<changeFilterType>("All");

   const removeTask = (id: number) => {
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

   return (
       <Todolist
           tasks={tasksForTodoList}
           title={"Todolist"}
           removeTask={removeTask}
           changeFilter={changeFilter}/>
   );
}

export default App;
