import s from './Todolist.module.scss'

export type todolistPropsType = {
   id: number,
   label: string,
   isDown: boolean,
}

type dataPropsType = {
   data: Array<todolistPropsType>,
   title1?: string,
   title2?: string,
}

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
             {props.data.map((item) =>
                 <li className={s.item}>
                    <input type="checkbox" checked={item.isDown}/>
                    <label>{item.label}</label>
                 </li>
             )}
          </ul>

          <ul className={s.sublist}>
             <li className={s.subitem}>
                <button className={s.subitem_button} type={"button"}>All</button>
             </li>

             <li>
                <button className={s.subitem_button} type={"button"}>Active</button>
             </li>

             <li>
                <button className={s.subitem_button} type={"button"}>Completed</button>
             </li>
          </ul>
       </div>
   );
}
