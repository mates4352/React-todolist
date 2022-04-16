import { v1 } from "uuid";
import {
  AddTodolistTActionCreate,
  ChangeFilterActionCreate, ChangeTitleTActionCreate, FilterValueType,
  RemoveTodolistActionCreate,
  todolistReducer, todolistType
} from "./todolist-reducer";

test('correct todolist should be removed', () => {

  let todolistId1: string = v1();
  let todolistId2: string = v1();
  const startState: Array<todolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action = RemoveTodolistActionCreate(todolistId1);

  const endState = todolistReducer(startState, action)

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<todolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action =  AddTodolistTActionCreate(newTodolistTitle);

  const endState = todolistReducer(startState, action)

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "COMPLETED";

  const startState: Array<todolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action =  ChangeFilterActionCreate(todolistId2, newFilter);

  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});


test('correct todolist should change its name', () => {
  let todolistId1: string = v1();
  let todolistId2: string = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<todolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action = ChangeTitleTActionCreate(todolistId2, newTodolistTitle);

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

