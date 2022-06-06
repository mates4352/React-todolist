import {v1} from "uuid";
import {todolistActionType} from "./todolist-create-actions";
import {FilterValueType} from "../task-reducers/tasks-reducer";
import {Actions_Type} from "../actions-type";
import {todolistAPIType} from "../../api/todolistsAPI";

export type todolistType = todolistAPIType & {
  filter: FilterValueType
}

export const todolistId1 = v1();
export const todolistId2 = v1();

let initialState: Array<todolistType> = []

export const todolistReducer = (state: Array<todolistType> = initialState, action: todolistActionType): Array<todolistType> => {
    switch (action.type) {
      case Actions_Type.SET_TODOLISTS:
        return action.payload.map((todolist) => ({...todolist, filter: 'ALL'}))

      case Actions_Type.REMOVE_TODOLIST:
        return state.filter(todo => todo.id !== action.payload)

      case Actions_Type.ADD_TODOLIST:
        const newTodolist: todolistType = {id: action.payload.todolistId, title: action.payload.value, addedDate: '', order: 0, filter: "ALL"};
        return [...state, newTodolist]

      case Actions_Type.CHANGE_TODOLIST_FILTER:
        return state.map(item => item.id === action.payload.id ? {...item, filter: action.payload.filter} : item)

      case Actions_Type.CHANGE_TODOLIST_TITLE:
        return state.map(item => item.id === action.payload.id ? {...item, title: action.payload.title}: item)
      default: return state
    }
}
