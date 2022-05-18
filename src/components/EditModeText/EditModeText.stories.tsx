import {EditModeText} from "./EditModeText";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'Todolist/EditModeText',
   component: EditModeText,
} as ComponentMeta<typeof EditModeText>

const args = {
   text: 'EditModeText',
   changeValue: (value: string) => alert(value),
}

const Template: ComponentStory<typeof EditModeText> = (args) => <EditModeText {...args}/>


export const EditModeTextStories = Template.bind({});
EditModeTextStories.args = {
   ...args
}
