import React, { useState } from 'react'
import { Smile, Frown, Meh, Heart, TrendingUp, Calendar } from 'lucide-react'

interface MoodEntry {
  id: string
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  date: Date
  note?: string
}

interface MoodTrackerProps {
  isDarkMode: boolean
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ isDarkMode }) => {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [note, setNote] = useState('')
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { id: '1', mood: 'good', date: new Date(Date.now() - 86400000), note: 'Had a productive day at work' },
    { id: '2', mood: 'okay', date: new Date(Date.now() - 172800000), note: 'Feeling a bit stressed' },
    { id: '3', mood: 'great', date: new Date(Date.now() - 259200000), note: 'Spent time with friends' },
  ])

  const moods = [
    { id: 'great', label: 'Great', emoji: '😄', color: 'from-green-400 to-green-600' },
    { id: 'good', label: 'Good', emoji: '😊', color: 'from-blue-400 to-blue-600' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'from-yellow-400 to-yellow-600' },
    { id: 'bad', label: 'Bad', emoji: '😔', color: 'from-orange-400 to-orange-600' },
    { id: 'terrible', label: 'Terrible', emoji: '😢', color: 'from-red-400 to-red-600' },
  ]

  const handleSaveMood = () => {
    if (!selectedMood) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood as MoodEntry['mood'],
      date: new Date(),
      note: note.trim() || undefined,
    }

    setMoodEntries(prev => [newEntry, ...prev])
    setSelectedMood('')
    setNote('')
  }

  const getMoodStats = () => {
    const last7Days = moodEntries.filter(entry => 
      entry.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    )
    
    const moodCounts = last7Days.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalEntries = last7Days.length
    return { moodCounts, totalEntries }
  }

  const { moodCounts, totalEntries } = getMoodStats()

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold">How are you feeling today?</h2>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMood === mood.id
                  ? `border-purple-500 bg-gradient-to-r ${mood.color} text-white`
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your mood (optional)..."
          className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          rows={3}
        />

        <button
          onClick={handleSaveMood}
          disabled={!selectedMood}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          Save Mood Entry
        </button>
      </div>

      {/* Mood Statistics */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Your Mood Trends (Last 7 Days)</h2>
        </div>

        {totalEntries > 0 ? (
          <div className="space-y-4">
            {moods.map((mood) => {
              const count = moodCounts[mood.id] || 0
              const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0
              
              return (
                <div key={mood.id} className="flex items-center space-x-4">
                  <div className="text-2xl">{mood.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{mood.label}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {count} times ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${mood.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No mood entries yet. Start tracking your mood to see trends!
          </p>
        )}
      </div>

      {/* Recent Entries */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold">Recent Mood Entries</h2>
        </div>

        <div className="space-y-4">
          {moodEntries.slice(0, 5).map((entry) => {
            const mood = moods.find(m => m.id === entry.mood)
            return (
              <div
                key={entry.id}
                className={`p-4 rounded-xl border ${
                  isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mood?.emoji}</span>
                    <span className="font-medium">{mood?.label}</span>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {entry.date.toLocaleDateString()}
                  </span>
                </div>
                {entry.note && (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {entry.note}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MoodTracker
