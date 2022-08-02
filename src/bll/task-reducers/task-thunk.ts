import {taskAPI, taskApiType, TasksStatus} from "../../api/taskAPI";
import {
   AddTask,
   ChangeTaskStatus,
   ChangeTaskText,
   DeleteTask,
   SetTasks
} from "./task-create-actions/task-create-actions";
import {AppThunk} from "../redux-store";
import {FilterValueType, taskType} from "./tasks-reducer";
import {setAppError, setAppStatus} from "../app-reducers/app-create-actions/app-create-actions";
import {handleServerAppError, handleServerNetworkError} from "../../helpers/handleServer";

export const getTasks = (todolistId: string, filter: FilterValueType): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
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
   dispatch(setAppStatus('succeeded'))
}

export const setTask = (todolistId: string, value: string): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   try {
      const data = await taskAPI.addTask(todolistId, value)
      if (data.resultCode === 0) {
         dispatch(AddTask(data.data.item))
         dispatch(setAppStatus('succeeded'))
      } else {
         handleServerAppError(data, dispatch)
      }
   } catch {
      dispatch(setAppStatus('loading'))
      const data = await taskAPI.addTask(todolistId, value)
      handleServerNetworkError(data, dispatch)
   }
}

export const updateText = (task: taskApiType, title: string): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   try {
      const responseTask = await taskAPI.updateText(task, title)
      if(responseTask.resultCode === 0) {
         dispatch(ChangeTaskText(responseTask.data.item, responseTask.data.item.title))
         dispatch(setAppStatus('succeeded'))
      } else {
         handleServerAppError(responseTask, dispatch)
      }
   } catch {
      dispatch(setAppStatus('loading'))
      const responseTask = await taskAPI.updateText(task, title)
      handleServerNetworkError(responseTask, dispatch)
   }
}

export const updateStatus = (task: taskApiType): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   try {
      const responseTask = await taskAPI.updateTaskStatus(task)
      if(responseTask.resultCode === 0) {
         dispatch(ChangeTaskStatus(responseTask.data.item))
         dispatch(setAppStatus('succeeded'))
      } else {
         handleServerAppError(responseTask, dispatch)
      }
   } catch {
      dispatch(setAppStatus('loading'))
      const responseTask = await taskAPI.updateTaskStatus(task)
      handleServerNetworkError(responseTask, dispatch)
   }

}

export const deleteTask = (task: taskApiType): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   await taskAPI.deleteTask(task)
   dispatch(DeleteTask(task))
   dispatch(setAppStatus('succeeded'))
}


