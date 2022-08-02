import {v1} from "uuid";
import {FilterValueType} from "../task-reducers/tasks-reducer";
import {Actions_Type} from "../actions-type";
import {todolistApiType} from "../../api/todolistsAPI";
import {todolistActionType} from "./todoList-create-actions/todoList-create-actions-type";
import {appStatusType} from "../app-reducers/app-reduer";

export const todolistId1 = v1();
export const todolistId2 = v1();

let initialState: Array<todolistType> = []

export const todoListReducer = (state: Array<todolistType> = initialState, action: todolistActionType): Array<todolistType> => {
    switch (action.type) {
      case Actions_Type.SET_TODOLISTS:
        return action.todolists.map((todolist) => ({...todolist, filter: 'ALL', entityStatus: 'succeeded'}))

      case Actions_Type.ADD_TODOLIST:
        const newTodolist: todolistType = {id: action.todoListId, title: action.title, addedDate: '', order: 0, filter: "ALL", entityStatus: 'succeeded'};
        return [...state, newTodolist]

      case Actions_Type.REMOVE_TODOLIST:
        return state.filter(todo => todo.id !== action.taskId)

      case Actions_Type.CHANGE_ENTITY_STATUS:
        return state.map(todo => todo.id === action.todolistId ? {...todo, entityStatus: action.status} : todo)

      case Actions_Type.CHANGE_TODOLIST_FILTER:
        return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)

      case Actions_Type.CHANGE_TODOLIST_TITLE:
        return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title}: todo)
      default: return state
    }
}

export type todolistType = todolistApiType & {
  filter: FilterValueType
  entityStatus: appStatusType
}
