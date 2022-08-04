import React from 'react';
import s from './Login.module.scss';
import {Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {useFormik} from 'formik';
import {validate} from "./validate";
import {useAppDispatch} from "../../bll/redux-store";
import {login} from "../../bll/auth/auth-thunk";

type loginType = {}

export const Login: React.FC<loginType> = React.memo(props => {
       const {} = props;
       const dispatch = useAppDispatch()

       const formik = useFormik({
          initialValues: {
             email: '',
             password: '',
             rememberMe: false
          },

          validate,

          onSubmit: values => {
             console.log(values)
             dispatch(login(values))
          },
       });

       return (
           <section className={s.login}>
              <form className={s.form} onSubmit={formik.handleSubmit}>
                 <h2 className={s.title}>login</h2>

                 <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input
                        id="email"
                        type='text'
                        aria-describedby="email"
                        {...formik.getFieldProps('email')}
                    />
                    <FormHelperText id="email">We'll never share your email.</FormHelperText>
                    {formik.touched.email && formik.errors.email ? <Error>{formik.errors.email}</Error> : null}
                 </FormControl>

                 <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type='password'
                        aria-describedby="password"
                        {...formik.getFieldProps('password')}
                    />
                    <FormHelperText id="password">We'll never share your password.</FormHelperText>
                    {formik.touched.password && formik.errors.password ? <Error>{formik.errors.password}</Error> : null}
                 </FormControl>

                 <FormControlLabel
                     control={
                        <Checkbox
                            checked={formik.values.rememberMe}
                            color="primary"
                            {...formik.getFieldProps('rememberMe')}
                        />
                     }
                     label="Primary"
                 />

                 <Button className={s.button} type='submit' variant="contained" color="primary">
                    login
                 </Button>
              </form>
           </section>
       );
    }
)


type errorType = {
   children: string
}

export const Error: React.FC<errorType> = React.memo(props => {
   const {children} = props;

   return (
       <small className={s.error}>{children}</small>
   )
})
