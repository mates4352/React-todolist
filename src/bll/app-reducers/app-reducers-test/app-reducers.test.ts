import {appReducer, appReducerType} from "../app-reduer";
import {clearError, setAppError, setAppStatus} from "../app-create-actions/app-create-actions";

let state: appReducerType;
beforeEach(() => {
   state = {
      status: 'idle',
      error: null
   }
})

test('Test appReducer case SET_APP/STATE/STATUS',() => {
   const action = setAppStatus('succeeded');
   const newState = appReducer(state, action);

   expect(state).toEqual(state);
   expect(state.error).toBeNull();
   expect(newState.status).toBe('succeeded');
})

test('Test appReducer case SET_ERROR/STATE/ERROR',() => {
   const action = setAppError('Error');
   const newState = appReducer(state, action);

   expect(state).toEqual(state);
   expect(state.status).toBe('idle');
   expect(newState.error).toBe('Error');
})

test('Test appReducer case CLEAR_ERROR/STATE/ERROR',() => {
   state = {
      status: 'idle',
      error: 'error'
   }
   const action = clearError();
   const newState = appReducer(state, action);

   expect(state).toEqual(state);
   expect(state.status).toBe('idle');
   expect(newState.error).toBe(null);
})
