import React, { useState, useEffect } from 'react';
import { 
    User, 
    Bell, 
    Shield, 
    Monitor, 
    Mail, 
    Key, 
    ChevronRight,
    Camera,
    Check,
    Smartphone,
    Globe,
    Moon,
    Sun,
    Layout,
    LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import BorderButton from '@/components/common/BorderButton';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        reports: false,
        security: true
    });

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { id: 'account', label: 'Account & Security', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        { id: 'appearance', label: 'Appearance', icon: Monitor, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
    ];

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 text-gray-900 dark:text-gray-100">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-[20px] font-semibold text-gray-900 dark:text-white tracking-tight">System Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">Manage your profile, account preferences, and application experience.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="rounded-lg font-semibold text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors h-9 text-xs cursor-pointer px-5">Cancel</Button>
                    <BorderButton>Save Changes</BorderButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Sidebar Navigation - Fixed & Aligned */}
                <div className="lg:col-span-3 flex flex-col gap-1 min-w-[240px]">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3.5 p-2.5 rounded-xl transition-all duration-200 font-medium text-[13px] cursor-pointer group relative",
                                    isActive 
                                        ? "bg-gray-50 dark:bg-gray-800/60 text-[#F97316]"
                                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-lg transition-all", 
                                    isActive 
                                        ? "bg-white dark:bg-gray-800 shadow-sm text-[#F97316] ring-1 ring-gray-100 dark:ring-gray-700" 
                                        : "bg-gray-100/50 dark:bg-gray-900 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:text-gray-500"
                                )}>
                                    <Icon className="h-3.5 w-3.5" />
                                </div>
                                <span>{tab.label}</span>
                                {isActive && (
                                    <div className="ml-auto flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    {/* Tab 1: Profile */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-800 overflow-hidden ring-1 ring-gray-100 dark:ring-gray-700/50">
                                <div className="h-28 bg-gradient-to-r from-[#F97316] to-[#FB923C] dark:from-[#EA580C] dark:to-[#F97316]" />
                                <CardContent className="relative pt-0 px-8 pb-8">
                                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
                                        <div className="relative group">
                                            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-lg rounded-3xl overflow-hidden">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback className="text-sm font-semibold bg-[#F97316] text-white">JD</AvatarFallback>
                                            </Avatar>
                                            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-[#F97316] transition-all cursor-pointer">
                                                <Camera className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex-1 pb-1">
                                            <h2 className="text-[15px] font-medium text-gray-900 dark:text-white">Johnathan Doe</h2>
                                            <p className="text-[11px] font-medium text-[#F97316] uppercase tracking-wider">Senior Product Designer</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                            <Input className="h-10 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-lg font-medium text-[13px] dark:text-white" defaultValue="Johnathan Doe" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input className="h-10 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-lg font-medium text-[13px] pl-10 dark:text-white" defaultValue="john@pms.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Location</label>
                                            <Input className="h-10 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-lg font-medium text-[13px] dark:text-white" defaultValue="San Francisco, CA" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Department</label>
                                            <Input className="h-10 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-lg font-medium text-[13px] dark:text-white" defaultValue="Design & Engineering" />
                                        </div>
                                    </div>

                                    <div className="mt-8 space-y-1.5">
                                        <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Bio Description</label>
                                        <textarea 
                                            className="w-full min-h-[100px] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500/10 focus:outline-none resize-none transition-all"
                                            placeholder="Tell us about yourself..."
                                            defaultValue="I am a passionate designer focused on creating beautiful and functional interfaces. Currently lead designer at the PMS System."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Tab 2: Account */}
                    {activeTab === 'account' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8 ring-1 ring-gray-100 dark:ring-gray-700/50">
                                <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 mb-6">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 mb-8">
                                    <h3 className="text-[15px] font-medium text-gray-900 dark:text-white tracking-tight">Security & Password</h3>
                                    <p className="text-[13px] font-medium text-gray-400">Manage your credentials and login methods.</p>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 flex gap-4">
                                        <div className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                                            <Smartphone className="h-4 w-4 text-[#F97316]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-200">Enable Two-Factor Authentication</p>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Recommended to protect your professional data and projects.</p>
                                            <button className="text-[10px] font-semibold text-[#F97316] uppercase tracking-wider mt-2.5 hover:underline cursor-pointer">SETUP NOW →</button>
                                        </div>
                                    </div>

                                    <div className="space-y-5 pt-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                                            <div className="relative">
                                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                                <Input type="password" placeholder="••••••••" className="h-10 bg-gray-50 dark:bg-gray-900 border-hidden rounded-lg font-medium pl-10 text-[13px] dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                                                <Input type="password" placeholder="Min 8 chars" className="h-10 bg-gray-50 dark:bg-gray-900 border-none rounded-lg font-medium text-[13px] dark:text-white" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                                                <Input type="password" placeholder="Repeat new password" className="h-10 bg-gray-50 dark:bg-gray-900 border-none rounded-lg font-medium text-[13px] dark:text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button variant="outline" className="w-full md:w-auto border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold rounded-lg px-8 h-9 text-xs transition-colors cursor-pointer">Manage Connected Devices</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Tab 3: Appearance */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8 ring-1 ring-gray-100 dark:ring-gray-700/50">
                                <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#F97316] mb-6">
                                    <Monitor className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 mb-8">
                                    <h3 className="text-[15px] font-medium text-gray-900 dark:text-white tracking-tight">Appearance & Theme</h3>
                                    <p className="text-[13px] font-medium text-gray-400">Personalize your application experience.</p>
                                </div>
                                
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Visual Theme</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => handleThemeChange('light')}
                                                className={cn(
                                                    "group relative flex flex-col gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                                                    theme === 'light' 
                                                        ? "border-[#F97316] bg-orange-50/20 shadow-sm" 
                                                        : "border-gray-50 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 hover:border-gray-100 dark:hover:border-gray-700"
                                                )}
                                            >
                                                <div className="w-full aspect-[4/3] bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col">
                                                    <div className="h-5 w-full bg-gray-50 border-b border-gray-50 px-2 flex items-center gap-1">
                                                        <div className="h-1 w-1 rounded-full bg-red-400/40" />
                                                        <div className="h-1 w-1 rounded-full bg-amber-400/40" />
                                                        <div className="h-1 w-1 rounded-full bg-green-400/40" />
                                                    </div>
                                                    <div className="flex-1 p-2.5 space-y-2">
                                                        <div className="h-2 w-1/3 bg-gray-100 rounded-full" />
                                                        <div className="h-10 w-full bg-gray-50 rounded-lg" />
                                                        <div className="h-1.5 w-full bg-gray-100/50 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between font-medium text-[13px] text-gray-900 dark:text-white">
                                                    <span className="flex items-center gap-2">
                                                        <Sun className={cn("h-4 w-4", theme === 'light' ? "text-[#F97316]" : "text-gray-400")} />
                                                        Light Mode
                                                    </span>
                                                    {theme === 'light' && <div className="h-5 w-5 rounded-full bg-[#F97316] flex items-center justify-center text-white shadow-sm zoom-in animate-in"><Check className="h-3 w-3" /></div>}
                                                </div>
                                            </button>

                                            <button 
                                                onClick={() => handleThemeChange('dark')}
                                                className={cn(
                                                    "group relative flex flex-col gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                                                    theme === 'dark' 
                                                        ? "border-[#F97316] bg-[#F97316]/5 shadow-sm" 
                                                        : "border-gray-50 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 hover:border-gray-100 dark:hover:border-gray-700"
                                                )}
                                            >
                                                <div className="w-full aspect-[4/3] bg-[#0F172A] border border-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col">
                                                    <div className="h-5 w-full bg-[#1E293B] border-b border-gray-800 px-2 flex items-center gap-1">
                                                        <div className="h-1 w-1 rounded-full bg-red-400/30" />
                                                        <div className="h-1 w-1 rounded-full bg-amber-400/30" />
                                                        <div className="h-1 w-1 rounded-full bg-green-400/30" />
                                                    </div>
                                                    <div className="flex-1 p-2.5 space-y-2">
                                                        <div className="h-2 w-1/3 bg-[#1E293B] rounded-full" />
                                                        <div className="h-10 w-full bg-[#1E293B]/50 rounded-lg" />
                                                        <div className="h-1.5 w-full bg-[#1E293B]/30 rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between font-medium text-[13px] text-gray-900 dark:text-white">
                                                    <span className="flex items-center gap-2">
                                                        <Moon className={cn("h-4 w-4", theme === 'dark' ? "text-[#F97316]" : "text-gray-500")} />
                                                        Dark Mode
                                                    </span>
                                                    {theme === 'dark' && <div className="h-5 w-5 rounded-full bg-[#F97316] flex items-center justify-center text-white shadow-sm zoom-in animate-in"><Check className="h-3 w-3" /></div>}
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">General Settings</h3>
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 ml-1">Language</label>
                                                    <div className="relative group cursor-pointer">
                                                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-hover:text-[#F97316] transition-colors" />
                                                        <select className="w-full h-10 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg pl-10 pr-4 font-medium text-[13px] text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-orange-500/10 transition-all outline-none cursor-pointer">
                                                            <option>English (United States)</option>
                                                            <option>Hindi (India)</option>
                                                            <option>Spanish (ES)</option>
                                                            <option>French (FR)</option>
                                                        </select>
                                                        <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 ml-1">Timezone</label>
                                                    <select className="w-full h-10 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg px-4 font-medium text-[13px] text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-orange-500/10 transition-all outline-none cursor-pointer">
                                                        <option>(GMT+05:30) IST - India</option>
                                                        <option>(GMT-08:00) PST - US & Canada</option>
                                                        <option>(GMT+00:00) UTC - London</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Accessibility</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                                    <div className="space-y-0.5">
                                                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">Reduce Motion</p>
                                                        <p className="text-[10px] text-gray-400">Smoother experience on slower devices.</p>
                                                    </div>
                                                    <div className="h-5 w-9 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer active:scale-95 transition-all">
                                                        <div className="absolute left-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow-sm" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                                    <div className="space-y-0.5">
                                                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">High Contrast</p>
                                                        <p className="text-[10px] text-gray-400">Sharper text and element borders.</p>
                                                    </div>
                                                    <div className="h-5 w-9 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer active:scale-95 transition-all">
                                                        <div className="absolute left-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Tab 4: Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8 ring-1 ring-gray-100 dark:ring-gray-700/50">
                                <div className="h-10 w-10 rounded-lg bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 mb-6">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 mb-8">
                                    <h3 className="text-[15px] font-medium text-gray-900 dark:text-white tracking-tight">Notification Channels</h3>
                                    <p className="text-[13px] font-medium text-gray-400">Stay updated without the noise.</p>
                                </div>
                                
                                <div className="space-y-8">
                                    {[
                                        { key: 'push', label: 'Push Notifications', desc: 'Real-time alerts for messages and updates.', icon: Smartphone },
                                        { key: 'email', label: 'Email Notifications', desc: 'Summary of daily tasks and team mentions.', icon: Mail },
                                        { key: 'reports', label: 'System Reports', desc: 'Weekly analytics and performance statistics.', icon: LayoutDashboard },
                                        { key: 'security', label: 'Security Alerts', desc: 'Critical alerts about account access.', icon: Shield, locked: true }
                                    ].map((item) => (
                                        <div key={item.key} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 group transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#F97316] transition-colors shadow-sm">
                                                    <item.icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{item.label}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div 
                                                onClick={() => !item.locked && toggleNotification(item.key)}
                                                className={cn(
                                                    "h-5 w-9 rounded-full relative cursor-pointer px-0.5 flex items-center transition-all duration-300",
                                                    (notifications[item.key] || item.locked) ? "bg-[#F97316]" : "bg-gray-200 dark:bg-gray-700",
                                                    item.locked && "opacity-60 cursor-not-allowed"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-4 w-4 bg-white rounded-full shadow-sm transition-all duration-300",
                                                    (notifications[item.key] || item.locked) ? "translate-x-4" : "translate-x-0"
                                                )} />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="mt-6 p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100/50 dark:border-blue-500/10">
                                        <div className="flex items-center gap-3 text-blue-700 dark:text-blue-400 mb-2">
                                            <Smartphone className="h-4 w-4" />
                                            <span className="text-[13px] font-medium">Mobile App Connectivity</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 dark:text-blue-500/80 font-medium leading-relaxed">
                                            Sync your professional settings with our mobile app available on iOS and Android for consistent experience across devices.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;

