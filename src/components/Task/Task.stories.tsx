import React, {Component} from 'react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'Tasks',
   component: Task,
} as ComponentMeta<typeof Task>;

const changeTodolistTaskValue = action('Изменить у таски текст')
const changeTaskStatus = action('Изменить статус таски')
const onKeyChangeTaskStatus = action('При нажатие изменить статус саски')
const removeTask = action('Удалить таску')

export const TaskStories: ComponentStory<typeof Task> = (args: any) => (
    <>
       <Task
           task={{id: '1', isDown: true, text: 'task-1'}}
           changeTodolistTaskValue={changeTodolistTaskValue}
           changeTaskStatus={changeTaskStatus}
           onKeyChangeTaskStatus={onKeyChangeTaskStatus}
           removeTask={removeTask}/>

       <Task
           task={{id: '2', isDown: false, text: 'task-2'}}
           changeTodolistTaskValue={changeTodolistTaskValue}
           changeTaskStatus={changeTaskStatus}
           onKeyChangeTaskStatus={onKeyChangeTaskStatus}
           removeTask={removeTask}/>
    </>
)
