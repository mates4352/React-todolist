import {v1} from "uuid";
import {
  AddTodolistTActionType,
  RemoveTodolistTActionType, todolistId1, todolistId2, todolistType
} from "../todolist-reducers/todolist-reducer";

export type tasksType = {
  [todolistId: string]: Array<taskType>
}
export type taskType = {
  id: string
  isDown: boolean
  text: string
}
type AddTaskActionType = ReturnType<typeof addTaskCreateAction>
type changeFilterTasksActionType = ReturnType<typeof changeFilterTasksCreateAction>
type removeTaskActionType = ReturnType<typeof removeTaskCreateAction>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusCreateAction>
type changeTaskTextCreateAction = ReturnType<typeof changeTaskTextCreateAction>
export type tasksActionType =
    AddTaskActionType
  | changeFilterTasksActionType
  | removeTaskActionType
  | changeTaskStatusActionType
  | changeTaskTextCreateAction
  | AddTodolistTActionType
  | RemoveTodolistTActionType

let stateTasks: tasksType = {
  [todolistId1]: [
    {id: v1(), isDown: true, text: "Html-Css"},
    {id: v1(), isDown: true, text: "Js"},
    {id: v1(), isDown: false, text: "ReactJs"},
  ],
  [todolistId2]: [
    {id: v1(), isDown: true, text: "Html-Css"},
    {id: v1(), isDown: true, text: "Js"},
    {id: v1(), isDown: false, text: "ReactJs"},
  ]
}

export const tasksReducer = (state: tasksType = stateTasks, action: tasksActionType): tasksType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask = {id: v1(), text: action.value, isDown: true}
      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId], newTask]
      }
    case "CHANGE-FILTER-TASKS":
      switch (action.todolist.filter) {
        case "ACTIVE":
          return {...state, [action.todolist.id]: state[action.todolist.id].filter(((task: taskType) => task.isDown))}
        case "COMPLETED":
          return {...state, [action.todolist.id]:  state[action.todolist.id].filter(((task: taskType) => !task.isDown))}
        default:
          return state;
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
export const changeFilterTasksCreateAction = (todolist: todolistType) => {
  return {type: 'CHANGE-FILTER-TASKS', todolist} as const
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
