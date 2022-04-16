import {
  changeTaskStatusCreateAction,
  removeTaskCreateAction,
  addTaskCreateAction,
  tasksReducer, changeTaskTextCreateAction, tasks, changeFilterTasksCreateAction
} from "./tasks-reducer";
import {todolistId1} from "../todolist-reducers/todolist-reducer";

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

  const action = changeTaskStatusCreateAction('todolistId1', '1')
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

  const action = changeTaskTextCreateAction('todolistId1', '1', 'React')
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

test('change filter tasks to test action FILTER-TASKS', () => {
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

  const actionActive = changeFilterTasksCreateAction({id: 'todolistId1', title: 'Todolist1', filter: 'ACTIVE'})
  const newStateActive = tasksReducer(state, actionActive)

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
  expect(newStateActive['todolistId1'].length).toBe(2)
  expect(newStateActive['todolistId1'][0].isDown).toBeTruthy()
  expect(newStateActive['todolistId1'][1].isDown).toBeTruthy()
  expect(newStateActive['todolistId1'][2]).toBeUndefined()
  expect(state['todolistId1']).not.toBe(newStateActive['todolistId1'])
  expect(state['todolistId2']).toBe(newStateActive['todolistId2'])
  expect(newStateActive['todolistId2'].length).toBe(3)
  expect(newStateActive['todolistId2'][3]).toBeFalsy()

  const actionCompleted = changeFilterTasksCreateAction({id: 'todolistId2', title: 'Todolist2', filter: 'COMPLETED'})
  const newStateCompleted = tasksReducer(state, actionCompleted)

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
  expect(newStateCompleted['todolistId2'].length).toBe(1)
  expect(newStateCompleted['todolistId2'][0].isDown).toBeFalsy()
  expect(newStateCompleted['todolistId2'][1]).toBeUndefined()
  expect(newStateCompleted['todolistId2'][2]).toBeUndefined()
  expect(state['todolistId2']).not.toBe(newStateCompleted['todolistId2'])
  expect(state['todolistId1']).toBe(newStateCompleted['todolistId1'])
  expect(newStateCompleted['todolistId1'].length).toBe(3)
  expect(newStateCompleted['todolistId1'][0]).toBeTruthy()
  expect(newStateCompleted['todolistId1'][2]).toBeTruthy()
  expect(newStateCompleted['todolistId1'][3]).toBeFalsy()
})
