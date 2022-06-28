import {FilterValueType} from "../task-reducers/tasks-reducer";
import {Actions_Type} from "../actions-type";
import {todolistApiType} from "../../api/todolistsAPI";

export const SetTodolists = (todolists: Array<todolistApiType>) => {
  return {type: Actions_Type.SET_TODOLISTS, todolists} as const
}

export const AddTodolist = (todolist: todolistApiType) => {
  const todolistId = todolist.id;
  const title = todolist.title;
  return {type: Actions_Type.ADD_TODOLIST, todolistId, title} as const
}

export const RemoveTodolist = (taskId: string) => {
  return {type: Actions_Type.REMOVE_TODOLIST, taskId} as const
}

export const ChangeFilter = (todolistId: string, filter: FilterValueType) => {
  return {type: Actions_Type.CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}

export const ChangeTitle = (todolistId: string, title: string) => {
  return {type: Actions_Type.CHANGE_TODOLIST_TITLE, todolistId, title} as const
}

export type SetTodolistsType = ReturnType<typeof SetTodolists>
export type AddTodolistType = ReturnType<typeof AddTodolist>
export type RemoveTodolistType = ReturnType<typeof RemoveTodolist>
type ChangeFilterType = ReturnType<typeof ChangeFilter>
type ChangeTitleType = ReturnType<typeof ChangeTitle>
export type todolistActionType =
    SetTodolistsType
    | AddTodolistType
    | RemoveTodolistType
    | ChangeFilterType
    | ChangeTitleType;

