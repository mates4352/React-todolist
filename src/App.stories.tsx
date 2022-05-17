import App from "./App";
import {ComponentStory} from "@storybook/react";
import {StoriesDecorator} from "./stories/StoriesDecorator";

export default {
   title: 'App',
   component: App,
   decorators: [StoriesDecorator]
}

export const AppStories: ComponentStory<typeof App> = () => <App/>
