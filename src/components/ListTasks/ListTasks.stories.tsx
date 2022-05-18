import {ListTasks} from "./ListTasks";
import {StoriesDecorator} from "../../stories/StoriesDecorator";
import {ComponentStory} from "@storybook/react";

export default {
   title: 'Todolist/ListTasks',
   component: ListTasks,
   decorators: [StoriesDecorator],
}



const args = {
   id: '1',
   filterTasks: {
      ['1']: [
         { id: '1', isDown: true, text: 'task-1'},
         { id: '2', isDown: false, text: 'task-2'},
         { id: '3', isDown: true, text: 'task-3'},
      ],
   }
}

const Template: ComponentStory<typeof ListTasks> = (args) => <ListTasks {...args}/>
export const ListTasksStories = Template.bind({});
ListTasksStories.args = {
   ...args
}

