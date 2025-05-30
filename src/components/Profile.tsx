import React, { useState } from 'react'
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit3, Save, X } from 'lucide-react'

interface ProfileProps {
  isDarkMode: boolean
}

const Profile: React.FC<ProfileProps> = ({ isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: 'March 2024',
    preferredName: 'Alex',
    timezone: 'Eastern Time (ET)',
    reminderTime: '20:00'
  })
  
  const [editedProfile, setEditedProfile] = useState(profile)
  const [notifications, setNotifications] = useState({
    dailyCheckIn: true,
    moodReminders: true,
    journalPrompts: false,
    weeklyReports: true
  })

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const stats = [
    { label: 'Days Active', value: '23', color: 'from-blue-500 to-blue-600' },
    { label: 'Journal Entries', value: '15', color: 'from-green-500 to-green-600' },
    { label: 'Mood Entries', value: '31', color: 'from-purple-500 to-purple-600' },
    { label: 'Chat Sessions', value: '8', color: 'from-pink-500 to-pink-600' }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Member since {profile.joinDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Information */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold">Profile Information</h3>
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className={`w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            ) : (
              <p className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {profile.name}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                className={`w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            ) : (
              <p className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {profile.email}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Preferred Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.preferredName}
                onChange={(e) => setEditedProfile({...editedProfile, preferredName: e.target.value})}
                className={`w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            ) : (
              <p className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {profile.preferredName}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Timezone
            </label>
            {isEditing ? (
              <select
                value={editedProfile.timezone}
                onChange={(e) => setEditedProfile({...editedProfile, timezone: e.target.value})}
                className={`w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                <option value="Central Time (CT)">Central Time (CT)</option>
                <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
              </select>
            ) : (
              <p className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {profile.timezone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {key === 'dailyCheckIn' && 'Daily mood check-in reminders'}
                  {key === 'moodReminders' && 'Gentle reminders to track your mood'}
                  {key === 'journalPrompts' && 'Weekly writing prompts for journaling'}
                  {key === 'weeklyReports' && 'Weekly summary of your mental health journey'}
                </p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, [key]: !value})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-purple-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="space-y-4">
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}>
            <Shield className="w-5 h-5 text-green-500" />
            <span>Privacy & Security</span>
          </button>
          
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}>
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span>Help & Support</span>
          </button>
          
          <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } text-red-500`}>
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
