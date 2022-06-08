import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import {Task} from "./Task";
import {taskAPI} from "../../api/taskAPI";
import {ChangeTaskText, DeleteTask, ChangeTaskStatus} from "../../bll/task-reducers/task-create-actions";

type TaskContainerType = {
   task: taskType
};
export const TaskContainer: React.FC<TaskContainerType> = React.memo((props) => {
   const {task} = props;
   const dispatch = useDispatch();
   const changeTaskTitle = useCallback((value: string) => dispatch(ChangeTaskText(task, value)), [dispatch, task])
   const updateTaskText = useCallback((value: string) => taskAPI.updateText(task, value).then((task) => {dispatch(ChangeTaskText(task, value))}), [dispatch, task])
   const updateTaskStatus = useCallback(() => {taskAPI.updateTaskStatus(task).then((task) => dispatch(ChangeTaskStatus(task)))}, [dispatch, task])
   const removeTask = useCallback(() => taskAPI.deleteTask(task).then(() => dispatch(DeleteTask(task))), [dispatch, task])

   return <Task
          task={task}
          changeTaskTitle={changeTaskTitle}
          updateTaskStatus={updateTaskStatus}
          updateTaskText={updateTaskText}
          removeTask={removeTask}/>
})
