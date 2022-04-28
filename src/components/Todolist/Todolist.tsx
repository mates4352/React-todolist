import s from './Todolist.module.scss'
import React from "react";
import {InputTodolist} from "../InputTodolist/InputTodolist";
import {EditModeText} from "../EditModeText/EditModeText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useDispatch} from "react-redux";
import {
   ChangeFilterActionCreate,
   RemoveTodolistActionCreate
} from "../../bll/todolist-reducers/todolist-create-actions";
import {
   changeTaskStatusCreateAction, changeTaskTextCreateAction, removeTaskCreateAction
} from "../../bll/task-reducers/task-create-actions";
import {FilterValueType, tasksType} from "../../bll/task-reducers/tasks-reducer";

type todolistType = {
   id: string
   title: string
   filter: FilterValueType
   filterTasks: tasksType
   changeTitle: (value: string) => void
   addValue: (value: string) => void
}

export const Todolist: React.FC<todolistType> = (props) => {
   const {
      id,
      title,
      filter,
      filterTasks,
      changeTitle,
      addValue,
   } = props

   const dispatch = useDispatch();
   const isClassActiveButton = (value: string) => filter === value ? `${s.subitem_button_active}` : '';

   return (
       <div className={s.todolist}>

          <Button className={s.buttonDelete} aria-label="Button delete"
                  onClick={() => dispatch(RemoveTodolistActionCreate(id))}>
             <DeleteOutlineIcon fontSize="large"/>
          </Button>

          <h1 className={s.title}><EditModeText text={title} changeValue={changeTitle}/></h1>

          <InputTodolist addValue={addValue}/>

          <ul className={s.list}>
             {filterTasks[id].map((task) => {
                    const changeTodolistTaskValue = (value: string) => dispatch(changeTaskTextCreateAction(value, task.id, id))
                    return (
                        <li className={!task.isDown ? `${s.item_opacity} ${s.item}` : s.item} key={task.id}>
                           <Checkbox
                               checked={task.isDown}
                               onClick={() => dispatch(changeTaskStatusCreateAction(id, task.id))}
                               onKeyUp={key => key.key === "Enter" && dispatch(changeTaskStatusCreateAction(id, task.id))}
                               defaultChecked
                               color="primary"
                           />

                           <EditModeText text={task.text} changeValue={changeTodolistTaskValue}/>

                           <IconButton aria-label="Button delete task"
                                       onClick={() => dispatch(removeTaskCreateAction(id, task.id))}>
                              <DeleteIcon/>
                           </IconButton>
                        </li>
                    )
                 }
             )}
          </ul>

          <ul className={s.sublist}>
             <li className={s.subitem}>
                <Button className={isClassActiveButton("ALL")}
                        onClick={() => dispatch(ChangeFilterActionCreate(id, "ALL"))}
                        color="primary">
                   All
                </Button>
             </li>

             <li>
                <Button className={isClassActiveButton("ACTIVE")}
                        onClick={() => dispatch(ChangeFilterActionCreate(id, "ACTIVE"))}
                        color="secondary">
                   Active
                </Button>
             </li>

             <li>
                <Button className={isClassActiveButton("COMPLETED")}
                        onClick={() => dispatch(ChangeFilterActionCreate(id, "COMPLETED"))}>
                   Completed
                </Button>
             </li>
          </ul>
       </div>
   );
}
