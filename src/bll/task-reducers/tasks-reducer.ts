import {v1} from "uuid";
import {tasksActionType} from "./task-create-actions";
import {Actions_Type} from "../actions-type";
import {taskApiType, TasksPriorities, TasksStatus} from "../../api/taskAPI";

export type FilterValueType = "ALL" | "ACTIVE" | "COMPLETED";
export type tasksType = {
   [todolistId: string]: Array<taskType>
}

export type taskType = taskApiType;

let stateTasks: tasksType = {}

export const tasksReducer = (state: tasksType = stateTasks, action: tasksActionType): tasksType => {
   switch (action.type) {
      case Actions_Type.SET_TASKS: {
         return {
            ...state,
            [action.payload.todolistId]: [...action.payload.tasks]
         }
      }

      case Actions_Type.ADD_TASK:
         const newTask: taskType = {
            description: '',
            title: action.payload.value,
            status: TasksStatus.Completed,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: v1(),
            todoListId: action.payload.todolistId,
            order: 0,
            addedDate: '',
         }
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
            [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
               ...task,
               status: action.payload.status
            } : task)
         }

      case Actions_Type.CHANGE_TASK_TEXT:
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
               ...task,
               title: action.payload.title
            } : task)
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
