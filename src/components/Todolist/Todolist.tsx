import s from './Todolist.module.scss'

export type todolistPropsType = {
   id: number,
   label: string,
   isDown: boolean,
}

type dataPropsType = {
   tasks: Array<todolistPropsType>,
   title1?: string,
   title2?: string,
   removeTask: (id: number) => void,
   changeFilter: (value: changeFilterType) => void;
}

export type changeFilterType = "All" | "Active" | "Completed";


export const Todolist = (props: dataPropsType) => {
   const title = props.title1 || props.title2 || "Todolist";

   return (
       <div className={s.todolist}>
          <h1 className={s.title}>{title}</h1>

          <div className={s.input_wrap}>
             <input className={s.input} type="text"/>
             <button className={s.button} type={"button"}>+</button>
          </div>

          <ul className={s.list}>
             {props.tasks.map((item) =>
                 <li className={s.item}>
                    <input type="checkbox" checked={item.isDown}/>
                    <label>{item.label}</label>
                    <button className={s.close} onClick={ () => { props.removeTask(item.id) } }>X</button>
                 </li>
             )}
          </ul>

          <ul className={s.sublist}>
             <li className={s.subitem}>
                <button className={s.subitem_button} onClick={ () => {props.changeFilter("All")} }>All</button>
             </li>

             <li>
                <button className={s.subitem_button} onClick={ () => {props.changeFilter("Active")} }>Active</button>
             </li>

             <li>
                <button className={s.subitem_button} onClick={ () => {props.changeFilter("Completed")} }>Completed</button>
             </li>
          </ul>
       </div>
   );
}
