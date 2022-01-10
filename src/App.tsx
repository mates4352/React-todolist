import React, {useState} from 'react';
import {Todolist, todolistPropsType} from "./components/Todolist/Todolist";

const App = () => {
   let [tasks, setState] = useState<Array<todolistPropsType>>(
       [
          {id: 0, isDown: true, label: "Html-Css"},
          {id: 1, isDown: true, label: "Js"},
          {id: 2, isDown: false, label: "ReactJs"},
       ]
   );

   function removeTask(id: number) {
      let filterTasks = tasks.filter(item => item.id !== id)
      setState(filterTasks)
   }

   return (
       <>
          <Todolist data={tasks} title1={"Todolist-1"} removeTask={removeTask}/>
       </>
   );
}

export default App;
