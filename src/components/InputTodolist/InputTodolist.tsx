import {Button, TextField} from '@material-ui/core';
import  React, {KeyboardEvent} from 'react';
import {ChangeEvent, useState} from "react";
import s from './InputTodolist.module.scss';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

type inputTodolist = {
  addTask: (value: string) => void
  className?: any
}

export const InputTodolist: React.FC<inputTodolist> = ({addTask, className}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>('');
  const onChangeInput = (element: ChangeEvent<HTMLInputElement>):void => {
    setInputValue(element.currentTarget.value)
  }

  const onKeyUpInput = (key: KeyboardEvent<HTMLInputElement>):void => {
    if (key.key === "Enter" && key.currentTarget.value !== "") {
      addTask(inputValue)
      setError('')
      setInputValue('')
    } else if (key.key === "Enter" && key.currentTarget.value === "") {
      setError('Value is required')
    }
  }
  const onClinkButton = ():void => {
    if (inputValue.trim() !== "") {
      addTask(inputValue)
      setError('')
      setInputValue('')
    } else {
      setError('Value is required')
    }
  }

  return (
    <div className={className}>
      <div className={`${s.inputTodolist}`}>
        <TextField
          id="outlined-basic"
          label="Set task"
          variant="outlined"
          value={inputValue}
          onChange={onChangeInput}
          onKeyUp={onKeyUpInput}/>

        <Button className={s.button} variant="contained" color="secondary" onClick={onClinkButton}><ControlPointIcon/></Button>
      </div>
      <small className={s.error}>{error}</small>
    </div>
  )
}
