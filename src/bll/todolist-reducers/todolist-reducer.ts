import {v1} from "uuid";
import {todolistActionType} from "./todolist-create-actions";
import {FilterValueType} from "../task-reducers/tasks-reducer";
import {Actions_Type} from "../actions-type";
import {todolistApiType} from "../../api/todolistsAPI";

export type todolistType = todolistApiType & {
  filter: FilterValueType
}

export const todolistId1 = v1();
export const todolistId2 = v1();

let initialState: Array<todolistType> = []

export const todolistReducer = (state: Array<todolistType> = initialState, action: todolistActionType): Array<todolistType> => {
    switch (action.type) {
      case Actions_Type.SET_TODOLISTS:
        return action.todolists.map((todolist) => ({...todolist, filter: 'ALL'}))

      case Actions_Type.REMOVE_TODOLIST:
        return state.filter(todo => todo.id !== action.taskId)

      case Actions_Type.ADD_TODOLIST:
        const newTodolist: todolistType = {id: action.todolistId, title: action.title, addedDate: '', order: 0, filter: "ALL"};
        return [...state, newTodolist]

      case Actions_Type.CHANGE_TODOLIST_FILTER:
        return state.map(item => item.id === action.todolistId ? {...item, filter: action.filter} : item)

      case Actions_Type.CHANGE_TODOLIST_TITLE:
        return state.map(item => item.id === action.todolistId ? {...item, title: action.title}: item)
      default: return state
    }
}
