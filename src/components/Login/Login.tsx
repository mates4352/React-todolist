import React from 'react';
import s from './Login.module.scss';
import {Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel} from "@material-ui/core";

type loginType = {}

export const Login: React.FC<loginType> = props => {
   const {} = props;

   return (
       <section className={s.login}>
          <form className={s.form}>
             <h2 className={s.title}>login</h2>

             <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" type='text' aria-describedby="email" />
                <FormHelperText id="email">We'll never share your email.</FormHelperText>
             </FormControl>

             <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type='password' aria-describedby="password" />
                <FormHelperText id="password">We'll never share your password.</FormHelperText>
             </FormControl>

             <FormControlLabel
                 className={s.formControl}
                 control={
                    <Checkbox
                        checked={true}
                        onChange={() => {}}
                        name="checked"
                        color="primary"
                    />
                 }
                 label="Primary"
             />

             <Button className={s.button} variant="contained" color="primary">
                login
             </Button>
          </form>
       </section>
   );
};
