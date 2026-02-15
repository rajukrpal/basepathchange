import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import OTPField from '@/form/OTPField';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const methods = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = (data) => {
        console.log('Verifying OTP:', data.otp);
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate('/reset-password', { 
                    state: { 
                        email: state?.email, 
                        verified: true 
                    } 
                });
                resolve();
            }, 1000);
        });
    };

    return (
        <AuthLayout
            illustration="https://illustrations.popsy.co/orange/secure-data.svg"
            title="Secure Your <br /> <span className='text-orange-200'>Account</span> <br /> Verification."
            subtitle="We have sent a 6-digit verification code to your email address."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-lg xl:text-xl font-semibold text-gray-900 tracking-tight">OTP Verification</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Enter the code sent to your email.
                </p>
            </div>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <OTPField
                    name="otp"
                    maxLength={6}
                />

                <div className="space-y-4">
                    <CustomButton
                        type="submit"
                        className="w-full !h-[44px] md:!h-[52px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-semibold text-white shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all group"
                        loading={isSubmitting}
                    >
                        <span>Verify Account</span>
                        {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
                    </CustomButton>

                    <div className="text-center space-y-4">
                        <p className="text-[10px] xl:text-xs font-medium text-gray-400">
                            Didn't receive the code? <button type="button" className="text-[#F97316] font-semibold hover:underline">Resend OTP</button>
                        </p>
                        <Link to="/login" className="inline-flex items-center text-[10px] xl:text-xs font-semibold text-gray-400 hover:text-[#F97316] transition-colors">
                            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </FormProvider>
        </AuthLayout>
    );
};

export default VerifyOTP;

