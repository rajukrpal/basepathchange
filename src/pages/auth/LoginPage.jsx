import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import PasswordField from '@/form/PasswordField';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { LOGIN_IMAGE } from '@/lib/images';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = (data) => {
        console.log('Login data:', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate('/');
                resolve();
            }, 2000);
        });
    };

    return (
        <AuthLayout
            illustration={LOGIN_IMAGE}
            title="Scale Your <br /> <span class='text-orange-200'>Base Paths</span> <br /> Effortlessly."
            subtitle="Unified platform for automated deployment and path validation."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-xl xl:text-2xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Please sign in to access your dashboard.
                </p>
            </div>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                    <TextField
                        name="email"
                        label="Email"
                        placeholder="name@company.com"
                        prefix={<Mail className="h-4 w-4 text-gray-400" />}
                    />

                    <PasswordField
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        prefix={<Lock className="h-4 w-4 text-gray-400" />}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="peer sr-only"
                            />
                            <div className="h-4 w-4 rounded-md border-2 border-gray-200 bg-white transition-all peer-checked:border-[#F97316] peer-checked:bg-[#F97316]"></div>
                            <svg className="absolute left-[3px] top-[3px] h-2.5 w-2.5 text-white transition-opacity opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="ml-2 text-[10px] xl:text-xs font-bold text-gray-400 group-hover:text-gray-900">Keep me signed in</span>
                    </label>
                    
                    <Link to="/forgot-password" size="sm" className="text-[10px] xl:text-xs font-bold text-[#F97316] hover:underline underline-offset-4">
                        Forgot password?
                    </Link>
                </div>

                <CustomButton
                    type="submit"
                    className="w-full !h-[44px] xl:!h-[48px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-bold text-white shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all group"
                    loading={isSubmitting}
                >
                    <span>Sign In</span>
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </CustomButton>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">
                        <span className="bg-white px-3">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center h-10 rounded-lg border border-gray-100 bg-gray-50/50 text-[10px] xl:text-xs font-bold text-gray-600 hover:bg-white transition-all">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="G" className="mr-2 h-3.5 w-3.5" />
                        Google
                    </button>
                    <button type="button" className="flex items-center justify-center h-10 rounded-lg border border-gray-100 bg-gray-50/50 text-[10px] xl:text-xs font-bold text-gray-600 hover:bg-white transition-all">
                        <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="L" className="mr-2 h-3.5 w-3.5" />
                        LinkedIn
                    </button>
                </div>

                <p className="mt-4 text-center text-[10px] xl:text-xs font-medium text-gray-400">
                    New here? <Link to="/signup" className="text-[#F97316] font-bold">Create an account</Link>
                </p>
            </FormProvider>
        </AuthLayout>
    );
};

export default LoginPage;
