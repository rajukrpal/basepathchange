import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Clock, 
    Play, 
    Square, 
    Coffee, 
    Timer, 
    ArrowRight, 
    CheckCircle2,
    StickyNote
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TimeTracker = () => {
    const [status, setStatus] = useState('idle'); // idle, clocked_in, on_break
    const [workTime, setWorkTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [clockInTime, setClockInTime] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notes, setNotes] = useState('');
    
    // Using refs for accurate timing
    const startTimeRef = useRef(null);
    const breakStartRef = useRef(null);
    const timerIntervalRef = useRef(null);

    // Persistence on load
    useEffect(() => {
        const savedState = localStorage.getItem('timeTracker_state');
        if (savedState) {
            const data = JSON.parse(savedState);
            setStatus(data.status);
            setWorkTime(data.workTime);
            setBreakTime(data.breakTime);
            setClockInTime(data.clockInTime);
            startTimeRef.current = data.startTime;
            breakStartRef.current = data.breakStart;
            
            if (data.status === 'clocked_in' || data.status === 'on_break') {
                startTimer();
            }
        }
        return () => clearInterval(timerIntervalRef.current);
    }, []);

    // Save state whenever it changes
    useEffect(() => {
        const data = {
            status,
            workTime,
            breakTime,
            clockInTime,
            startTime: startTimeRef.current,
            breakStart: breakStartRef.current,
        };
        localStorage.setItem('timeTracker_state', JSON.stringify(data));
    }, [status, workTime, breakTime, clockInTime]);

    const startTimer = () => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
            const now = Date.now();
            if (status === 'clocked_in') {
                // If we just clocked in, we calculate based on the current workTime + elapsed
                // but for simplicity in this demo, we increment
                setWorkTime(prev => prev + 1);
            } else if (status === 'on_break') {
                setBreakTime(prev => prev + 1);
            }
        }, 1000);
    };

    // Re-start interval when status changes
    useEffect(() => {
        if (status !== 'idle') {
            startTimer();
        } else {
            clearInterval(timerIntervalRef.current);
        }
    }, [status]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClockIn = () => {
        setStatus('clocked_in');
        setClockInTime(new Date().toLocaleTimeString());
        startTimeRef.current = Date.now();
    };

    const handleBreakToggle = () => {
        if (status === 'clocked_in') {
            setStatus('on_break');
            breakStartRef.current = Date.now();
        } else {
            setStatus('clocked_in');
        }
    };

    const handleClockOutClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmClockOut = () => {
        const log = {
            date: new Date().toLocaleDateString(),
            clockIn: clockInTime,
            clockOut: new Date().toLocaleTimeString(),
            workDuration: formatTime(workTime),
            breakDuration: formatTime(breakTime),
            notes: notes,
            id: Date.now()
        };

        // Save to logs
        const existingLogs = JSON.parse(localStorage.getItem('timeTracker_logs') || '[]');
        localStorage.setItem('timeTracker_logs', JSON.stringify([log, ...existingLogs]));

        // Reset
        setStatus('idle');
        setWorkTime(0);
        setBreakTime(0);
        setClockInTime(null);
        setNotes('');
        setIsDialogOpen(false);
        localStorage.removeItem('timeTracker_state');
    };

    return (
        <>
            <Card className="border-none shadow-sm bg-white dark:bg-gray-800 rounded-xl overflow-hidden ring-1 ring-gray-100 dark:ring-gray-700/50 group">
                <CardHeader className="bg-gray-50/50 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${status === 'idle' ? 'bg-gray-100 text-gray-500' : status === 'on_break' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600 animate-pulse'}`}>
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-[13px] font-semibold text-gray-900 dark:text-white">Work Timer</CardTitle>
                                <CardDescription className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                                    {status === 'idle' ? 'Ready to pulse' : status === 'on_break' ? 'Currently on break' : 'Tracking progress'}
                                </CardDescription>
                            </div>
                        </div>
                        {status !== 'idle' && (
                            <div className="text-right">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">Clocked in at</p>
                                <p className="text-sm font-semibold text-gray-900">{clockInTime}</p>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50/80 dark:bg-gray-900/40 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-800">
                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                                <Timer className="h-3 w-3" /> Total Work
                            </p>
                            <p className={`text-[13px] font-semibold tabular-nums tracking-tight ${status === 'clocked_in' ? 'text-[#F97316]' : 'text-gray-900 dark:text-gray-100'}`}>
                                {formatTime(workTime)}
                            </p>
                        </div>
                        <div className="bg-gray-50/80 dark:bg-gray-900/40 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-800">
                            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                                <Coffee className="h-3 w-3" /> Break Time
                            </p>
                            <p className={`text-[13px] font-semibold tabular-nums tracking-tight ${status === 'on_break' ? 'text-orange-600' : 'text-gray-900 dark:text-gray-100'}`}>
                                {formatTime(breakTime)}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {status === 'idle' ? (
                            <Button 
                                onClick={handleClockIn}
                                className="w-full h-10 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-[11px] shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <Play className="mr-2 h-3.5 w-3.5 fill-current" />
                                <span>CLOCK IN NOW</span>
                            </Button>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button 
                                        onClick={handleBreakToggle}
                                        variant="outline"
                                        className={`h-10 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
                                            status === 'on_break' 
                                            ? 'bg-orange-600 border-orange-600 text-white hover:bg-orange-700' 
                                            : 'border-orange-100 dark:border-orange-500/20 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10'
                                        }`}
                                    >
                                        <Coffee className="mr-2 h-3.5 w-3.5" />
                                        {status === 'on_break' ? 'END BREAK' : 'TAKE A BREAK'}
                                    </Button>
                                    <Button 
                                        onClick={handleClockOutClick}
                                        className="h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-[11px] shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <Square className="mr-2 h-3.5 w-3.5 fill-current" />
                                        CLOCK OUT
                                    </Button>
                                </div>
                            </>
                        )}
                        <p className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-2">
                            {status === 'clocked_in' ? 'Stay focused on your tasks' : status === 'on_break' ? 'Enjoy your break, రాజు!' : 'Press the button to start tracking your day'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Clock Out Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl border-none shadow-2xl bg-white dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-[17px] font-semibold text-gray-900 dark:text-white">Finish Your Shift</DialogTitle>
                        <DialogDescription className="text-[13px] font-medium text-gray-500">
                            Great work today! Please add any notes regarding your work before clocking out.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-widest text-gray-400">Work Summary / Notes</Label>
                             <Textarea 
                                id="notes" 
                                placeholder="What did you accomplish today?" 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[120px] rounded-xl border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus:border-[#F97316] transition-all resize-none font-medium text-[13px]"
                            />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2 border border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-gray-400">Total Work</span>
                                <span className="font-semibold text-gray-900">{formatTime(workTime)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-gray-400">Break Taken</span>
                                <span className="font-semibold text-orange-600">{formatTime(breakTime)}</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsDialogOpen(false)} 
                            className="rounded-lg font-semibold text-gray-400 hover:text-gray-600 h-10 px-6 cursor-pointer"
                        >
                            Back
                        </Button>
                        <Button 
                            onClick={handleConfirmClockOut}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold px-8 h-10 shadow-sm transition-all cursor-pointer"
                        >
                            CONFIRM CLOCK OUT
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TimeTracker;

