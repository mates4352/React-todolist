import {AppThunk} from "../redux-store";
import {setAppStatus} from "../app-reducers/app-create-actions/app-create-actions";
import {handleServerAppError, handleServerNetworkError} from "../../helpers/handleServer";
import {authAPI, loginApi} from "../../api/authAPI";
import {changeLogged} from "./auth-create-actions/auth-create-actions";
import {getTodolits} from "../todolist-reducers/todoList-thunk";

export const login = (data: loginApi): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))

   try {
      const response = await authAPI.login(data)
      if (response.resultCode === 0) {
         dispatch(changeLogged(true))
         dispatch(setAppStatus('succeeded'))
      } else {
         handleServerAppError(response, dispatch)
         dispatch(setAppStatus('succeeded'))
      }
   } catch {
      const response = await authAPI.login(data)
      handleServerNetworkError(response, dispatch)
      dispatch(setAppStatus('succeeded'))
   }
}

export const deleteLogin = (): AppThunk => async dispatch => {
   dispatch(setAppStatus('loading'))

   try {
      await authAPI.deleteLogin()
      dispatch(changeLogged(false))
      dispatch(setAppStatus('succeeded'))
   } catch {
      const response = await authAPI.deleteLogin()
      handleServerNetworkError(response, dispatch)
      dispatch(setAppStatus('succeeded'))
   }
}

export const isMe = (): AppThunk => async dispatch => {
   const response = await authAPI.isMe()
   if (response.resultCode === 0) {
      dispatch(changeLogged(true))
      dispatch(getTodolits())
   } else {
      dispatch(changeLogged(false))
   }
}
