import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import {changeTaskStatusCreateAction, removeTaskCreateAction} from "../../bll/task-reducers/task-create-actions";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch} from "react-redux";
import {taskType} from "../../bll/task-reducers/tasks-reducer";

type TaskType = {
   id: string
   task: taskType
   changeTodolistTaskValue: (value: string) => void
};
export const Task: React.FC<TaskType> = React.memo((props) => {
   const {id, task, changeTodolistTaskValue} = props;
   const dispatch = useDispatch();

   return (
       <>
          <Checkbox
              checked={task.isDown}
              onClick={() => dispatch(changeTaskStatusCreateAction(id, task.id))}
              onKeyUp={key => key.key === "Enter" && dispatch(changeTaskStatusCreateAction(id, task.id))}
              defaultChecked
              color="primary"
          />

          <EditModeText text={task.text} changeValue={changeTodolistTaskValue}/>

          <IconButton aria-label="Button delete task"
                      onClick={() => dispatch(removeTaskCreateAction(id, task.id))}>
             <DeleteIcon/>
          </IconButton>
       </>
   );
})
