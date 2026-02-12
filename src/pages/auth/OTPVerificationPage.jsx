import React, { useState } from 'react';
import CustomButton from '@/components/common/CustomButton';
import AuthLayout from '@/components/common/AuthLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OTPVerificationPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Verifying OTP:', otp.join(''));
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/reset-password');
        }, 2000);
    };

    return (
        <AuthLayout
            illustration="https://illustrations.popsy.co/orange/secure-data.svg"
            title="Secure Your <br /> <span className='text-orange-200'>Account</span> <br /> Verification."
            subtitle="We have sent a 6-digit verification code to your email address."
        >
            <div className="mb-6 xl:mb-8 text-center lg:text-left">
                <h1 className="text-xl xl:text-2xl font-black text-gray-900 tracking-tight">OTP Verification</h1>
                <p className="mt-1 text-xs xl:text-sm text-gray-500 font-medium">
                    Enter the code sent to your email.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between gap-2 max-w-[320px] mx-auto lg:mx-0">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-10 h-12 xl:w-12 xl:h-14 border-2 border-gray-100 rounded-xl bg-gray-50 text-center text-lg font-black focus:border-[#F97316] focus:bg-white outline-none transition-all"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    <CustomButton
                        type="submit"
                        className="w-full !h-[44px] xl:!h-[48px] rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs xl:text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-all group"
                        loading={isSubmitting}
                    >
                        <span>Verify Account</span>
                        {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
                    </CustomButton>

                    <div className="text-center space-y-4">
                        <p className="text-[10px] xl:text-xs font-medium text-gray-400">
                            Didn't receive the code? <button type="button" className="text-[#F97316] font-bold hover:underline">Resend OTP</button>
                        </p>
                        <Link to="/login" className="inline-flex items-center text-[10px] xl:text-xs font-bold text-gray-400 hover:text-[#F97316] transition-colors">
                            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default OTPVerificationPage;
