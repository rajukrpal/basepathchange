import * as yup from 'yup';
// Login form validation schema
const LoginSchema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
  password: yup.string().required('Please enter password'),
});