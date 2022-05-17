import {ListTasks} from "./ListTasks";
import {StoriesDecorator} from "../../stories/StoriesDecorator";
import {ComponentStory} from "@storybook/react";

export default {
   title: 'ListTasks',
   component: ListTasks,
   decorators: [StoriesDecorator],
}

const filterTasks = {
   ['1']: [
      { id: '1', isDown: true, text: 'task-1'},
      { id: '2', isDown: false, text: 'task-2'},
      { id: '3', isDown: true, text: 'task-3'},
   ],
}

export const ListTasksStories: ComponentStory<typeof ListTasks> = () => <ListTasks id={'1'} filterTasks={filterTasks}/>
