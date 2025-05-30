import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Heart, Smile, Frown, Meh } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  mood?: 'happy' | 'sad' | 'neutral'
}

interface ChatInterfaceProps {
  isDarkMode: boolean
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isDarkMode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Serenity, your mental health companion. I'm here to listen and support you through whatever you're feeling. How are you doing today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      return "I understand that feeling lonely can be really difficult. Remember that you're not truly alone - I'm here with you, and there are people who care about you. Sometimes loneliness is temporary, and reaching out (like you're doing now) is a brave first step. Would you like to talk about what's making you feel this way?"
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I hear that you're feeling down, and I want you to know that your feelings are valid. It's okay to not be okay sometimes. These difficult emotions are part of the human experience. Have you been able to identify what might be contributing to these feelings? Sometimes talking through them can help lighten the load."
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      return "Anxiety and stress can feel overwhelming, but you're taking a positive step by acknowledging these feelings. Try taking a few deep breaths with me - in for 4 counts, hold for 4, out for 4. Remember that most of our worries never actually happen. What's one small thing you could do right now to feel a bit more grounded?"
    }
    
    if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      return "Anger and frustration are natural emotions, and it's important to acknowledge them rather than suppress them. These feelings often signal that something important to you isn't being met or respected. Can you tell me more about what's triggering these feelings? Sometimes understanding the 'why' can help us find healthy ways to address it."
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('drained')) {
      return "Feeling emotionally or physically drained is your mind and body's way of telling you that you need care and rest. It's not weakness - it's wisdom. Have you been getting enough sleep? Are you taking on too much? Remember, rest isn't earned, it's required. What's one small way you could be gentler with yourself today?"
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('better') || lowerMessage.includes('help')) {
      return "I'm so glad I could be here for you. Remember, seeking support shows strength, not weakness. You have the resilience to get through difficult times, and I believe in your ability to heal and grow. Is there anything specific you'd like to explore or work on together?"
    }
    
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy')) {
      return "That's wonderful to hear! I'm genuinely happy that you're feeling good. It's important to acknowledge and celebrate these positive moments. What's contributing to your good mood today? Sometimes identifying what makes us feel good can help us recreate those conditions in the future."
    }
    
    // Default responses
    const defaultResponses = [
      "I'm here to listen. Can you tell me more about what you're experiencing right now?",
      "Your feelings matter, and I want to understand better. What's been on your mind lately?",
      "Thank you for sharing with me. How long have you been feeling this way?",
      "I appreciate you opening up. What would feel most helpful for you right now?",
      "It sounds like you're going through something difficult. Would you like to explore this together?",
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-4 h-4 text-green-500" />
      case 'sad': return <Frown className="w-4 h-4 text-red-500" />
      case 'neutral': return <Meh className="w-4 h-4 text-yellow-500" />
      default: return null
    }
  }

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
    } rounded-2xl shadow-lg border ${
      isDarkMode ? 'border-gray-700' : 'border-white/20'
    } h-[600px] flex flex-col`}>
      {/* Chat Header */}
      <div className={`p-6 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Serenity AI</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Always here to listen
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-green-400 to-blue-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${
                    message.sender === 'user' 
                      ? 'text-purple-100' 
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {getMoodIcon(message.mood)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className={`rounded-2xl px-4 py-3 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-6 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className={`flex-1 resize-none rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
