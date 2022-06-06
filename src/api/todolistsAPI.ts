import {instance} from "./instance";

export type todolistAPIType = {
   id: string,
   title: string,
   addedDate: string,
   order: number
}

export const todolistsAPI = {
   getTodolists() {
      return instance.get<Array<todolistAPIType>>('todo-lists').then((result) => result.data);
   }
}
