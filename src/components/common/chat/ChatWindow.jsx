import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Phone, 
    Video, 
    MoreVertical, 
    ChevronLeft, 
    Smile, 
    Paperclip, 
    Send 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const ChatWindow = ({ 
    selectedContact, 
    messages, 
    onBack, 
    onSendMessage, 
    newMessage, 
    onNewMessageChange 
}) => {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom whenever messages change OR when selectedContact changes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // We delay slightly to ensure DOM has rendered
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);
        return () => clearTimeout(timer);
    }, [messages, selectedContact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage();
    };

    if (!selectedContact) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/30">
                <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-[32px] bg-orange-50 flex items-center justify-center text-[#F97316] mx-auto animate-bounce">
                        <Smile className="h-10 w-10" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Select a conversation</h2>
                        <p className="text-sm font-medium text-gray-400">Choose an employee to start chatting</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Chat Header */}
            <div className="h-20 shrink-0 border-b border-gray-50 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden text-gray-400 cursor-pointer"
                        onClick={onBack}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div className="relative">
                        <Avatar className="h-11 w-11 border-2 border-gray-50">
                            <AvatarImage src={selectedContact.avatar} />
                            <AvatarFallback>{selectedContact.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                            selectedContact.status === 'online' ? "bg-green-500" : selectedContact.status === 'away' ? "bg-amber-400" : "bg-gray-300"
                        )} />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">{selectedContact.name}</h2>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mt-0.5">
                            {selectedContact.status === 'online' ? 'Active now' : selectedContact.status === 'away' ? 'Away' : 'Offline'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-gray-900 cursor-pointer">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-gray-900 cursor-pointer">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-2" />
                    <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-gray-900 cursor-pointer">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col custom-scrollbar bg-gray-50/20 backdrop-blur-sm">
                <div className="flex flex-col gap-6">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id}
                            className={cn(
                                "flex flex-col max-w-[75%]",
                                msg.sender === 'me' ? "self-end items-end" : "self-start items-start"
                            )}
                        >
                            <div className={cn(
                                "px-5 py-3 rounded-[24px] text-[13px] font-medium shadow-sm",
                                msg.sender === 'me' 
                                    ? "bg-[#F97316] text-white rounded-br-none shadow-orange-500/10" 
                                    : "bg-white text-gray-700 rounded-bl-none border border-gray-100/50"
                            )}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] font-medium text-gray-400 mt-1.5 mx-2 uppercase tracking-tighter">
                                {msg.timestamp}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="p-6 shrink-0 border-t border-gray-50 bg-white">
                <form 
                    onSubmit={handleSubmit}
                    className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-[24px] border border-gray-100 focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/5 transition-all"
                >
                    <Button type="button" variant="ghost" size="icon" className="rounded-full text-gray-400 shrink-0 cursor-pointer">
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="rounded-full text-gray-400 shrink-0 cursor-pointer">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input 
                        className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 px-2 h-10"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => onNewMessageChange(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        className="h-10 w-10 p-0 rounded-full bg-[#F97316] hover:bg-[#EA580C] shadow-lg shadow-orange-500/20 transition-all active:scale-95 shrink-0 cursor-pointer"
                        disabled={!newMessage?.trim()}
                    >
                        <Send className="h-5 w-5 text-white" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;

