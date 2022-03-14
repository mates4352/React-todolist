import * as React from 'react';
import {ChangeEvent, useState} from "react";
import s from './InputTodolist.module.scss';

type inputTodolist = {
  addTask: (value: string) => void
  className?: any
}

export const InputTodolist: React.FC<inputTodolist> = ({addTask, className}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>('');
  const onChangeInput = (element: ChangeEvent<HTMLInputElement>) => {
    setInputValue(element.currentTarget.value)
  }

  const onKeyUpInput = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter" && key.currentTarget.value !== "") {
      addTask(inputValue)
      setError('')
      setInputValue('')
    } else if (key.key === "Enter" && key.currentTarget.value === "") {
      setError('Title is required')
    }
  }
  const onClinkButton = () => {
    if (inputValue.trim() !== "") {
      addTask(inputValue)
      setError('')
      setInputValue('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <>
      <div className={`${s.inputTodolist} ${className}`}>
        <input
          className={s.input}
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          onKeyUp={onKeyUpInput}/>

        <button className={s.button}
                type={"button"}
                onClick={onClinkButton}>
          +
        </button>

        <small className={s.error}>{error}</small>
      </div>
    </>
  )
}
