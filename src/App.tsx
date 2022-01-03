import React from 'react';
import {Todolist, todolistPropsType} from "./components/Todolist/Todolist";

const dataTodolist: Array<todolistPropsType> = [
   {
      id: 0,
      isDown: true,
      label: "Html-Css",
   },

   {
      id: 1,
      isDown: true,
      label: "Js",
   },

   {
      id: 2,
      isDown: false,
      label: "ReactJs",
   },
]

const App = () => {
   return (
       <>
          <Todolist data={dataTodolist} title1={"Todolist-1"}/>
          <Todolist data={dataTodolist} title2={"Todolist-2"}/>
       </>
   );
}

export default App;
