import React from 'react';
import s from "./ListTasks.module.scss";
import {changeTaskTextCreateAction} from "../../bll/task-reducers/task-create-actions";
import {Task} from "../Task/Task";
import {useDispatch} from "react-redux";
import {tasksType} from "../../bll/task-reducers/tasks-reducer";

type ListTasksType = {
   id: string
   filterTasks: tasksType
};
export const ListTasks: React.FC<ListTasksType> = React.memo((props) => {
       const {id, filterTasks} = props;
       const dispatch = useDispatch();
       console.log('ListTasks')

       return (
           <ul className={s.list}>
              {filterTasks[id].map((task) => {
                     return (
                         <li className={!task.isDown ? `${s.opacity} ${s.item}` : s.item} key={task.id}>
                            <Task id={id} task={task}/>
                         </li>
                     )
                  }
              )}
           </ul>
       );
    }
)