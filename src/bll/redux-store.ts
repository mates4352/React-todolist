import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListReducer} from "./todolist-reducers/todoList-reducer";
import {tasksReducer} from "./task-reducers/tasks-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksActionType} from "./task-reducers/task-create-actions/task-create-actions-type";
import {todolistActionType} from "./todolist-reducers/todoList-create-actions/todoList-create-actions-type";
import {appReducer} from "./app-reducers/app-reduer";
import {appActionType} from "./app-reducers/app-create-actions/app-create-actions-type";
import {authReducer} from "./auth/auth-reducer";
import {AuthCreateActionsType} from "./auth/auth-create-actions/auth-create-actions-type";
import {loadState, saveState} from "./localStorage";

export const rootReducer = combineReducers({
  todolist: todoListReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const reduxStore = createStore(rootReducer,{auth: loadState()}, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppActionType = tasksActionType | todolistActionType | appActionType | AuthCreateActionsType;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>;
export type appStoreType = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>;

reduxStore.subscribe(() => {
  saveState(reduxStore.getState().auth)
})
