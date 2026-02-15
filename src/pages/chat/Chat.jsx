import React, { useState, useEffect } from 'react';
import { generateChatContacts, generateMessages } from '@/data/fakerData';
import ChatSidebar from '@/components/common/chat/ChatSidebar';
import ChatWindow from '@/components/common/chat/ChatWindow';

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [chatHistory, setChatHistory] = useState({}); // Stores messages per contact ID
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fakeContacts = generateChatContacts(15);
        setContacts(fakeContacts);
        
        // Initial setup for the first contact
        if (fakeContacts.length > 0) {
            const firstContact = fakeContacts[0];
            setSelectedContact(firstContact);
            setChatHistory({
                [firstContact.id]: generateMessages(15)
            });
        }
    }, []);

    // Load messages dynamically when contact changes if not already loaded
    useEffect(() => {
        if (selectedContact && !chatHistory[selectedContact.id]) {
            setChatHistory(prev => ({
                ...prev,
                [selectedContact.id]: generateMessages(10 + Math.floor(Math.random() * 20))
            }));
        }
    }, [selectedContact, chatHistory]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedContact) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msg = {
            id: Date.now().toString(),
            text: newMessage,
            sender: 'me',
            timestamp
        };

        // Update chat history
        setChatHistory(prev => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] || []), msg]
        }));

        // Move contact to top and update last message preview
        setContacts(prevContacts => {
            const contactIndex = prevContacts.findIndex(c => c.id === selectedContact.id);
            if (contactIndex === -1) return prevContacts;

            const updatedContacts = [...prevContacts];
            const [contact] = updatedContacts.splice(contactIndex, 1);
            
            // Update the preview data
            const updatedContact = {
                ...contact,
                lastMessage: newMessage,
                time: 'Just now',
                unreadCount: 0 // Reset unread when we interact
            };

            return [updatedContact, ...updatedContacts];
        });

        setNewMessage("");
    };

    const currentMessages = selectedContact ? (chatHistory[selectedContact.id] || []) : [];
    
    const filteredContacts = contacts.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-140px)] animate-in fade-in duration-500">
            <ChatSidebar 
                contacts={filteredContacts}
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <ChatWindow 
                selectedContact={selectedContact}
                messages={currentMessages}
                onBack={() => setSelectedContact(null)}
                newMessage={newMessage}
                onNewMessageChange={setNewMessage}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Chat;

