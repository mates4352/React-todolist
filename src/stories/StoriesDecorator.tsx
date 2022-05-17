import {Provider} from "react-redux";
import {reduxStore} from "../bll/redux-store";

export const StoriesDecorator = (story: any) => {
   return <Provider store={reduxStore}> {story()} </Provider>
}
