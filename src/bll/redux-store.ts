import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducers/todolist-reducer";
import {tasksReducer} from "./task-reducers/tasks-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {loadState, saveState} from "./localStorage";

export type state = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  todolist: todolistReducer,
  tasks: tasksReducer,
})

export const reduxStore = createStore(rootReducer, loadState(), composeWithDevTools())

reduxStore.subscribe(() => {
  saveState(reduxStore.getState())
})
