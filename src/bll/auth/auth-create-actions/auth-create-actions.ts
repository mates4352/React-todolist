import {Actions_Type} from "../../actions-type";

export const changeLogged = (value: boolean) => {
   return {type: Actions_Type.CHANGE_LOGGED, value} as const
}
