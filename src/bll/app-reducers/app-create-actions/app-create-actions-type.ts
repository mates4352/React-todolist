import {clearError, setAppError, setAppStatus} from "./app-create-actions";

export type appActionType = setAppStatusType | setAppErrorType | clearErrorType;

type setAppStatusType = ReturnType<typeof setAppStatus>
type setAppErrorType = ReturnType<typeof setAppError>
type clearErrorType = ReturnType<typeof clearError>
