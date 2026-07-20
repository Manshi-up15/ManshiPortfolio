/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { ChatMessage, VisualTheme } from "../types";
import { Send, Sparkles, MessageSquare, X, RefreshCw, Eye, ArrowDownRight } from "lucide-react";

interface AIChatBotProps {
  activeTheme: VisualTheme;
}

const CHIP_SUGGESTIONS = [
  "What is Manshi's design philosophy?",
  "Tell me about her work at Studique.",
  "What was her role in HappenHub?",
  "Is Manshi available for internships?",
];

export default function AIChatBot({ activeTheme }: AIChatBotProps) {
  const isBrutalist = activeTheme === "brutalist";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm Manshi's Custom AI Agent. I'm trained on her portfolio, design philosophy, and achievements. Ask me anything about her work, or select one of the quick options below!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Style helper classes
  const floatingBtnCls = isBrutalist
    ? "bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
    : "bg-primary text-white shadow-xl hover:bg-primary-container hover:scale-105 transition-all";

  const chatContainerCls = isBrutalist
    ? "bg-[#faf5ee] border-4 border-black shadow-[12px_12px_0px_0px_#000000]"
    : "bg-white border border-[#e6e0d6] shadow-[0_20px_50px_rgba(150,70,7,0.15)] rounded-2xl";

  const chatHeaderCls = isBrutalist
    ? "bg-purple-600 border-b-4 border-black p-4 text-white flex justify-between items-center"
    : "bg-gradient-to-r from-primary to-[#b85b1a] p-4 text-white rounded-t-2xl flex justify-between items-center";

  const badgeCls = isBrutalist
    ? "bg-yellow-400 border border-black text-black px-2 py-0.5 text-[9px] font-black"
    : "bg-white/20 text-white rounded-full px-2 py-0.5 text-[9px] font-bold";

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-8), // send last 8 turns as memory structure
        }),
      });

      if (!response.ok) {
        throw new Error("Chat api request issue");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I was unable to retrieve a response. Please try asking again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      // Fail gracefully with simulated local answer context matching keywords if possible
      const offlineReply = simulateLocalAnswer(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: "bot",
          text: offlineReply,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateLocalAnswer = (text: string): string => {
    const q = text.toLowerCase();
    if (q.includes("philosophy") || q.includes("design philosophy")) {
      return `Manshi's core design philosophy lies at the intersection of **clean hierarchy** and **intuitive interaction design**. She believes that visual details should never obscure functional utility, framing layouts with generous whitespace, readable fonts, and purposeful animation feedback.`;
    }
    if (q.includes("studique") || q.includes("experience")) {
      return `Manshi currently serves as the **Design Lead** at **Studique** (from Jun 2025 to Present). At Studique, she heads visual product strategy for a university campus networking app and maintains its extensive, scalable design guidelines. Before this, she was an intern at **Coding Samurai**.`;
    }
    if (q.includes("happenhub") || q.includes("project")) {
      return `**HappenHub** is one of Manshi's selected creations. It is a vibrant React and Spring Boot mobile-first portal designed to help students discover and reserve slots for niche community projects and interactive workshops easily. Check out the interactive mockup on this portfolio!`;
    }
    if (q.includes("internship") || q.includes("hired") || q.includes("job")) {
      return `Yes! Manshi is absolutely looking for exciting visual UI/UX design, frontend development, or product management internships. Feel free to download her resume here or mail her directly at **sainimanshi93@gmail.com**!`;
    }
    return `That's an interesting question! While running in offline demonstration framework mode, I want to assure you that Manshi possesses expert skills in **Figma, Prototyping, and React engineering**. 

Would you like to ask about her academic certifications or see her core project work?`;
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-fresh",
        sender: "bot",
        text: "Conversation history cleared! How can I assist you with Manshi's academic credentials and portfolio today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-manrope">
      
      {/* Floating active button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 p-4 min-w-[56px] justify-center rounded-full transition-all cursor-pointer ${floatingBtnCls}`}
          title="Ask Manshi's Custom Twin"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className={`text-xs font-black uppercase tracking-tight hidden md:inline-block ${isBrutalist ? "font-space" : "font-semibold font-manrope text-white"}`}>
            Ask Manshi's AI
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
        </button>
      )}

      {/* Expanded chat window */}
      {isOpen && (
        <div className={`w-[340px] md:w-[380px] h-[525px] flex flex-col justify-between overflow-hidden relative ${chatContainerCls}`}>
          
          {/* Header block */}
          <div className={chatHeaderCls}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <h4 className={`text-sm font-bold tracking-tight uppercase ${isBrutalist ? "font-space text-yellow-300" : "font-manrope"}`}>
                    AI Twin Saini
                  </h4>
                  <span className={badgeCls}>Gemini 3.5</span>
                </div>
                <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest">Digital Proxy Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:bg-white/10 text-white rounded-full transition-colors"
                title="Clear history"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 text-white rounded-full transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages display viewport */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-white/50">
            {messages.map((m) => {
              const botSender = m.sender === "bot";
              return (
                <div key={m.id} className={`flex ${botSender ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-xs text-black leading-relaxed ${
                      botSender
                        ? isBrutalist
                          ? "bg-white border-2 border-black font-semibold shadow-[3px_3px_0px_#000]"
                          : "bg-[#fff8f4] text-on-surface border border-[#e6e0d6] rounded-xl rounded-tl-sm shadow-xs"
                        : isBrutalist
                        ? "bg-yellow-100 border-2 border-black font-semibold text-black shadow-[3px_3px_0px_#000]"
                        : "bg-primary text-white rounded-xl rounded-tr-sm shadow-xs"
                    }`}
                  >
                    {/* Render message with bold fallback styling helper */}
                    <p className="whitespace-pre-line">
                      {m.text}
                    </p>
                    <span className={`text-[8px] mt-1.5 block text-right font-mono uppercase ${botSender ? "text-gray-400" : "text-white/70"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg ${isBrutalist ? "bg-white border-2 border-black" : "bg-[#fef1e7]"} flex items-center gap-2`}>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips suggested prompts */}
          {messages.length < 3 && (
            <div className="px-4 py-2 border-t border-gray-150/40 bg-white space-y-1.5">
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                <Eye className="w-3 h-3" /> Quick suggestions:
              </span>
              <div className="flex flex-wrap gap-1">
                {CHIP_SUGGESTIONS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className={`text-[10px] px-2 py-1 text-left font-semibold rounded-full select-none cursor-pointer border transition-all ${
                      isBrutalist
                        ? "bg-[#faf5ee] text-black border-black hover:bg-yellow-100"
                        : "bg-primary/5 text-[#964407] border-primary/10 hover:bg-primary/10 rounded-full"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Send Input Area */}
          <div className={`p-3 border-t flex justify-between items-center gap-2 bg-white ${isBrutalist ? "border-black bg-[#faf5ee]" : "border-[#e6e0d6]"}`}>
            <input
              type="text"
              placeholder="Ask me anything about Manshi..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className={`flex-grow px-3 py-2 text-xs text-black border focus:outline-none transition-all ${
                isBrutalist
                  ? "border-2 border-black bg-white placeholder-gray-400"
                  : "border-[#e6e0d6] rounded-lg bg-[#fff8f4]/50 focus:bg-white placeholder-gray-400"
              }`}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className={`p-2.5 flex items-center justify-center shrink-0 cursor-pointer text-white hover:scale-105 active:scale-95 transition-all text-center rounded-lg ${
                isBrutalist
                  ? "bg-black border-2 border-black text-yellow-400 hover:bg-purple-600 hover:text-white"
                  : "bg-primary text-white rounded-lg shadow-sm"
              }`}
              aria-label="Send message"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
