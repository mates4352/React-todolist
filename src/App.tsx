import React, {useState} from 'react';
import {Todolist, todolistPropsType, changeFilterType} from "./components/Todolist/Todolist";

const App = () => {

   let [tasks, setState] = useState<Array<todolistPropsType>>(
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

   let tasksForTodoList = tasks;

   const changeFilter = (value: changeFilterType) => {
      setFilter(value)
   }

   if (filter === "Active") {
      tasksForTodoList = tasks.filter(item => item.isDown);
   }

   if (filter === "Completed") {
      tasksForTodoList = tasks.filter(item => !item.isDown);
   }

   return (
       <>
          <Todolist
              tasks={tasksForTodoList}
              title1={"Todolist-1"}
              removeTask={removeTask}
              changeFilter={changeFilter}/>
       </>
   );
}

export default App;
