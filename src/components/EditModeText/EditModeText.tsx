import React from 'react';
import s from './EditModeText.module.scss';
import {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';

type EditModeTextType = {
   text: string
   updateText?: (value: string) => void
   changeValue: (value: string) => void
}

export const EditModeText: React.FC<EditModeTextType> = React.memo(({text, updateText, changeValue}) => {
   const [isTextMode, setIsTextMode] = useState<boolean>(true)

   const editText = (): void => {
      setIsTextMode(!isTextMode)
   }
   const changeText = (e: ChangeEvent<HTMLInputElement>): void => {
      changeValue(e.currentTarget.value);
   }

   console.log('EditModeText')

   return (
       <>
          {!isTextMode &&
             <TextField
                id="outlined-textarea"
                placeholder="value"
                value={text}
                autoFocus
                multiline
                variant="outlined"
                onBlur={editText}
                onBlurCapture={() => updateText && updateText(text)}
                onChange={changeText}
             />
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
})
