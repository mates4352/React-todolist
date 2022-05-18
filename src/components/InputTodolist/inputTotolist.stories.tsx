import {InputTodolist} from "./InputTodolist";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'Todolist/InputTodolist',
   component: InputTodolist,
} as ComponentMeta<typeof InputTodolist>;

const args = {
   addValue: (value: string) => alert(value)
}

const Tamplate: ComponentStory<typeof InputTodolist> = () => <InputTodolist {...args}/>

export const InputTodolistStories = Tamplate.bind({});
InputTodolistStories.args = {
   ...args
}

