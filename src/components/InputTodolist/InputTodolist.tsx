import {Button, TextField} from '@material-ui/core';
import React, {KeyboardEvent, useCallback} from 'react';
import {ChangeEvent, useState} from "react";
import s from './InputTodolist.module.scss';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {appStatusType} from "../../bll/app-reducers/app-reduer";

type inputTodolist = {
   addValue: (value: string) => void
   entityStatus?: appStatusType
   className?: any
}

export const InputTodolist: React.FC<inputTodolist> = React.memo(({addValue, className, entityStatus}) => {
   const [inputValue, setInputValue] = useState('');
   const [error, setError] = useState<string>('');

   const onChangeInput = useCallback((element: ChangeEvent<HTMLInputElement>): void => {
      setInputValue(element.currentTarget.value)
   }, [])
   console.log('InputTodolist')

   const onKeyUpInput = useCallback((key: KeyboardEvent<HTMLInputElement>): void => {
      if (key.key === "Enter" && key.currentTarget.value !== "") {
         addValue(inputValue)
         setError('')
         setInputValue('')
      } else if (key.key === "Enter" && key.currentTarget.value === "") {
         setError('Value is required')
      }
   }, [inputValue])

   const onClinkButton = useCallback((): void => {
      if (inputValue.trim() !== "") {
         addValue(inputValue)
         setError('')
         setInputValue('')
      } else {
         setError('Value is required')
      }
   }, [inputValue])

   return (
       <div className={className}>
          <div className={`${s.inputTodolist}`}>
             <TextField
                 id="outlined-basic"
                 label="Set task"
                 variant="outlined"
                 disabled={entityStatus === 'loading'}
                 value={inputValue}
                 onChange={onChangeInput}
                 onKeyUp={onKeyUpInput}/>

             <Button className={s.button} variant="contained" color="secondary"
                     onClick={onClinkButton} disabled={entityStatus === 'loading'}><ControlPointIcon/></Button>
          </div>
          <small className={s.error}>{error}</small>
       </div>
   )
})
