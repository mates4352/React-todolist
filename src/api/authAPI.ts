import {instance} from "./instance";

export const authAPI = {
   login(data: loginApi) {
      return instance.post<responseApiType<{userId: number}>>('auth/login', data).then(result => result.data)
   },
   deleteLogin() {
      return instance.delete<responseApiType<{}>>('auth/login').then(result => result.data)
   },
   isMe() {
      return instance.get<responseApiType<{id: number, email: string, login: string} | {}>>('auth/me').then(result => result.data)
   }
}

export type loginApi = {
   email: string
   password: string
   rememberMe: boolean
   captcha?: string
}

export type responseApiType<T> = {
   data: T
   messages: Array<string>
   resultCode: number
}
