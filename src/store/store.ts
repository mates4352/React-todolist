import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducers/todolist-reducer";
import {tasksReducer} from "./task-reducers/tasks-reducer";

export type state = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolist: todolistReducer,
  tasks: tasksReducer,
})

export const store = createStore(rootReducer)
