import {FilterValueType, tasksType, taskType} from "./tasks-reducer";
import {TasksStatus} from "../../api/taskAPI";

export const changeFilterTasks = (state: tasksType, todolistId: string, filter: FilterValueType) => {
  switch (filter) {
    case "ACTIVE":
      return {...state, [todolistId]: state[todolistId].filter((task: taskType) => task.status === TasksStatus.Completed)}
    case "COMPLETED":
      return {...state, [todolistId]: state[todolistId].filter((task: taskType) => task.status === TasksStatus.New)}
    default:
      return state;
  }
}
