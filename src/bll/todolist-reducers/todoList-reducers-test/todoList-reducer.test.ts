import {
  todoListReducer, todolistType
} from "../todoList-reducer";
import {
  AddTodolist,
  ChangeFilter,
  ChangeTitle,
  RemoveTodolist, SetTodolists
} from "../todoList-create-actions/todoList-create-actions";
import {FilterValueType} from "../../task-reducers/tasks-reducer";

let startState: Array<todolistType> = []

beforeEach(() => {
  startState = [
    {id: 'todolistId1', title: "What to learn", addedDate: '', order: 0, filter: "ALL", entityStatus: "idle"},
    {id: 'todolistId2', title: "What to buy", addedDate: '', order: 0, filter: "ALL", entityStatus: "idle"}
  ]
})

test('Test todoListReducer case SET_TODOLISTS', () => {
  const action =  SetTodolists(startState);
  const endState = todoListReducer(startState, action)

  expect(startState).toEqual(startState)
  expect(endState.length).toBe(2);
});

test('Test todoListReducer case ADD_TODOLIST', () => {
  let newTodolistTitle = {id: 'todolistId3', title: "What to learn", addedDate: '', order: 0};
  const action =  AddTodolist(newTodolistTitle);
  const endState = todoListReducer(startState, action)

  expect(startState).toEqual(startState)
  expect(endState[2].id).toBe('todolistId3');
  expect(endState[2].title).toBe('What to learn');
  expect(endState[2].addedDate).toBe('');
  expect(endState[2].order).toBe(0);
  expect(endState[2].filter).toBe('ALL');
  expect(endState.length).toBe(3);
});

test('Test todoListReducer case REMOVE_TODOLIST', () => {
  const action = RemoveTodolist('todolistId1');
  const endState = todoListReducer(startState, action)

  expect(startState).toEqual(startState)
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('todolistId2');
  expect(endState[1]).toBeUndefined()
});

test('Test todoListReducer case CHANGE_FILTER', () => {
  let newFilter: FilterValueType = "COMPLETED";
  const action =  ChangeFilter('todolistId2', newFilter);
  const endState = todoListReducer(startState, action);

  expect(startState).toEqual(startState)
  expect(endState[0].filter).toBe("ALL");
  expect(endState[1].id).toBe('todolistId2');
  expect(endState[1].title).toBe('What to buy');
  expect(endState[1].addedDate).toBe('');
  expect(endState[1].order).toBe(0);
  expect(endState[1].filter).toBe(newFilter);
});

test('Test todoListReducer case CHANGE_TITLE', () => {
  let newTodolistTitle = "New Todolist";
  const action = ChangeTitle('todolistId2', newTodolistTitle);
  const endState = todoListReducer(startState, action);

  expect(startState).toEqual(startState)
  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
  expect(endState[1].id).toBe('todolistId2');
  expect(endState[1].addedDate).toBe('');
  expect(endState[1].order).toBe(0);
  expect(endState[1].filter).toBe('ALL');
});


