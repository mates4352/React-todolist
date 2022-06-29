import {appStoreType} from "./redux-store";

export const loadState = () => {
   try {
      const serializedState = localStorage.getItem('state');
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
   } catch (err) {
      return undefined;
   }
};

export const saveState = (state: appStoreType) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
   } catch {
   }
};
