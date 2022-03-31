import {todolist} from "../../App";
import {v1} from "uuid";
import {FilterValueType} from "../../components/Todolist/Todolist";

export type AddTodolistTActionType = ReturnType<typeof AddTodolistTActionCreate>
export type RemoveTodolistTActionType = ReturnType<typeof RemoveTodolistActionCreate>
type ChangeFilterTypeActionType = ReturnType<typeof ChangeFilterActionCreate>
type ChangeTitleActionType = ReturnType<typeof ChangeTitleTActionCreate>

export type ActionType = ChangeTitleActionType
  | ChangeFilterTypeActionType 
  | AddTodolistTActionType
  | RemoveTodolistTActionType;

export const todolistReducer = (todolist:Array<todolist>, action: ActionType):Array<todolist> => {
    switch (action.type) {
      case 'REMOVE-TODOLIST':
        return todolist.filter(todo => todo.id !== action.id)
      case 'ADD-TODOLIST':
        const newTodolist = {id: action.todolistId, title: action.value, filter: "ALL"};
        return [...todolist, newTodolist]
      case 'CHANGE-TODOLIST-FILTER':
        return todolist.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
      case 'CHANGE-TODOLIST-TITLE':
        return todolist.map(item => item.id === action.id ? {...item, title: action.title}: item)
      default: return todolist
    }
}

export const AddTodolistTActionCreate = (value: string) => {
  return { type: 'ADD-TODOLIST', todolistId: v1(), value} as const
}

export const RemoveTodolistActionCreate = (id: string) => {
  return { type: 'REMOVE-TODOLIST', id} as const
}

export const ChangeFilterActionCreate = (id: string, filter: FilterValueType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}

export const ChangeTitleTActionCreate = (id: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
