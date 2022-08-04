import {instance} from "./instance";
import {responseApiType} from "./authAPI";

export enum TasksStatus {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
}

export enum TasksPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}

export const taskAPI = {
   getTasks(todolistId: string) {
      return instance.get<tasksApiType<Array<taskApiType>>>(`todo-lists/${todolistId}/tasks`).then(result => result.data.items)
   },

   addTask(todolistId: string, title: string) {
      return instance.post<responseApiType<{item: taskApiType}>>(`todo-lists/${todolistId}/tasks`, {title}).then(result => result.data)
   },

   updateTaskStatus(task: taskApiType) {
      const todolistId: string = task.todoListId;
      const taskId: string = task.id;

      const status = () => {
         switch (task.status) {
            case TasksStatus.Completed:
               return TasksStatus.New;

            case TasksStatus.New:
               return TasksStatus.Completed;

            default:
               return task.status
         }
      }

      return instance.put<responseApiType<{item: taskApiType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, status: status()})
          .then((result) => result.data)
   },

   updateText(task: taskApiType, title: string) {
      const todolistId: string = task.todoListId;
      const taskId: string = task.id;

      return instance.put<responseApiType<{item: taskApiType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, title: title})
          .then((result) => result.data)
   },

   deleteTask(task: taskApiType) {
      const todolistId: string = task.todoListId;
      const taskId: string = task.id;
      return instance.delete<responseApiType<{item: taskApiType}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
   }
}

export type tasksApiType<T> = {
   error: string
   items: T
   totalCount: number
}

export type taskApiType = {
   description: string
   title: string
   status: TasksStatus
   priority: TasksPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}
