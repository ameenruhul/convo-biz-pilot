
import { useState, useRef, useEffect } from "react";
import { Conversation } from "./ConversationList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Send,
  Plus,
  MoreVertical,
  MessagesSquare,
  PackageOpen,
  MessageSquare,
  Facebook,
  Clock,
  ShoppingBag
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "customer" | "business" | "ai";
}

interface ConversationViewProps {
  conversation?: Conversation;
}

const ConversationView = ({ conversation }: ConversationViewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      text: "Hey there! I'm interested in your products. Do you ship to Canada?",
      time: "10:30 AM",
      sender: "customer",
    },
    {
      id: "m2",
      text: "Hello! Yes, we do ship to Canada. Shipping costs depend on the size and weight of the package.",
      time: "10:32 AM",
      sender: "ai",
    },
    {
      id: "m3",
      text: "Great! I'm looking at the blue dress on your website. Is it available in size M?",
      time: "10:35 AM",
      sender: "customer",
    },
    {
      id: "m4",
      text: "Let me check that for you. Yes, we have the blue dress in size M in stock and ready to ship.",
      time: "10:38 AM",
      sender: "ai",
    },
    {
      id: "m5",
      text: "Perfect! How much would shipping be to Toronto?",
      time: "10:40 AM",
      sender: "customer",
    },
    {
      id: "m6",
      text: "For a dress, shipping to Toronto would be $12.99 and it would take approximately 5-7 business days to arrive.",
      time: "10:42 AM",
      sender: "ai",
    },
    {
      id: "m7",
      text: "That sounds good. I'll place an order right away. Thanks!",
      time: "10:45 AM",
      sender: "customer",
    },
    {
      id: "m8",
      text: "Actually, I had one more question about returns.",
      time: "10:47 AM",
      sender: "customer",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !conversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "business",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `m${Date.now() + 1}`,
        text: "I'm your AI assistant. I've processed your message and will help the customer with their inquiry.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "ai",
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleCreateOrder = () => {
    toast.success("Order created successfully");
  };

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <MessagesSquare className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
        <p className="text-muted-foreground">
          Select a conversation from the list to view messages
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.customer.avatar} />
            <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center gap-2">
              {conversation.customer.name}
              {conversation.channel === "facebook" ? (
                <Badge variant="outline" className="text-blue-600 bg-blue-50">
                  <Facebook className="h-3 w-3 mr-1" /> Facebook
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last active {conversation.lastMessage.time}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCreateOrder}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Create Order
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                View Customer Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PackageOpen className="h-4 w-4 mr-2" />
                View Orders
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Mark as Spam
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "customer" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "customer"
                  ? "bg-secondary text-secondary-foreground"
                  : message.sender === "ai"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {message.sender === "ai" && (
                <div className="flex items-center text-xs mb-1 gap-1 text-blue-600">
                  <MessageSquare className="h-3 w-3" />
                  AI Assistant
                </div>
              )}
              <p>{message.text}</p>
              <div className="text-xs opacity-70 text-right mt-1">
                {message.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
