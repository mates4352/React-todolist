import React from 'react';
import s from "./ListTasks.module.scss";
import {changeTaskTextCreateAction} from "../../bll/task-reducers/task-create-actions";
import {Task} from "../Task/Task";
import {useDispatch} from "react-redux";
import {tasksType} from "../../bll/task-reducers/tasks-reducer";
import {TaskContainer} from "../Task/TaskContainer";

type ListTasksType = {
   id: string
   filterTasks: tasksType
};
export const ListTasks: React.FC<ListTasksType> = React.memo((props) => {
       const {id, filterTasks} = props;
       console.log('ListTasks')

       return (
           <ul className={s.list}>
              {filterTasks[id].map((task) => {
                     return (
                         <li className={s.item} key={task.id}>
                            <TaskContainer id={id} task={task}/>
                         </li>
                     )
                  }
              )}
           </ul>
       );
    }
)
