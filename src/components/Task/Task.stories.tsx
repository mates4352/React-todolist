import React from 'react';
import {Task} from "./Task";

export default {
   title: 'Task',
   component: Task
}

const taskObj = {
   id: '1',
   isDown: true,
   text: 'Hello',
}

const changeTodolistTaskValue = () => console.log('Изменить у таски текст')
const changeTaskStatus = () => console.log('Изменить статус таски')
const onKeyChangeTaskStatus = () => console.log('При нажатие изменить статус саски')
const removeTask = () => console.log('Удалить таску')


export const TaskStories = () =>  <Task
    task={taskObj}
    changeTodolistTaskValue={changeTodolistTaskValue}
    changeTaskStatus={changeTaskStatus}
    onKeyChangeTaskStatus={onKeyChangeTaskStatus}
    removeTask={removeTask}/>
