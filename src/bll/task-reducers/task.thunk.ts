import {FilterValueType, tasksType, taskType} from "./tasks-reducer";

export const changeFilterTasks = (state: tasksType, todolistId: string, filter: FilterValueType) => {
  switch (filter) {
    case "ACTIVE":
      return {...state, [todolistId]: state[todolistId].filter((task: taskType) => task.isDown)}
    case "COMPLETED":
      return {...state, [todolistId]: state[todolistId].filter((task: taskType) => !task.isDown)}
    default:
      return state;
  }
}
