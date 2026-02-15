import React from 'react';

const AuthLayout = ({ children, illustration, title, subtitle, badgeText = "Version 2.0" }) => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-[#f8fafc] p-4 font-Inter">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-[24px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
                {/* Left Side - Visual Content (Hidden on Mobile/Tablet) */}
                <div className="hidden w-1/2 bg-[#F97316] p-8 xl:p-10 lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute top-[-10%] right-[-10%] h-[250px] w-[250px] rounded-full bg-white/5 blur-3xl"></div>
                    <div className="absolute bottom-[-5%] left-[-5%] h-[180px] w-[180px] rounded-full bg-black/5 blur-2xl"></div>
                    
                    <div className="relative z-10 space-y-3">
                        <div className="inline-flex items-center space-x-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-md border border-white/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">{badgeText}</span>
                        </div>
                        <h2 className="text-sm xl:text-base font-semibold text-white leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
                        <p className="text-xs xl:text-sm text-orange-50/90 max-w-[280px] leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-1 items-center justify-center py-4">
                        <img 
                            src={illustration} 
                            alt="Visual" 
                            onError={(e) => {
                                e.target.src = 'https://illustrations.popsy.co/orange/graphic-design.svg';
                                e.target.onerror = null;
                            }}
                            className="w-full max-w-[180px] xl:max-w-[240px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]" 
                        />
                    </div>

                    <div className="relative z-10 flex items-center space-x-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-7 w-7 rounded-full border-2 border-[#F97316] bg-gray-100 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="user" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">10k+ Users</p>
                    </div>
                </div>

                {/* Right Side - Form Content */}
                <div className="w-full p-6 sm:p-8 lg:p-10 xl:p-12 lg:w-1/2 flex flex-col justify-center bg-white overflow-y-auto no-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

