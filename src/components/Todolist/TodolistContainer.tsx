import React, {useCallback, useMemo} from 'react';
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../bll/redux-store";
import {FilterValueType, tasksType, taskType} from "../../bll/task-reducers/tasks-reducer";
import {changeFilterTasks} from "../../bll/task-reducers/task.thunk";
import {addTaskCreateAction, changeTaskTextCreateAction} from "../../bll/task-reducers/task-create-actions";
import {ChangeTitleTActionCreate} from "../../bll/todolist-reducers/todolist-create-actions";

type TodolistContainerType = {
   id: string
   title: string
   filter: FilterValueType
};

export const TodolistContainer: React.FC<TodolistContainerType> = React.memo((props) => {
       const {
          id,
          title,
          filter,
       } = props
       console.log('todolist')
       const dispatch = useDispatch();

       const changeTitle = useCallback((value: string): void => {
          dispatch(ChangeTitleTActionCreate(id, value))
       }, [dispatch, id])

       const addValue = useCallback((value: string) => {
          dispatch(addTaskCreateAction(id, value))
       }, [dispatch, id])

       return <Todolist
              id={id}
              title={title}
              filter={filter}
              changeTitle={changeTitle}
              addValue={addValue}
       />
    }
)
