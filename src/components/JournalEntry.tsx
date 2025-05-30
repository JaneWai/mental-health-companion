import React, { useState } from 'react'
import { PenTool, Calendar, Search, BookOpen, Star } from 'lucide-react'

interface JournalEntryType {
  id: string
  title: string
  content: string
  date: Date
  mood?: 'positive' | 'neutral' | 'negative'
  tags: string[]
}

interface JournalEntryProps {
  isDarkMode: boolean
}

const JournalEntry: React.FC<JournalEntryProps> = ({ isDarkMode }) => {
  const [entries, setEntries] = useState<JournalEntryType[]>([
    {
      id: '1',
      title: 'A Good Day',
      content: 'Today was surprisingly good. I managed to complete all my tasks and even had time to call my mom. Sometimes the simple things make the biggest difference.',
      date: new Date(Date.now() - 86400000),
      mood: 'positive',
      tags: ['family', 'productivity']
    },
    {
      id: '2',
      title: 'Feeling Overwhelmed',
      content: 'Work has been really stressful lately. I feel like I\'m drowning in tasks and deadlines. Need to find better ways to manage my time and stress.',
      date: new Date(Date.now() - 172800000),
      mood: 'negative',
      tags: ['work', 'stress']
    }
  ])
  
  const [isWriting, setIsWriting] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt truly happy recently.",
    "What's been challenging you lately, and how are you coping?",
    "Write about someone who made a positive impact on your day.",
    "What would you tell your past self from a year ago?",
    "Describe your ideal day. What would it look like?",
    "What's one thing you learned about yourself this week?",
    "Write about a goal you're working towards and why it matters to you."
  ]

  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)])

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return

    const entry: JournalEntryType = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      date: new Date(),
      tags: []
    }

    setEntries(prev => [entry, ...prev])
    setNewTitle('')
    setNewContent('')
    setIsWriting(false)
  }

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'positive': return 'text-green-500'
      case 'negative': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'positive': return '😊'
      case 'negative': return '😔'
      default: return '😐'
    }
  }

  return (
    <div className="space-y-6">
      {/* Writing Prompt */}
      <div className={`${
        isDarkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-purple-100 to-pink-100'
      } rounded-2xl p-6 border ${
        isDarkMode ? 'border-purple-800' : 'border-purple-200'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          <Star className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold">Today's Writing Prompt</h2>
        </div>
        <p className={`text-lg ${isDarkMode ? 'text-purple-200' : 'text-purple-800'} italic`}>
          "{currentPrompt}"
        </p>
      </div>

      {/* New Entry Form */}
      {isWriting ? (
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
        } rounded-2xl p-6 shadow-lg border ${
          isDarkMode ? 'border-gray-700' : 'border-white/20'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <PenTool className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">New Journal Entry</h2>
          </div>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Entry title..."
            className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write about your thoughts, feelings, experiences..."
            className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            rows={8}
          />

          <div className="flex space-x-3">
            <button
              onClick={handleSaveEntry}
              disabled={!newTitle.trim() || !newContent.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Save Entry
            </button>
            <button
              onClick={() => setIsWriting(false)}
              className={`px-6 py-3 rounded-xl border transition-all duration-200 font-medium ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
        } rounded-2xl p-6 shadow-lg border ${
          isDarkMode ? 'border-gray-700' : 'border-white/20'
        }`}>
          <button
            onClick={() => setIsWriting(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium flex items-center justify-center space-x-3"
          >
            <PenTool className="w-5 h-5" />
            <span>Start Writing</span>
          </button>
        </div>
      )}

      {/* Search */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your journal entries..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Journal Entries */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold">Your Journal Entries</h2>
        </div>

        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  isDarkMode ? 'border-gray-700 bg-gray-700/50 hover:bg-gray-700' : 'border-gray-200 bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{entry.title}</h3>
                  <div className="flex items-center space-x-2">
                    {entry.mood && (
                      <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                    )}
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {entry.content}
                </p>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {searchTerm ? 'No entries found matching your search.' : 'No journal entries yet. Start writing to capture your thoughts!'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JournalEntry
