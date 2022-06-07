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

type tasksApiType = {
   error: string
   items: Array<taskApiType>
   totalCount: number
}

export type taskApiType = {
   description: string
   title: string
   completed: boolean
   status: TasksStatus
   priority: TasksPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}

export const taskAPI = {
   getTasks(todolistId: string) {
      return instance.get<tasksApiType>(`todo-lists/${todolistId}/tasks`).then(result => result.data.items)
   }
}
