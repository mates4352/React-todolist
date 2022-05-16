import React, {useCallback} from 'react';
import {Todolist} from "./Todolist";
import {useDispatch} from "react-redux";
import {FilterValueType} from "../../bll/task-reducers/tasks-reducer";
import {addTaskCreateAction} from "../../bll/task-reducers/task-create-actions";
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