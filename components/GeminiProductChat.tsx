import React, { useState, useRef, useEffect } from 'react';
import type { Product } from '../types';
import { askAboutProduct } from '../services/geminiService';
import { SparklesIcon, SendIcon, UserIcon, BotIcon } from './icons';

interface GeminiProductChatProps {
  product: Product;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const GeminiProductChat: React.FC<GeminiProductChatProps> = ({ product }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await askAboutProduct(product, currentInput);
      const botMessage: Message = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <SparklesIcon className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-semibold text-primary ml-2">Ask AI about this product</h3>
      </div>
      <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded-md mb-4 flex flex-col space-y-4">
        {messages.length === 0 && (
             <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
                <p>e.g., "Is this waterproof?" or "What is it made of?"</p>
            </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <div className="bg-gray-200 p-2 rounded-full"><BotIcon className="w-5 h-5 text-primary"/></div>}
            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-gray-200 text-primary'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <div className="bg-gray-200 p-2 rounded-full"><UserIcon className="w-5 h-5 text-primary"/></div>}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
                <div className="bg-gray-200 p-2 rounded-full"><BotIcon className="w-5 h-5 text-primary"/></div>
                <div className="px-4 py-3 bg-gray-200 rounded-lg flex items-center space-x-2">
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <SendIcon className="w-5 h-5"/>
        </button>
      </form>
    </div>
  );
};

export default GeminiProductChat;