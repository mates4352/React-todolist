import {AppThunk} from "../redux-store";
import {todolistsAPI} from "../../api/todolistsAPI";
import {AddTodolist, RemoveTodolist, SetTodolists} from "./todolist-create-actions";

export const addTodolist = (value: string): AppThunk => async dispatch => {
   const todolist = await todolistsAPI.addTodolist(value)
   dispatch(AddTodolist(todolist))
}

export const getTodolits = (): AppThunk => async dispatch => {
   const todolists = await todolistsAPI.getTodolists()
   dispatch(SetTodolists(todolists))
}

export const deleteTodolist = (todolistId: string): AppThunk => async dispatch => {
   await todolistsAPI.removeTodolist(todolistId)
   dispatch(RemoveTodolist(todolistId))
}

export const updateTodolistTitle = (todolistId: string, title: string): AppThunk => async dispatch => {
   await todolistsAPI.updateTodolist(todolistId, title)
}


