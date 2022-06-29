import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducers/todolist-reducer";
import {tasksReducer} from "./task-reducers/tasks-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksActionType} from "./task-reducers/task-create-actions";
import {todolistActionType} from "./todolist-reducers/todolist-create-actions";

export const rootReducer = combineReducers({
  todolist: todolistReducer,
  tasks: tasksReducer,
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>
export type appStoreType = ReturnType<typeof rootReducer>
export type AppActionType = tasksActionType | todolistActionType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
