import {setAppError, setAppStatus} from "../bll/app-reducers/app-create-actions/app-create-actions";
import {AppDispatch} from "../bll/redux-store";
import {responseApiType} from "../api/authAPI";

export const handleServerAppError = <T>(data: responseApiType<T>, dispatch: AppDispatch) => {
   if (data.messages.length) {
      dispatch(setAppError(data.messages[0]))
   } else {
      dispatch(setAppError('Max Limit 100 symbol'))
   }
   dispatch(setAppStatus('succeeded'))
}
export const handleServerNetworkError = <T>(data: responseApiType<T>, dispatch: AppDispatch) => {
   dispatch(setAppStatus('failed'))
   dispatch(setAppError(data.messages[0]))
}
