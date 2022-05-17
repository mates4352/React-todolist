import {EditModeText} from "./EditModeText";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: 'EditModeText',
   component: EditModeText,
} as ComponentMeta<typeof EditModeText>

const text = 'EditModeText';
const changeValue = (value: string) => alert(value);

export const EditModeTextStories: ComponentStory<typeof EditModeText> = () => <EditModeText text={text} changeValue={changeValue}/>
