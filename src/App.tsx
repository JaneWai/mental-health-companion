import React, { useState } from 'react'
import { Heart, MessageCircle, Calendar, TrendingUp, Settings, User, Moon, Sun } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import MoodTracker from './components/MoodTracker'
import JournalEntry from './components/JournalEntry'
import Resources from './components/Resources'
import Profile from './components/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'mood', label: 'Mood', icon: Heart },
    { id: 'journal', label: 'Journal', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface isDarkMode={isDarkMode} />
      case 'mood':
        return <MoodTracker isDarkMode={isDarkMode} />
      case 'journal':
        return <JournalEntry isDarkMode={isDarkMode} />
      case 'resources':
        return <Resources isDarkMode={isDarkMode} />
      case 'profile':
        return <Profile isDarkMode={isDarkMode} />
      default:
        return <ChatInterface isDarkMode={isDarkMode} />
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-white/20'
      } border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Serenity
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your companion for mental wellness
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
            } rounded-2xl p-6 shadow-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-white/20'
            }`}>
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderActiveComponent()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
