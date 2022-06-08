import React, {useCallback} from 'react';
import {
   changeTaskStatusCreateAction,
   changeTaskTextCreateAction,
   removeTaskCreateAction
} from "../../bll/task-reducers/task-create-actions";
import {useDispatch} from "react-redux";
import {taskType} from "../../bll/task-reducers/tasks-reducer";
import {Task} from "./Task";
import {taskAPI} from "../../api/taskAPI";

type TaskContainerType = {
   id: string
   task: taskType
};
export const TaskContainer: React.FC<TaskContainerType> = React.memo((props) => {
   const {id, task} = props;
   const dispatch = useDispatch();
   const changeTodolistTaskValue = useCallback((value: string) => dispatch(changeTaskTextCreateAction(id, task.id, value)), [dispatch, id, task.id])
   const updateText = useCallback((value: string) => taskAPI.updateText(id, task, value).then((task) => {dispatch(changeTaskTextCreateAction(id, task.id, value))}), [dispatch, id, task.id])
   const changeTaskStatus = useCallback(() => {taskAPI.updateTask(id, task).then((task) => dispatch(changeTaskStatusCreateAction(id, task)))}, [dispatch, id, task])
   const removeTask = useCallback(() => taskAPI.deleteTask(id, task.id).then(() => dispatch(removeTaskCreateAction(id, task.id))), [dispatch, id, task.id])

   return <Task
          task={task}
          changeTodolistTaskValue={changeTodolistTaskValue}
          updateText={updateText}
          changeTaskStatus={changeTaskStatus}
          removeTask={removeTask}/>
})
