import {ListButtons} from "./ListButtons";
import {ComponentStory} from "@storybook/react";
import {StoriesDecorator} from "../../stories/StoriesDecorator";

export default {
   title: 'Todolist/ListButtons',
   component: ListButtons,
   decorators: [StoriesDecorator]
}

const args = {
   id: '1',
   filter: 'ACTIVE'
}

const Template: ComponentStory<typeof ListButtons> = (args) => <ListButtons {...args}/>

export const ListButtonsFilterAllStories = Template.bind({});
ListButtonsFilterAllStories.args = {
   ...args,
   filter: 'ALL'
}
export const ListButtonsFilterActiveStories = Template.bind({});
ListButtonsFilterActiveStories.args = {
   ...args,
   filter: 'ACTIVE'
}
export const ListButtonsFilterCompletedStories = Template.bind({});
ListButtonsFilterCompletedStories.args = {
   ...args,
   filter: 'COMPLETED'
}
