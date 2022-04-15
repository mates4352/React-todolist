import {
  AddTodolistTActionCreate,
  RemoveTodolistActionCreate,
  todolistReducer, todolistType
} from "./todolist-reducers/todolist-reducer";
import {tasks, tasksReducer} from "./task-reducers/tasks-reducer";

test('ids should be equals', () => {
  const stateTasks: tasks = {
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

  const stateTodolist: Array<todolistType> = [
    {id: 'todolistId1', title: "What to learn", filter: "all"},
    {id: 'todolistId2', title: "What to buy", filter: "all"}
  ]

  const action = AddTodolistTActionCreate("new todolist");

  const endTasksState = tasksReducer(stateTasks, action)
  const endTodolistsState = todolistReducer(stateTodolist, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[2];
  const idFromTodolists = endTodolistsState[2].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
  expect(stateTodolist.length).toBe(2)
  expect(keys.length).toBe(3)
  expect(endTasksState[action.todolistId]).toBeDefined()
  expect(endTodolistsState.length).toBe(3)
});

test('property with todolistId should be deleted', () => {
  const stateTasks: tasks = {
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

  const action = RemoveTodolistActionCreate("todolistId2");

  const endState = tasksReducer(stateTasks, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

