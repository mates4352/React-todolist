import {Actions_Type} from "../../actions-type";
import {taskType} from "../tasks-reducer";

export const SetTasks = (todolistId: string, tasks: Array<taskType>) => {
   return {type: Actions_Type.SET_TASKS, todolistId, tasks} as const
}
export const AddTask = (task: taskType) => {
   return {type: Actions_Type.ADD_TASK, task} as const
}
export const DeleteTask = (task: taskType) => {
   const {todoListId, id} = task;
   return {type: Actions_Type.REMOVE_TASK, todoListId, taskId: id} as const
}
export const ChangeTaskStatus = (task: taskType) => {
   const {todoListId, id, status} = task;
   return {type: Actions_Type.CHANGE_TASK_STATUS, todoListId, taskId: id, status} as const
}
export const ChangeTaskText = (task: taskType, title: string) => {
   const {todoListId, id} = task;
   return {type: Actions_Type.CHANGE_TASK_TEXT, todoListId, taskId: id, title} as const
}

