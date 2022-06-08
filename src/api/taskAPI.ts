import {instance} from "./instance";

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

type tasksApiType<T> = {
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

type tasksPutApiType = {
   data: {
      item: taskApiType
   }
   fieldsErrors: []
   messages: []
   resultCode: number
}

export const taskAPI = {
   getTasks(todolistId: string) {
      return instance.get<tasksApiType<Array<taskApiType>>>(`todo-lists/${todolistId}/tasks`).then(result => result.data.items)
   },

   addTask(todolistId: string, title: string) {
      return instance.post<tasksPutApiType>(`todo-lists/${todolistId}/tasks`, {title}).then(result => result.data.data.item)
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

      return instance.put<tasksPutApiType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, status: status()})
          .then((result) => result.data.data.item)
   },

   updateText(task: taskApiType, title: string) {
      const todolistId: string = task.todoListId;
      const taskId: string = task.id;

      return instance.put<tasksPutApiType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, title: title})
          .then((result) => result.data.data.item)
   },

   deleteTask(task: taskApiType) {
      const todolistId: string = task.todoListId;
      const taskId: string = task.id;
      return instance.delete<tasksPutApiType>(`todo-lists/${todolistId}/tasks/${taskId}`)
   }
}
