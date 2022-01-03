import React from 'react';
import { Todolist, todoListPropsType } from "./components/Todolist";

const dataTodolist: Array<todoListPropsType> = [
   {
      id: 0,
      isDown: true,
      label: "Html",
   },

   {
      id: 1,
      isDown: true,
      label: "Js",
   },

   {
      id: 2,
      isDown: false,
      label: "Css",
   },
]

const App = () => {
   return (
       <>
          <Todolist data={dataTodolist}/>
       </>
   );
}

export default App;
