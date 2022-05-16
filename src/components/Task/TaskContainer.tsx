import React, {useCallback} from 'react';
import {
   changeTaskStatusCreateAction,
   changeTaskTextCreateAction,
   removeTaskCreateAction
} from "../../bll/task-reducers/task-create-actions";
import {useDispatch} from "react-redux";
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import {Task} from "./Task";

type TaskContainerType = {
   id: string
   task: taskType
};
export const TaskContainer: React.FC<TaskContainerType> = React.memo((props) => {
   const {id, task} = props;
   const dispatch = useDispatch();
   const changeTodolistTaskValue = useCallback((value: string) => {dispatch(changeTaskTextCreateAction(id, task.id, value))}, [id, task.id])
   const changeTaskStatus = useCallback(() => {dispatch(changeTaskStatusCreateAction(id, task.id))}, [id, task.id])
   const onKeyChangeTaskStatus = useCallback(() => dispatch(changeTaskStatusCreateAction(id, task.id)), [id, task.id])
   const removeTask = useCallback(() => dispatch(removeTaskCreateAction(id, task.id)), [id, task.id])

   return <Task
          task={task}
          changeTodolistTaskValue={changeTodolistTaskValue}
          changeTaskStatus={changeTaskStatus}
          onKeyChangeTaskStatus={onKeyChangeTaskStatus}
          removeTask={removeTask}/>
})
