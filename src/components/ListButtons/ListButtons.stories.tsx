import {ListButtons} from "./ListButtons";
import {ComponentStory} from "@storybook/react";
import {StoriesDecorator} from "../../stories/StoriesDecorator";

export default {
   title: 'ListButtons',
   component: ListButtons,
   decorators: [StoriesDecorator]
}

export const ListButtonsStories: ComponentStory<typeof ListButtons> = () => (
    <>
       <ListButtons id={'1'} filter={"ALL"}/>
       <br/>
       <ListButtons id={'2'} filter={"ACTIVE"}/>
       <br/>
       <ListButtons id={'3'} filter={"COMPLETED"}/>
    </>
)


