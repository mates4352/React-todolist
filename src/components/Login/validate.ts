type ErrorsType = {
   email?: string
   password?: string
}

export const validate = (values: {email: string, password: string}) => {
   const errors: ErrorsType = {};

   if (!values.email) {
      errors.email = 'Email text is required';
   } else if (values.email.length > 25) {
      errors.email = 'Must be 15 characters or less';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
   }

   if (!values.password) {
      errors.password = 'Password text is required';
   } else if (values.password.length > 20) {
      errors.password = 'Must be 20 characters or less';
   }

   return errors;
};
