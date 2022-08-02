import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useAppDispatch, useAppSelector} from "../../bll/redux-store";
import {appReducerType} from "../../bll/app-reducers/app-reduer";
import {clearError} from "../../bll/app-reducers/app-create-actions/app-create-actions";

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type errorSnackbar = {
   severity?: 'error' | 'warning' | 'info' | 'success'
}

export const ErrorSnackbar: React.FC<errorSnackbar> = props => {
   const {severity} = props;

   const {error} = useAppSelector<appReducerType>(state => state.app)

   const dispatch = useAppDispatch();

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      dispatch(clearError())
   };

   const isOpen = error !== null;

   return (
       <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={'error'}>
             {error}
          </Alert>
       </Snackbar>
   );
}
