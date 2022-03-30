import {tasks} from "../../App";
import {v1} from "uuid";
import {AddTodolistT, RemoveTodolistT} from "../todolist-reducers/todolist-reducer";

type sendTaskType = {
  type: 'SEND-TASK',
  todolistId: string
  value: string
}

type removeTaskType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

type changeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS'
  todolistId: string
  taskId: string
  isDown: boolean
}

type changeTaskTextType = {
  type: 'CHANGE-TASK-TEXT'
  todolistId: string
  taskId: string
  text: string
}

type ActionType = sendTaskType | removeTaskType | changeTaskStatusType | changeTaskTextType | AddTodolistT | RemoveTodolistT


export const tasksReduser = (state: tasks, action: ActionType): tasks => {
  switch (action.type) {
    case 'SEND-TASK':
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
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDown: action.isDown} : task)
      }
    case 'CHANGE-TASK-TEXT':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, text: action.text} : task)
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

export const sendTaskCreateAction = (todolistId: string, value: string):sendTaskType => {
  return {type: 'SEND-TASK', todolistId, value}
}

export const removeTaskCreateAction = (todolistId: string, taskId: string):removeTaskType => {
  return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const changeTaskStatusCreateAction = (todolistId: string, taskId: string, isDown: boolean):changeTaskStatusType => {
  return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDown}
}

export const changeTextStatusCreateAction = (todolistId: string, taskId: string, text: string):changeTaskTextType => {
  return {type: 'CHANGE-TASK-TEXT', todolistId, taskId, text}
}
