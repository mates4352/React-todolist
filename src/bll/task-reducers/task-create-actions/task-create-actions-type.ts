import {AddTask, ChangeTaskStatus, ChangeTaskText, DeleteTask, SetTasks} from "./task-create-actions";
import {
   AddTodolistType,
   RemoveTodolistType
} from "../../todolist-reducers/todoList-create-actions/todoList-create-actions-type";

export type tasksActionType =
    SetTasksType
    | AddTaskType
    | DeleteTaskType
    | ChangeTaskStatusType
    | ChangeTaskTextType
    | AddTodolistType
    | RemoveTodolistType
type SetTasksType = ReturnType<typeof SetTasks>
type AddTaskType = ReturnType<typeof AddTask>
type DeleteTaskType = ReturnType<typeof DeleteTask>
type ChangeTaskStatusType = ReturnType<typeof ChangeTaskStatus>
type ChangeTaskTextType = ReturnType<typeof ChangeTaskText>
