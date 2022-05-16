import { v1 } from "uuid";
import {
  todolistReducer, todolistType
} from "../todolist-reducer";
import {
  AddTodolistTActionCreate,
  ChangeFilterActionCreate,
  ChangeTitleTActionCreate,
  RemoveTodolistActionCreate
} from "../todolist-create-actions";
import {FilterValueType} from "../../task-reducers/tasks-reducer";

let todolistId1: string = '';
let todolistId2: string = '';
let startState: Array<todolistType> = []

beforeEach(() => {
  todolistId1 = v1();
  todolistId2= v1();

  startState = [
    {id: todolistId1, title: "What to learn", filter: "ALL"},
    {id: todolistId2, title: "What to buy", filter: "ALL"}
  ]
})

test('correct todolist should be removed', () => {
  const action = RemoveTodolistActionCreate(todolistId1);
  const endState = todolistReducer(startState, action)

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let newTodolistTitle = "New Todolist";
  const action =  AddTodolistTActionCreate(newTodolistTitle);
  const endState = todolistReducer(startState, action)

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValueType = "COMPLETED";
  const action =  ChangeFilterActionCreate(todolistId2, newFilter);
  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe("ALL");
  expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {
  let newTodolistTitle = "New Todolist";
  const action = ChangeTitleTActionCreate(todolistId2, newTodolistTitle);
  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});


