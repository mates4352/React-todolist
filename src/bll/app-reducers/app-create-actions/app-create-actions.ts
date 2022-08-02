import {Actions_Type} from "../../actions-type";
import {appStatusType} from "../app-reduer";

export const setAppStatus = (status: appStatusType) => {
   return {type: Actions_Type.SET_APP, status} as const
}

export const setAppError = (error: string | null) => {
   return {type: Actions_Type.SET_ERROR, error} as const
}

export const clearError = () => {
   return {type: Actions_Type.CLEAR_ERROR} as const
}
