import {tasks} from "../../App";
import {v1} from "uuid";
import {AddTodolistTActionType, RemoveTodolistTActionType} from "../todolist-reducers/todolist-reducer";

type AddTaskActionType = ReturnType<typeof addTaskCreateAction>
type removeTaskActionType = ReturnType<typeof removeTaskCreateAction>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusCreateAction>
type changeTaskTextCreateAction = ReturnType<typeof changeTaskTextCreateAction>
export type tasksActionType =
    AddTaskActionType
  | removeTaskActionType
  | changeTaskStatusActionType
  | changeTaskTextCreateAction
  | AddTodolistTActionType
  | RemoveTodolistTActionType

export const tasksReducer = (state: tasks, action: tasksActionType): tasks => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask = {id: v1(), text: action.value, isDown: true}
      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId], newTask]
      }
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDown: !task.isDown} : task)
      }
    case 'CHANGE-TASK-TEXT':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, text: action.text} : task)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolistId]: []}
    case 'REMOVE-TODOLIST':
      const tasks = {...state}
      delete tasks[action.id]
      return tasks
    default:
      return state
  }
}

export const addTaskCreateAction = (todolistId: string, value: string) => {
  return {type: 'ADD-TASK', todolistId, value} as const
}

export const removeTaskCreateAction = (todolistId: string, taskId: string) => {
  return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

export const changeTaskStatusCreateAction = (todolistId: string, taskId: string) => {
  return {type: 'CHANGE-TASK-STATUS', todolistId, taskId} as const
}

export const changeTaskTextCreateAction = (todolistId: string, taskId: string, text: string) => {
  return {type: 'CHANGE-TASK-TEXT', todolistId, taskId, text} as const
}
