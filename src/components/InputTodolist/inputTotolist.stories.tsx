import {InputTodolist} from "./InputTodolist";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'InputTodolist',
   component: InputTodolist,
} as ComponentMeta<typeof InputTodolist>;

const addValueAction = (value: string) => alert(value);

export const InputTodolistStories: ComponentStory<typeof InputTodolist> = () => <InputTodolist addValue={addValueAction}/>
