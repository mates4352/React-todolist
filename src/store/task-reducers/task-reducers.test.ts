// @ts-ignore

import {useState} from "react";
import {v1} from "uuid";
import {tasks} from "../../App";
import {removeTaskCreateAction, sendTaskCreateAction, tasksReduser} from "./tasks-reducer";

test('Should change state object-tasks', () => {
  const todolistId1 = v1()
  const todolistId2= v1()

  const state: tasks = {
    [todolistId1]: [
      {id: v1(), isDown: true, text: "Html-Css"},
      {id: v1(), isDown: true, text: "Js"},
      {id: v1(), isDown: false, text: "ReactJs"},
    ],

    [todolistId2]: [
      {id: v1(), isDown: true, text: "Html-Css"},
      {id: v1(), isDown: true, text: "Js"},
      {id: v1(), isDown: false, text: "ReactJs"},
    ]
  }

  const action = sendTaskCreateAction(todolistId1, 'React')
  const newState = tasksReduser(state, action)
  const keys = Object.keys(state)

  expect(keys.length).toBe(2)
  expect(state[todolistId1].length).toBe(3)
  expect(state[todolistId2].length).toBe(3)
  expect(state).not.toBe(newState)
  expect(newState[todolistId1].length).toBe(4)
  expect(newState[todolistId1][3].text).toBe('React')
})

test('Should change state object-tasks', () => {
  const todolistId1 = v1()
  const todolistId2= v1()

  const state: tasks = {
    [todolistId1]: [
      {id: v1(), isDown: true, text: "Html-Css"},
      {id: v1(), isDown: true, text: "Js"},
      {id: v1(), isDown: false, text: "ReactJs"},
    ],

    [todolistId2]: [
      {id: v1(), isDown: true, text: "Html-Css"},
      {id: v1(), isDown: true, text: "Js"},
      {id: v1(), isDown: false, text: "ReactJs"},
    ]
  }

  const action = removeTaskCreateAction(todolistId1, state[todolistId1][0].id)
  const newState = tasksReduser(state, action)
  const keys = Object.keys(state)

  expect(keys.length).toBe(2)
  expect(state).not.toBe(newState)
  expect(state[todolistId1].length).toBe(3)
  expect(newState[todolistId1].length).toBe(2)
})

