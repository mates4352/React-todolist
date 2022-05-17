import {Todolist} from "./Todolist";
import {StoriesDecorator} from "../../stories/StoriesDecorator";
import {ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
   title: 'Todolist',
   component: Todolist,
   decorators: [StoriesDecorator],
}

const changeTitle = (value: string) => action(value);
const addValue = (value: string) => action(value);

// export const TodolistStories: ComponentStory<typeof Todolist> = () => <Todolist
//                                                                                id={'1'}
//                                                                                title={'Todolist'}
//                                                                                filter={'ALL'}
//                                                                                changeTitle={changeTitle}
//                                                                                addValue={addValue}/>
