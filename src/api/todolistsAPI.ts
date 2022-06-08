import {instance} from "./instance";

type todolistDataApiType<D> = {
   resultCode: 0
   messages: [],
   data: D
}

export type todolistApiType = {
   id: string,
   title: string,
   addedDate: string,
   order: number
}

export const todolistsAPI = {
   getTodolists() {
      return instance.get<Array<todolistApiType>>('todo-lists').then((result) => result.data);
   },

   addTodolist(title: string) {
      return instance.post<todolistDataApiType<{item: todolistApiType}>>('todo-lists', {title}).then((result) => result.data.data.item)
   },

   removeTodolist(todolistId: string) {
      return instance.delete<todolistDataApiType<{}>>(`todo-lists/${todolistId}`).then((result) => result.data)
   },

   updateTodolist(todolistId: string, title: string) {
      return instance.put<todolistDataApiType<{}>>(`todo-lists/${todolistId}`, {title}).then((result) => result.data)
   }
}
