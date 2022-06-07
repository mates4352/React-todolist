import React, {useCallback} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import s from './Task.module.scss';

export type TaskType = {
   task: taskType
   changeTodolistTaskValue: (value: string) => void
   changeTaskStatus: () => void
   onKeyChangeTaskStatus: () => void
   removeTask: () => void
};
export const Task: React.FC<TaskType> = React.memo((props) => {
   const {
      task,
      changeTodolistTaskValue,
      changeTaskStatus,
      onKeyChangeTaskStatus,
      removeTask
   } = props;
   console.log('Task')

   return (
       <article className={!task.completed ? `${s.opacity} ${s.task}` : s.task}>
          <Checkbox
              checked={task.completed}
              onClick={changeTaskStatus}
              onKeyUp={key => key.key === "Enter" && onKeyChangeTaskStatus}
              color="primary"
          />

          <EditModeText text={task.title} changeValue={changeTodolistTaskValue}/>

          <IconButton aria-label="Button delete task"
                      onClick={removeTask}>
             <DeleteIcon/>
          </IconButton>
       </article>
   );
})
