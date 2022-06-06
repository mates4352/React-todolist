import {v1} from "uuid";
import {FilterValueType} from "../task-reducers/tasks-reducer";
import {Actions_Type} from "../actions-type";
import {todolistAPIType} from "../../api/todolistsAPI";

export type SetTodolistTActionType = ReturnType<typeof SetTodolists>
export type AddTodolistTActionType = ReturnType<typeof AddTodolistTActionCreate>
export type RemoveTodolistTActionType = ReturnType<typeof RemoveTodolistActionCreate>
type ChangeFilterTypeActionType = ReturnType<typeof ChangeFilterActionCreate>
type ChangeTitleActionType = ReturnType<typeof ChangeTitleTActionCreate>
export type todolistActionType =
    SetTodolistTActionType
  | ChangeTitleActionType
  | ChangeFilterTypeActionType
  | AddTodolistTActionType
  | RemoveTodolistTActionType;

export const SetTodolists = (todolists: Array<todolistAPIType>) => {
  return {type: Actions_Type.SET_TODOLISTS, payload: todolists} as const
}

export const AddTodolistTActionCreate = (value: string) => {
  return {type: Actions_Type.ADD_TODOLIST, payload: {todolistId: v1(), value}} as const
}

export const RemoveTodolistActionCreate = (id: string) => {
  return {type: Actions_Type.REMOVE_TODOLIST, payload: id} as const
}

export const ChangeFilterActionCreate = (id: string, filter: FilterValueType) => {
  return {type: Actions_Type.CHANGE_TODOLIST_FILTER, payload: {id, filter}} as const
}

export const ChangeTitleTActionCreate = (id: string, title: string) => {
  return {type: Actions_Type.CHANGE_TODOLIST_TITLE, payload: {id, title}} as const
}
