import React, {Component} from 'react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'Todolist/Tasks',
   component: Task,
} as ComponentMeta<typeof Task>;

const changeTodolistTaskValue = action('Изменить у таски текст')
const changeTaskStatus = action('Изменить статус таски')
const onKeyChangeTaskStatus = action('При нажатие изменить статус саски')
const removeTask = action('Удалить таску')

const args = {
   changeTodolistTaskValue,
   changeTaskStatus,
   onKeyChangeTaskStatus,
   removeTask,
}

const Template: ComponentStory<typeof Task> = (args: any) => <Task {...args}/>

export const TaskStoriesIsDone = Template.bind({})
TaskStoriesIsDone.args = {
   ...args,
   task: {id: '1', isDown: true, text: 'task-is-down'},
}

export const TaskStoriesNotIsDone = Template.bind({})
TaskStoriesNotIsDone.args = {
   ...args,
   task: {id: '1', isDown: false, text: 'task-is-not-down'},
}
