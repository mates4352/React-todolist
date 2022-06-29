import React, {useCallback} from 'react';
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import {Task} from "./Task";
import {ChangeTaskText} from "../../bll/task-reducers/task-create-actions";
import {deleteTask, updateStatus, updateText} from "../../bll/task-reducers/task-thunk";
import {useAppDispatch} from "../../bll/redux-store";

type TaskContainerType = {
   task: taskType
};

export const TaskContainer: React.FC<TaskContainerType> = React.memo((props) => {
   const {task} = props;
   const dispatch = useAppDispatch();

   const changeTaskTitle = useCallback((value: string) => {
      dispatch(ChangeTaskText(task, value))
   }, [dispatch, task])

   const updateTaskText = useCallback((value: string) => {
      dispatch(updateText(task, value))
   }, [dispatch, task])

   const updateTaskStatus = useCallback(() => {
      dispatch(updateStatus(task))
   }, [dispatch, task])

   const removeTask = useCallback(() => {
      dispatch(deleteTask(task))
   }, [dispatch, task])

   return <Task
       task={task}
       changeTaskTitle={changeTaskTitle}
       updateTaskStatus={updateTaskStatus}
       updateTaskText={updateTaskText}
       removeTask={removeTask}/>
})
