import {Actions_Type} from "../actions-type";
import {appActionType} from "./app-create-actions/app-create-actions-type";

const appState: appReducerType = {
   status: 'succeeded',
   error: null
}

export const appReducer = (state: appReducerType = appState, action: appActionType): appReducerType  => {
   switch (action.type) {
      case Actions_Type.SET_APP:
         return {...state, status: action.status}

      case Actions_Type.SET_ERROR:
         return {...state, error: action.error}

      case Actions_Type.CLEAR_ERROR:
         return {...state, error: null}

      default:
         return state
   }
}

export type appReducerType = {
   status: appStatusType
   error: string | null
}

export type appStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
