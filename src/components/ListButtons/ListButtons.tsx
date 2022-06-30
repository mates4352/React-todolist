import React from 'react';
import s from './ListButtons.module.scss';
import {Button} from "@material-ui/core";
import {ChangeFilter} from "../../bll/todolist-reducers/todoList-create-actions/todoList-create-actions";
import {useDispatch} from "react-redux";
import {FilterValueType} from "../../bll/task-reducers/tasks-reducer";

type ListButtonsType = {
   todolistId: string
   filter: FilterValueType
};

export const ListButtons: React.FC<ListButtonsType> = React.memo((props) => {
   const {todolistId, filter} = props;
   const dispatch = useDispatch();
   const isClassActiveButton = (value: string) => filter === value ? `${s.button_active}` : '';
   console.log('ListButtons')

   return (
       <ul className={s.list}>
          <li className={s.item}>
             <Button className={isClassActiveButton("ALL")}
                     onClick={() => dispatch(ChangeFilter(todolistId, "ALL"))}
                     color="primary">
                All
             </Button>
          </li>

          <li>
             <Button className={isClassActiveButton("ACTIVE")}
                     onClick={() => dispatch(ChangeFilter(todolistId, "ACTIVE"))}
                     color="secondary">
                Active
             </Button>
          </li>

          <li>
             <Button className={isClassActiveButton("COMPLETED")}
                     onClick={() => dispatch(ChangeFilter(todolistId, "COMPLETED"))}>
                Completed
             </Button>
          </li>
       </ul>
   )
})
