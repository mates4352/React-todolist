import {taskAPI, taskApiType, TasksStatus} from "../../api/taskAPI";
import {AddTask, ChangeTaskStatus, ChangeTaskText, DeleteTask, SetTasks} from "./task-create-actions";
import {AppThunk} from "../redux-store";
import {FilterValueType, taskType} from "./tasks-reducer";
import {useCallback} from "react";

export const getTasks = (todolistId: string, filter: FilterValueType): AppThunk => async dispatch => {
  const tasks = await taskAPI.getTasks(todolistId)
  const filterTasks = () => {
    switch (filter) {
      case "ACTIVE":
        return tasks.filter((task: taskType) => task.status === TasksStatus.Completed)

      case "COMPLETED":
        return tasks.filter((task: taskType) => task.status === TasksStatus.New)

      default:
        return tasks;
    }
  }
  dispatch(SetTasks(todolistId, filterTasks()))
}

export const setTask = (todolistId: string, value: string): AppThunk => async dispatch => {
  const task = await taskAPI.addTask(todolistId, value)
  dispatch(AddTask(task))
}

export const updateText = (task: taskApiType, title: string): AppThunk => async dispatch => {
  const responseTask = await taskAPI.updateText(task, title)
  dispatch(ChangeTaskText(responseTask, responseTask.title))
}

export const updateStatus = (task: taskApiType): AppThunk => async dispatch => {
  const responseTask = await taskAPI.updateTaskStatus(task)
  dispatch(ChangeTaskStatus(responseTask))
}

export const deleteTask = (task: taskApiType): AppThunk => async dispatch => {
  await taskAPI.deleteTask(task)
  dispatch(DeleteTask(task))
}


