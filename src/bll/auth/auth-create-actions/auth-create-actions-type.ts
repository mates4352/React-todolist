import {changeLogged} from "./auth-create-actions";

export type AuthCreateActionsType = changeLoggedType
type changeLoggedType = ReturnType<typeof changeLogged>
