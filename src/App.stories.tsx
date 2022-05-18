import App from "./App";
import {ComponentStory} from "@storybook/react";
import {StoriesDecorator} from "./stories/StoriesDecorator";

export default {
   title: 'Todolist/App',
   component: App,
   decorators: [StoriesDecorator]
}

const Template: ComponentStory<typeof App> = () => <App/>

export const AppStories = Template.bind({});
