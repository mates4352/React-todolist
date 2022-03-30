import {todolist} from "../../App";
import {v1} from "uuid";
import {FilterValueType} from "../../components/Todolist/Todolist";

type ChangeTitleT = {
  type: 'CHANGE-TODOLIST-TITLE',
  title: string,
  id: string
}
type ChangeFilterT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValueType
}
export type AddTodolistT = {
  type: 'ADD-TODOLIST',
  todolistId: string
  value: string
}
export type RemoveTodolistT = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type ActionType = RemoveTodolistT | AddTodolistT | ChangeFilterT | ChangeTitleT;

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

export const RemoveTodolistActionCreate = (id: string): RemoveTodolistT => ({ type: 'REMOVE-TODOLIST', id})
export const AddTodolistTActionCreate = (value: string): AddTodolistT => ({ type: 'ADD-TODOLIST', todolistId: v1(), value})
export const ChangeFilterActionCreate = (id: string, filter: FilterValueType): ChangeFilterT => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter})
export const ChangeTitleTActionCreate = (id: string, title: string): ChangeTitleT => ({ type: 'CHANGE-TODOLIST-TITLE', id, title})
