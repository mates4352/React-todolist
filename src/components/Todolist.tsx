import React from 'react';

export type todoListPropsType = {
   id: number,
   label: string,
   isDown: boolean,
}

type propsType = {
   data: Array<todoListPropsType>
}

export const Todolist = (props: propsType) => {
   return (
       <>
          <h1>Todolist</h1>

          <input type="text"/>
          <button type={"button"}>+</button>

          <ul>
             {props.data.map((item) =>
                 <li>
                    <input type="checkbox" checked={item.isDown}/>
                    <label>{item.label}</label>
                 </li>
             )}
          </ul>

          <ul>
             <li>
                <button type={"button"}>All</button>
             </li>

             <li>
                <button type={"button"}>Active</button>
             </li>

             <li>
                <button type={"button"}>Completed</button>
             </li>
          </ul>
       </>
   );
}
