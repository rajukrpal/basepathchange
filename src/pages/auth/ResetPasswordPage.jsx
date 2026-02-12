import React from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from '@/form/FormProvider';
import PasswordField from '@/form/PasswordField';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { Lock, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const methods = useForm({
        defaultValues: { password: '', confirmPassword: '' },
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = (data) => {
        console.log('Reset Password Data:', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate('/login');
                resolve();
            }, 2000);
        });
    };

    return (
        <AuthLayout
            illustration="https://illustrations.popsy.co/orange/unlock.svg"
            title="Set Your <br /> <span className='text-orange-200'>New Key</span> <br /> Reset Done."
            subtitle="Choose a strong password that you haven't used before."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-xl xl:text-2xl font-black text-gray-900 tracking-tight">Reset Password</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Secure your account with a new password.
                </p>
            </div>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-3">
                    <PasswordField
                        name="password"
                        label="New Password"
                        placeholder="••••••••"
                        prefix={<Lock className="h-4 w-4 text-gray-400" />}
                    />
                    <PasswordField
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="••••••••"
                        prefix={<ShieldCheck className="h-4 w-4 text-gray-400" />}
                    />
                </div>

                <CustomButton
                    type="submit"
                    className="w-full !h-[44px] xl:!h-[48px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-all group"
                    loading={isSubmitting}
                >
                    <span>Update Password</span>
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </CustomButton>

                <p className="text-center text-[10px] xl:text-xs font-medium text-gray-400">
                    Difficulty resetting? <Link to="/login" className="inline-flex items-center text-[10px] xl:text-xs font-bold text-gray-400 hover:text-[#F97316] transition-colors">
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Back to Sign In
                    </Link>
                </p>
            </FormProvider>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
