import {setAppError, setAppStatus} from "../bll/app-reducers/app-create-actions/app-create-actions";
import {AppDispatch} from "../bll/redux-store";
import {tasksPutApiType} from "../api/taskAPI";

export const handleServerAppError = (data: tasksPutApiType, dispatch: AppDispatch) => {
   if (data.messages.length) {
      dispatch(setAppError(data.messages[0]))
   } else {
      dispatch(setAppError('Max Limit 100 symbol'))
   }
   dispatch(setAppStatus('succeeded'))
}
export const handleServerNetworkError = (data: tasksPutApiType, dispatch: AppDispatch) => {
   dispatch(setAppStatus('failed'))
   dispatch(setAppError(data.messages[0]))
}
