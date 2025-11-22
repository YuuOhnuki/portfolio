import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark-dimmed.css';
import '../styles/markdown.css';

const GeminiChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            text: 'Yuu Ohnukiについて何か質問はありますか？',
            timestamp: Date.now(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);
        setIsTyping(true);

        // Simulate typing delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const responseText = await sendMessageToGemini(userMsg.text);

        const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
        setIsTyping(false);
    };

    return (
        <>
            {/* Toggle Button - Simplified */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full 
          bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-2xl 
          transition-all duration-300 
          hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:scale-110
          ${isOpen ? 'hidden' : 'block'}`}
                aria-label="AIチャットを開く"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 w-80 md:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-cyan-900/30 to-teal-900/30">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-cyan-400" />
                                <span className="font-semibold text-sm tracking-wide text-white">AI Chat</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-white text-black rounded-tr-none'
                                                : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                        }`}
                                    >
                                        {msg.role === 'model' ? (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc list-inside mb-2 space-y-1">
                                                            {children}
                                                        </ul>
                                                    ),
                                                    ol: ({ children }) => (
                                                        <ol className="list-decimal list-inside mb-2 space-y-1">
                                                            {children}
                                                        </ol>
                                                    ),
                                                    li: ({ children }) => <li>{children}</li>,
                                                    strong: ({ children }) => (
                                                        <strong className="font-bold text-white">{children}</strong>
                                                    ),
                                                    em: ({ children }) => <em className="italic">{children}</em>,
                                                    code: ({ node, inline, children, className, ...props }: any) => {
                                                        const { ref, key, ...htmlProps } = props;
                                                        return inline ? (
                                                            <code
                                                                className="bg-black/30 px-1 py-0.5 rounded text-cyan-400 text-xs"
                                                                {...htmlProps}
                                                            >
                                                                {children}
                                                            </code>
                                                        ) : (
                                                            <code
                                                                className="block bg-black/30 p-2 rounded text-xs overflow-x-auto"
                                                                {...htmlProps}
                                                            >
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    blockquote: ({ children }) => (
                                                        <blockquote className="border-l-2 border-cyan-400 pl-3 italic text-gray-300 my-2">
                                                            {children}
                                                        </blockquote>
                                                    ),
                                                    a: ({ href, children }) => (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-cyan-400 hover:text-cyan-300 underline"
                                                        >
                                                            {children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>
                            ))}
                            {(isLoading || isTyping) && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <span
                                                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                                    style={{ animationDelay: '0ms' }}
                                                ></span>
                                                <span
                                                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                                    style={{ animationDelay: '200ms' }}
                                                ></span>
                                                <span
                                                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                                    style={{ animationDelay: '400ms' }}
                                                ></span>
                                            </div>
                                            <span className="text-xs text-gray-500 ml-2">
                                                {isTyping ? '考え中...' : '読み込み中...'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="プロジェクトについて質問する..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="p-2 bg-white text-black rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GeminiChat;
