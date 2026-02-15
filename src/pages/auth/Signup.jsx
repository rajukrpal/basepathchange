import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import PasswordField from '@/form/PasswordField';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: { fullName: '', email: '', password: '' },
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = (data) => {
        console.log('Signup Data:', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate('/otp-verification');
                resolve();
            }, 2000);
        });
    };

    return (
        <AuthLayout
            illustration="https://illustrations.popsy.co/orange/startup.svg"
            title="Start Your <br /> <span className='text-orange-200'>Journey</span> <br /> With Us."
            subtitle="Join thousands of developers managing their project paths efficiently."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-lg xl:text-xl font-semibold text-gray-900 tracking-tight">Create Account</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Get started with your free account today.
                </p>
            </div>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                    <TextField
                        name="fullName"
                        label="Full Name"
                        placeholder="Johnny Depp"
                        prefix={<User className="h-5 w-5" />}
                    />
                    <TextField
                        name="email"
                        label="Email Address"
                        placeholder="name@company.com"
                        prefix={<Mail className="h-5 w-5" />}
                    />
                    <PasswordField
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        prefix={<Lock className="h-5 w-5" />}
                    />
                </div>

                <div className="flex items-start py-1">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative mt-1">
                            <input type="checkbox" className="peer sr-only" required />
                            <div className="h-4 w-4 rounded-md border-2 border-gray-200 bg-white transition-all peer-checked:border-[#F97316] peer-checked:bg-[#F97316]"></div>
                            <svg className="absolute left-[3px] top-[3px] h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="ml-2 text-[10px] xl:text-xs font-semibold text-gray-400">
                            I agree to the <Link to="/terms" className="text-[#F97316]">Terms</Link> and <Link to="/privacy" className="text-[#F97316]">Privacy Policy</Link>
                        </span>
                    </label>
                </div>

                <CustomButton
                    type="submit"
                    className="w-full !h-[44px] md:!h-[52px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-semibold text-white shadow-lg active:scale-[0.98] transition-all group"
                    loading={isSubmitting}
                >
                    <span>Create Free Account</span>
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </CustomButton>

                <p className="mt-4 text-center text-[10px] xl:text-xs font-medium text-gray-400">
                    Already have an account? <Link to="/login" className="text-[#F97316] font-semibold">Sign In</Link>
                </p>
            </FormProvider>
        </AuthLayout>
    );
};

export default Signup;

