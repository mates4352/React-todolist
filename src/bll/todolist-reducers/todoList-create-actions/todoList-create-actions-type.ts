import {
   AddTodolist,
   ChangeEntityStatus,
   ChangeFilter,
   ChangeTitle,
   RemoveTodolist,
   SetTodolists
} from "./todoList-create-actions";

export type todolistActionType =
    SetTodolistsType
    | AddTodolistType
    | RemoveTodolistType
    | ChangeFilterType
    | ChangeTitleType
    | ChangeEntityStatusType;

export type SetTodolistsType = ReturnType<typeof SetTodolists>
export type AddTodolistType = ReturnType<typeof AddTodolist>
export type RemoveTodolistType = ReturnType<typeof RemoveTodolist>
type ChangeFilterType = ReturnType<typeof ChangeFilter>
type ChangeTitleType = ReturnType<typeof ChangeTitle>
type ChangeEntityStatusType = ReturnType<typeof ChangeEntityStatus>

