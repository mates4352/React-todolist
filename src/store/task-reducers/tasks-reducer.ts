import {tasks} from "../../App";
import {v1} from "uuid";

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

type ActionType = sendTaskType | removeTaskType


export const tasksReduser = (state: tasks, action: ActionType): tasks => {
  switch (action.type) {
    case 'SEND-TASK':
      const newState = {...state}
      const newTask = {id: v1(), text: action.value, isDown: true}
      newState[action.todolistId] = [...newState[action.todolistId], newTask]
      return newState
    case "REMOVE-TASK":
      const newStateRemoveTask = {...state}
      newStateRemoveTask[action.todolistId] = newStateRemoveTask[action.todolistId].filter(item => item.id !== action.taskId)
      return newStateRemoveTask
    default:
      return state
  }
}

export const sendTaskCreateAction = (todolistId: string, value: string): sendTaskType => {
  return {type: 'SEND-TASK', todolistId, value}
}

export const removeTaskCreateAction = (todolistId: string, taskId: string):removeTaskType => {
  return {type: 'REMOVE-TASK', todolistId, taskId}
}
