import {Actions_Type} from "../actions-type";
import {AuthCreateActionsType} from "./auth-create-actions/auth-create-actions-type";

const appState: authReducerType = {
   isLoggedIn: false
}

export const authReducer = (state: authReducerType = appState, action: AuthCreateActionsType): authReducerType  => {
   switch (action.type) {

      case Actions_Type.CHANGE_LOGGED:
         return {...state, isLoggedIn: action.value};

      default:
         return state;
   }
}

export type authReducerType = {
   isLoggedIn: boolean
}
