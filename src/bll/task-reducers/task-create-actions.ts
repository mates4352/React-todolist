import {AddTodolistType, RemoveTodolistType} from "../todolist-reducers/todolist-create-actions";
import {Actions_Type} from "../actions-type";
import {taskType} from "./tasks-reducer";

export const SetTasks = (todolistId: string, tasks: Array<taskType>) => {
   return {type: Actions_Type.SET_TASKS, todolistId, tasks} as const
}
export const AddTask = (task: taskType) => {
   return {type: Actions_Type.ADD_TASK, task} as const
}
export const DeleteTask = (task: taskType) => {
   const todolistId: string = task.todoListId;
   const taskId: string = task.id;
   return {type: Actions_Type.REMOVE_TASK, todolistId, taskId} as const
}
export const ChangeTaskStatus = (task: taskType) => {
   const todolistId: string = task.todoListId;
   const taskId: string = task.id;
   const status: number = task.status;
   return {type: Actions_Type.CHANGE_TASK_STATUS, todolistId, taskId, status} as const
}
export const ChangeTaskText = (task: taskType, title: string) => {
   const todolistId: string = task.todoListId;
   const taskId: string = task.id;
   return {type: Actions_Type.CHANGE_TASK_TEXT, todolistId, taskId, title} as const
}

type SetTasksType = ReturnType<typeof SetTasks>
type AddTaskType = ReturnType<typeof AddTask>
type DeleteTaskType = ReturnType<typeof DeleteTask>
type ChangeTaskStatusType = ReturnType<typeof ChangeTaskStatus>
type ChangeTaskTextType = ReturnType<typeof ChangeTaskText>
export type tasksActionType =
    SetTasksType
    | AddTaskType
    | DeleteTaskType
    | ChangeTaskStatusType
    | ChangeTaskTextType
    | AddTodolistType
    | RemoveTodolistType
