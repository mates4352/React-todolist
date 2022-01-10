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

   function removeTask(id: number) {
      let filterTasks = tasks.filter(item => item.id !== id)
      setState(filterTasks)
   }

   function changeFilter(value: changeFilterType) {
      setFilter(value)
   }

   let tasksForTodoList = tasks;

   if (filter === "Active") {
      tasksForTodoList = tasks.filter(item => item.isDown === true);
   }

   if (filter === "Completed") {
      tasksForTodoList = tasks.filter(item => item.isDown === false);
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
