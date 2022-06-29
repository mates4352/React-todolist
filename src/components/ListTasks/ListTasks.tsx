import React from 'react';
import s from "./ListTasks.module.scss";
import {TaskContainer} from "../Task/TaskContainer";
import {taskType} from "../../bll/task-reducers/tasks-reducer";

type ListTasksType = {
   tasks: Array<taskType>
};
export const ListTasks: React.FC<ListTasksType> = React.memo((props) => {
       const {tasks} = props;
       console.log('ListTasks')

       return (
           <ul className={s.list}>
              {tasks.map((task) => {
                     return (
                         <li className={s.item} key={task.id}>
                            <TaskContainer task={task}/>
                         </li>
                     )
                  }
              )}
           </ul>
       );
    }
)
