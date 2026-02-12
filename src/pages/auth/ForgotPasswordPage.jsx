import React from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const methods = useForm({
        defaultValues: { email: '' },
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = (data) => {
        console.log('Forgot Password Email:', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate('/otp-verification');
                resolve();
            }, 2000);
        });
    };

    return (
        <AuthLayout
            illustration="https://illustrations.popsy.co/orange/problem-solving.svg"
            title="Lost Your <br /> <span className='text-orange-200'>Access?</span> <br /> No Worries."
            subtitle="Enter your registered email and we'll send you a link to reset your password."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-xl xl:text-2xl font-black text-gray-900 tracking-tight">Forgot Password</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Reset your password in easy steps.
                </p>
            </div>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <TextField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    prefix={<Mail className="h-4 w-4 text-gray-400" />}
                />

                <CustomButton
                    type="submit"
                    className="w-full !h-[44px] xl:!h-[48px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-all group"
                    loading={isSubmitting}
                >
                    <span>Send Reset Link</span>
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </CustomButton>

                <div className="text-center">
                    <Link to="/login" className="inline-flex items-center text-[10px] xl:text-xs font-bold text-gray-400 hover:text-[#F97316] transition-colors">
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Back to Sign In
                    </Link>
                </div>
            </FormProvider>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
