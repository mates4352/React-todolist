import {
  todolistReducer, todolistType
} from "./todolist-reducers/todolist-reducer";
import {tasksType, tasksReducer} from "./task-reducers/tasks-reducer";
import {AddTodolistTActionCreate, RemoveTodolistActionCreate} from "./todolist-reducers/todolist-create-actions";
import {TasksPriorities, TasksStatus} from "../api/taskAPI";

let stateTasks: tasksType = {}

beforeEach(() => {
  stateTasks = {
    'todolistId1': [
      {
        description: '',
        title: "Html-Css",
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

test('ids should be equals', () => {
  const stateTodolist: Array<todolistType> = [
    {id: 'todolistId1', title: "What to learn", addedDate: '', order: 0, filter: "ALL"},
    {id: 'todolistId2', title: "What to buy", addedDate: '', order: 0, filter: "ALL"}
  ]

  const action = AddTodolistTActionCreate("new todolist");

  const endTasksState = tasksReducer(stateTasks, action)
  const endTodolistsState = todolistReducer(stateTodolist, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[2];
  const idFromTodolists = endTodolistsState[2].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
  expect(stateTodolist.length).toBe(2)
  expect(keys.length).toBe(3)
  expect(endTasksState[action.payload.todolistId]).toBeDefined()
  expect(endTodolistsState.length).toBe(3)
});

test('property with todolistId should be deleted', () => {
  const action = RemoveTodolistActionCreate("todolistId2");

  const endState = tasksReducer(stateTasks, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

