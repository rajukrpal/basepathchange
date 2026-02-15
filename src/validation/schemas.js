import * as yup from 'yup';

// Login form validation schema
export const loginSchema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
  password: yup.string().required('Please enter password'),
});

// OTP verification validation schema
export const otpSchema = yup.object().shape({
  otp: yup.string().length(6, 'Please enter a valid 6-digit code').required('OTP is required'),
});

// Forgot password validation schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
});

// Reset password validation schema
export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Please enter password').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

// Signup validation schema
export const signupSchema = yup.object().shape({
  fullName: yup.string().required('Please enter full name'),
  email: yup.string().required('Please enter email').email('Please enter valid email'),
  password: yup.string().required('Please enter password').min(6, 'Password must be at least 6 characters'),
});
