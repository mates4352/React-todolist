import React, {useCallback} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import s from './Task.module.scss';
import {TasksStatus} from "../../api/taskAPI";

export type TaskType = {
   task: taskType
   changeTaskTitle: (value: string) => void
   updateTaskStatus: () => void
   updateTaskText: (value: string) => void
   removeTask: () => void
};
export const Task: React.FC<TaskType> = React.memo((props) => {
   const {
      task,
      changeTaskTitle,
      updateTaskStatus,
      updateTaskText,
      removeTask
   } = props;
   console.log('Task')

   return (
       <article className={task.status === TasksStatus.New ? `${s.opacity} ${s.task}` : s.task}>
          <Checkbox
              checked={task.status === TasksStatus.Completed}
              onClick={updateTaskStatus}
              onKeyUp={key => key.key === "Enter" && updateTaskStatus}
              color="primary"
          />

          <EditModeText text={task.title} updateText={updateTaskText} changeValue={changeTaskTitle}/>

          <IconButton aria-label="Button delete task"
                      onClick={removeTask}>
             <DeleteIcon/>
          </IconButton>
       </article>
   );
})
