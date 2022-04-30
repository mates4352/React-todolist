import {v1} from "uuid";
import {tasksActionType} from "./task-create-actions";
import {Actions_Type} from "../actions-type";

export type FilterValueType = "ALL" | "ACTIVE" | "COMPLETED";
export type tasksType = {
  [todolistId: string]: Array<taskType>
}

export type taskType = {
  id: string
  isDown: boolean
  text: string
}

let stateTasks: tasksType = {}

export const tasksReducer = (state: tasksType = stateTasks, action: tasksActionType): tasksType => {
  switch (action.type) {
    case Actions_Type.ADD_TASK:
      const newTask = {id: v1(), text: action.payload.value, isDown: true}
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]
      }

    case Actions_Type.REMOVE_TASK:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      }

    case Actions_Type.CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDown: !task.isDown} : task)
      }

    case Actions_Type.CHANGE_TASK_TEXT:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, text: action.payload.text} : task)
      }

    case Actions_Type.ADD_TODOLIST:
      return {...state, [action.payload.todolistId]: []}

    case Actions_Type.REMOVE_TODOLIST:
      const tasks = {...state}
      delete tasks[action.payload]
      return tasks

    default:
      return state
  }
}
