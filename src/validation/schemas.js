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

// Project creation validation schema
export const projectSchema = yup.object().shape({
  projectName: yup.string().required('Project name is required'),
  clientName: yup.string().required('Client name is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
  deadline: yup.string().required('Deadline is required'),
});

// Inventory item validation schema
export const inventorySchema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    sku: yup.string().required('SKU is required'),
    category: yup.string().required('Category is required'),
    price: yup.number()
        .typeError('Price must be a number')
        .positive('Price must be positive')
        .required('Price is required'),
    stock: yup.number()
        .typeError('Stock must be a number')
        .integer('Stock must be an integer')
        .min(0, 'Stock cannot be negative')
        .required('Stock is required'),
    status: yup.string().required('Status is required'),
});

// Task validation schema
export const taskSchema = yup.object().shape({
    taskName: yup.string().required('Task name is required'),
    description: yup.string().required('Description is required'),
    project: yup.string().required('Project selection is required'),
    priority: yup.string().required('Priority is required'),
    members: yup.array().min(1, 'Select at least one team member').required('Members are required'),
    dueDate: yup.string().required('Due date is required'),
    reminderTime: yup.string().required('Reminder time is required'),
    taskType: yup.string().required('Task type is required'),
});


