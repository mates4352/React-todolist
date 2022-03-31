import {tasks} from "../../App";
import {
  changeTaskStatusCreateAction, changeTextStatusCreateAction,
  removeTaskCreateAction,
  addTaskCreateAction,
  tasksReducer
} from "./tasks-reducer";

test('Should change state object-tasks', () => {

  const state: tasks = {
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  }

  const action = addTaskCreateAction('todolistId1', 'React')
  const newState = tasksReducer(state, action)

  expect(state).toEqual({
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  });
  expect(newState['todolistId1'].length).toBe(4)
  expect(newState['todolistId1'][3].text).toBe('React')
})

test('Should change state object-tasks', () => {

  const state: tasks = {
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  }

  const action = removeTaskCreateAction('todolistId1', '1')
  const newState = tasksReducer(state, action)

  expect(state).toEqual({
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  });

  expect(newState['todolistId1'].length).toBe(2)
  expect(newState['todolistId2'].length).toBe(3)
  expect(newState['todolistId1'][0]).toBeDefined()
  expect(newState['todolistId1'][0].text).toBe('Js')
  expect(newState['todolistId1'][0].isDown).toBeTruthy()
})

test('status of specified task should be changed', () => {
  const state: tasks = {
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  }

  const action = changeTaskStatusCreateAction('todolistId1', '1', false)
  const newState = tasksReducer(state, action)

  expect(state).toEqual({
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  });

  expect(newState['todolistId1'][0].isDown).toBeFalsy();
  expect(newState['todolistId2'][0].isDown).toBeTruthy();
});

test('text of specified task should be changed', () => {
  const state: tasks = {
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  }

  const action = changeTextStatusCreateAction('todolistId1', '1', 'React')
  const newState = tasksReducer(state, action)

  expect(state).toEqual({
    'todolistId1': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ],

    'todolistId2': [
      {id: '1', isDown: true, text: "Html-Css"},
      {id: '2', isDown: true, text: "Js"},
      {id: '3', isDown: false, text: "ReactJs"},
    ]
  });

  expect(newState['todolistId1'][0].text).toBe('React')
  expect(newState['todolistId2'][0].text).toBe('Html-Css')
});
