import {AddTodolistTActionType, RemoveTodolistTActionType} from "../todolist-reducers/todolist-create-actions";
import {Actions_Type} from "../actions-type";

type AddTaskActionType = ReturnType<typeof addTaskCreateAction>
type removeTaskActionType = ReturnType<typeof removeTaskCreateAction>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusCreateAction>
type changeTaskTextCreateAction = ReturnType<typeof changeTaskTextCreateAction>
export type tasksActionType =
  AddTaskActionType
  | removeTaskActionType
  | changeTaskStatusActionType
  | changeTaskTextCreateAction
  | AddTodolistTActionType
  | RemoveTodolistTActionType


export const addTaskCreateAction = (todolistId: string, value: string) => {
  return {type: Actions_Type.ADD_TASK, payload: {todolistId, value}} as const
}
export const removeTaskCreateAction = (todolistId: string, taskId: string) => {
  return {type: Actions_Type.REMOVE_TASK, payload: {todolistId, taskId}} as const
}
export const changeTaskStatusCreateAction = (todolistId: string, taskId: string) => {
  return {type: Actions_Type.CHANGE_TASK_STATUS, payload: {todolistId, taskId}} as const
}
export const changeTaskTextCreateAction = (todolistId: string, taskId: string, text: string) => {
  return {type: Actions_Type.CHANGE_TASK_TEXT, payload: {todolistId, taskId, text}} as const
}
