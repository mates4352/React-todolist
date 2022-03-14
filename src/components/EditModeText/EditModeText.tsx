// @flow
import * as React from 'react';
import s from './EditModeText.module.scss';
import {ChangeEvent, useState} from "react";

type EditModeTextType = {
  text: string
  changeValue: (value: string) => void
}

export const EditModeText: React.FC<EditModeTextType> = ({text, changeValue}) => {
  const [isTextMode, setIsTextMode] = useState<boolean>(true)
  const editText = () => setIsTextMode(!isTextMode)
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
  }

  return (
    <>
      {!isTextMode &&
          <input type="text"
                 value={text}
                 onBlur={editText}
                 onChange={changeText}
                 autoFocus/>
      }
      {isTextMode &&
          <span
              className={s.text}
              onDoubleClick={editText}>
            {text}
          </span>
      }
    </>
  )
}
