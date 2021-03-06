import {Actions_Type} from "../actions-type";
import {taskApiType} from "../../api/taskAPI";
import {tasksActionType} from "./task-create-actions/task-create-actions-type";

let stateTasks: tasksType = {}

export const tasksReducer = (state: tasksType = stateTasks, action: tasksActionType): tasksType => {
   switch (action.type) {
      case Actions_Type.SET_TASKS: {
         return {
            ...state,
            [action.todolistId]: [...action.tasks]
         }
      }

      case Actions_Type.ADD_TASK:
         return {
            ...state,
            [action.task.todoListId]: [...state[action.task.todoListId], action.task]
         }

      case Actions_Type.REMOVE_TASK:
         return {
            ...state,
            [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
         }

      case Actions_Type.CHANGE_TASK_STATUS:
         return {
            ...state,
            [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
               ...task,
               status: action.status
            } : task)
         }

      case Actions_Type.CHANGE_TASK_TEXT:
         return {
            ...state,
            [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
               ...task,
               title: action.title
            } : task)
         }

      case Actions_Type.ADD_TODOLIST:
         return {...state, [action.todoListId]: []}

      case Actions_Type.REMOVE_TODOLIST:
         const tasks = {...state}
         delete tasks[action.taskId]
         return tasks

      default:
         return state
   }
}

export type FilterValueType = "ALL" | "ACTIVE" | "COMPLETED";
export type tasksType = {
   [todolistId: string]: Array<taskType>
}
export type taskType = taskApiType;
