import {AppThunk} from "../redux-store";
import {todolistsAPI} from "../../api/todolistsAPI";
import {
   AddTodolist,
   ChangeEntityStatus,
   RemoveTodolist,
   SetTodolists
} from "./todoList-create-actions/todoList-create-actions";
import {setAppStatus} from "../app-reducers/app-create-actions/app-create-actions";

export const addTodolist = (value: string): AppThunk => async dispatch => {
   const todolist = await todolistsAPI.addTodolist(value)
   dispatch(AddTodolist(todolist))
}

export const getTodolits = (): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   const todolists = await todolistsAPI.getTodolists()
   dispatch(SetTodolists(todolists))
   dispatch(setAppStatus('succeeded'))
}

export const deleteTodolist = (todolistId: string): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   dispatch(ChangeEntityStatus(todolistId,'loading'))

   await todolistsAPI.removeTodolist(todolistId)
   dispatch(RemoveTodolist(todolistId))
   dispatch(setAppStatus('succeeded'))
}

export const updateTodolistTitle = (todolistId: string, title: string): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))
   await todolistsAPI.updateTodolist(todolistId, title)
   dispatch(setAppStatus('succeeded'))
}


