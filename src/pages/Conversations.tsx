
import { useState } from "react";
import ConversationList, { Conversation } from "@/components/conversations/ConversationList";
import ConversationView from "@/components/conversations/ConversationView";

const Conversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "c1",
      customer: {
        id: "cust1",
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?u=sarah"
      },
      lastMessage: {
        text: "Asked about product return policy",
        time: "10 mins ago",
        isRead: false
      },
      channel: "facebook",
      unreadCount: 2
    },
    {
      id: "c2",
      customer: {
        id: "cust2",
        name: "John Peterson",
        avatar: "https://i.pravatar.cc/150?u=john"
      },
      lastMessage: {
        text: "When will my order arrive?",
        time: "1 hour ago",
        isRead: true
      },
      channel: "whatsapp",
      unreadCount: 0
    },
    {
      id: "c3",
      customer: {
        id: "cust3",
        name: "Emma Thompson",
        avatar: "https://i.pravatar.cc/150?u=emma"
      },
      lastMessage: {
        text: "Do you have this in size M?",
        time: "2 hours ago",
        isRead: false
      },
      channel: "facebook",
      unreadCount: 1
    },
    {
      id: "c4",
      customer: {
        id: "cust4",
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?u=michael"
      },
      lastMessage: {
        text: "Thanks for your help!",
        time: "3 hours ago",
        isRead: true
      },
      channel: "whatsapp",
      unreadCount: 0
    },
    {
      id: "c5",
      customer: {
        id: "cust5",
        name: "Sophia Rodriguez",
        avatar: "https://i.pravatar.cc/150?u=sophia"
      },
      lastMessage: {
        text: "Can I change my shipping address?",
        time: "5 hours ago",
        isRead: false
      },
      channel: "facebook",
      unreadCount: 3
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>(
    conversations[0]
  );

  const handleSelectConversation = (conversation: Conversation) => {
    // Mark as read when selected
    setConversations(prevConversations =>
      prevConversations.map(c =>
        c.id === conversation.id
          ? { ...c, unreadCount: 0, lastMessage: { ...c.lastMessage, isRead: true } }
          : c
      )
    );
    
    setSelectedConversation(conversation);
  };

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="grid md:grid-cols-[350px_1fr] h-full">
        <ConversationList 
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversationId={selectedConversation?.id}
        />
        <ConversationView conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default Conversations;
