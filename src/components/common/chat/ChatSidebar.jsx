import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical } from 'lucide-react';
import { cn } from "@/lib/utils";

const ChatSidebar = ({ 
    contacts, 
    selectedContact, 
    onSelectContact, 
    searchQuery, 
    onSearchChange 
}) => {
    const sidebarRef = useRef(null);

    // Auto-scroll sidebar to top when the top contact changes 
    // (meaning a new message moved someone to the top)
    useEffect(() => {
        if (sidebarRef.current && contacts.length > 0) {
            sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [contacts?.[0]?.id, contacts?.[0]?.lastMessage]); // Specifically watch the top person and their message
    return (
        <div className={cn(
            "w-full md:w-80 lg:w-96 border-r border-gray-50 flex flex-col bg-gray-50/30",
            selectedContact && "max-md:hidden"
        )}>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-base font-semibold text-gray-900 tracking-tight">Messages</h1>
                    <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 cursor-pointer">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="Search contacts..." 
                        className="pl-10 h-11 bg-white border-transparent shadow-sm rounded-2xl focus-visible:ring-[#F97316]/20 focus-visible:border-[#F97316]"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div 
                ref={sidebarRef}
                className="flex-1 overflow-auto px-3 space-y-1 pb-4 custom-scrollbar"
            >
                {contacts.map((contact) => (
                    <div 
                        key={contact.id}
                        onClick={() => onSelectContact(contact)}
                        className={cn(
                            "group flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all duration-300",
                            selectedContact?.id === contact.id 
                                ? "bg-white shadow-md shadow-orange-500/5 ring-1 ring-orange-100" 
                                : "hover:bg-white hover:shadow-sm"
                        )}
                    >
                        <div className="relative shrink-0">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={cn(
                                "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
                                contact.status === 'online' ? "bg-green-500" : contact.status === 'away' ? "bg-amber-400" : "bg-gray-300"
                            )} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <h3 className={cn(
                                    "text-sm font-semibold truncate",
                                    contact.unreadCount > 0 ? "text-gray-900" : "text-gray-700"
                                )}>{contact.name}</h3>
                                <span className="text-[10px] font-semibold text-gray-400">{contact.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-400 truncate font-medium">{contact.lastMessage}</p>
                                {contact.unreadCount > 0 && (
                                    <div className="h-4.5 min-w-[18px] px-1 rounded-full bg-[#F97316] flex items-center justify-center text-[10px] font-semibold text-white shadow-sm">
                                        {contact.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;

