import {v1} from "uuid";

export type todolistType = {
  id: string
  title: string
  filter: string
}
export type FilterValueType = "ALL" | "ACTIVE" | "COMPLETED";
export type AddTodolistTActionType = ReturnType<typeof AddTodolistTActionCreate>
export type RemoveTodolistTActionType = ReturnType<typeof RemoveTodolistActionCreate>
type ChangeFilterTypeActionType = ReturnType<typeof ChangeFilterActionCreate>
type ChangeTitleActionType = ReturnType<typeof ChangeTitleTActionCreate>

export type todolistActionType =
    ChangeTitleActionType
  | ChangeFilterTypeActionType 
  | AddTodolistTActionType
  | RemoveTodolistTActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

let stateTodolist: Array<todolistType> = [
  {id: todolistId1, title: 'Todolist1', filter: 'ACTIVE'},
  {id: todolistId2, title: 'Todolist2', filter: 'COMPLETED'},
]

export const todolistReducer = (state: Array<todolistType> = stateTodolist, action: todolistActionType): Array<todolistType> => {
    switch (action.type) {
      case 'REMOVE-TODOLIST':
        return state.filter(todo => todo.id !== action.id)
      case 'ADD-TODOLIST':
        const newTodolist = {id: action.todolistId, title: action.value, filter: "ALL"};
        return [...state, newTodolist]
      case 'CHANGE-TODOLIST-FILTER':
        return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
      case 'CHANGE-TODOLIST-TITLE':
        return state.map(item => item.id === action.id ? {...item, title: action.title}: item)
      default: return state
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
