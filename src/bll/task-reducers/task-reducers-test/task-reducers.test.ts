import {
  tasksReducer, tasksType,
} from "../tasks-reducer";
import {todolistId1} from "../../todolist-reducers/todolist-reducer";
import {
  addTaskCreateAction,
  changeTaskStatusCreateAction,
  changeTaskTextCreateAction, removeTaskCreateAction
} from "../task-create-actions";
import {changeFilterTasks} from "../task.thunk";
import {TasksPriorities, TasksStatus} from "../../../api/taskAPI";
import {v1} from "uuid";
let state: tasksType = {}

beforeEach(() => {
  state = {
    'todolistId1': [
      {
        description: '',
        title: "Html-Css",
        completed: true,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        description: '',
        title: "Js",
        completed: true,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '2',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        description: '',
        title: "ReactJs",
        completed: false,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '3',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
    ],

    'todolistId2': [
      {
        description: '',
        title: "Html-Css",
        completed: true,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        description: '',
        title: "Js",
        completed: true,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '2',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        description: '',
        title: "ReactJs",
        completed: false,
        status: TasksStatus.Completed,
        priority: TasksPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '3',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
    ]
  }
})

test('Should change state object-tasks', () => {
  const action = addTaskCreateAction('todolistId1', 'React')
  const newState = tasksReducer(state, action)

  expect(state).toEqual(state);
  expect(newState['todolistId1'].length).toBe(4)
  expect(newState['todolistId1'][3].title).toBe('React')
})

test('Should change state object', () => {


  const action = removeTaskCreateAction('todolistId1', '1')
  const newState = tasksReducer(state, action)

  expect(state).toEqual(state);

  expect(newState['todolistId1'].length).toBe(2)
  expect(newState['todolistId2'].length).toBe(3)
  expect(newState['todolistId1'][0]).toBeDefined()
  expect(newState['todolistId1'][0].title).toBe('Js')
  expect(newState['todolistId1'][0].completed).toBeTruthy()
})

test('status of specified Task should be changed', () => {
  const action = changeTaskStatusCreateAction('todolistId1', '1')
  const newState = tasksReducer(state, action)

  expect(state).toEqual(state);
  expect(newState['todolistId1'][0].completed).toBeFalsy();
  expect(newState['todolistId2'][0].completed).toBeTruthy();
});

test('text of specified Task should be changed', () => {
  const action = changeTaskTextCreateAction('todolistId1', '1', 'React')
  const newState = tasksReducer(state, action)

  expect(state).toEqual(state);
  expect(newState['todolistId1'][0].title).toBe('React')
  expect(newState['todolistId2'][0].title).toBe('Html-Css')
});

test('change filter tasks to test action FILTER-TASKS', () => {
  const newStateActive = changeFilterTasks(state, 'todolistId1','ACTIVE')

  expect(state).toEqual(state);
  expect(newStateActive['todolistId1'].length).toBe(2)
  expect(newStateActive['todolistId1'][0].completed).toBeTruthy()
  expect(newStateActive['todolistId1'][1].completed).toBeTruthy()
  expect(newStateActive['todolistId1'][2]).toBeUndefined()
  expect(state['todolistId1']).not.toBe(newStateActive['todolistId1'])
  expect(state['todolistId2']).toBe(newStateActive['todolistId2'])
  expect(newStateActive['todolistId2'].length).toBe(3)
  expect(newStateActive['todolistId2'][3]).toBeFalsy()

  const newStateCompleted = changeFilterTasks(state,'todolistId2','COMPLETED')

  expect(state).toEqual(state);
  expect(newStateCompleted['todolistId2'].length).toBe(1)
  expect(newStateCompleted['todolistId2'][0].completed).toBeFalsy()
  expect(newStateCompleted['todolistId2'][1]).toBeUndefined()
  expect(newStateCompleted['todolistId2'][2]).toBeUndefined()
  expect(state['todolistId2']).not.toBe(newStateCompleted['todolistId2'])
  expect(state['todolistId1']).toBe(newStateCompleted['todolistId1'])
  expect(newStateCompleted['todolistId1'].length).toBe(3)
  expect(newStateCompleted['todolistId1'][0]).toBeTruthy()
  expect(newStateCompleted['todolistId1'][2]).toBeTruthy()
  expect(newStateCompleted['todolistId1'][3]).toBeFalsy()
})
