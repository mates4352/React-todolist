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
   changeTodolistTaskValue: (value: string) => void
   updateText: (value: string) => void
   changeTaskStatus: () => void
   removeTask: () => void
};
export const Task: React.FC<TaskType> = React.memo((props) => {
   const {
      task,
      changeTodolistTaskValue,
      updateText,
      changeTaskStatus,
      removeTask
   } = props;
   console.log('Task')

   return (
       <article className={task.status === TasksStatus.New ? `${s.opacity} ${s.task}` : s.task}>
          <Checkbox
              checked={task.status === TasksStatus.Completed}
              onClick={changeTaskStatus}
              onKeyUp={key => key.key === "Enter" && changeTaskStatus}
              color="primary"
          />

          <EditModeText text={task.title} updateText={updateText} changeValue={changeTodolistTaskValue}/>

          <IconButton aria-label="Button delete task"
                      onClick={removeTask}>
             <DeleteIcon/>
          </IconButton>
       </article>
   );
})
