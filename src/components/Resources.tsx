import React from 'react'
import { ExternalLink, Phone, MessageSquare, Book, Video, Headphones, Heart } from 'lucide-react'

interface ResourcesProps {
  isDarkMode: boolean
}

const Resources: React.FC<ResourcesProps> = ({ isDarkMode }) => {
  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      icon: Phone
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis counseling',
      icon: MessageSquare
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral service',
      icon: Phone
    }
  ]

  const selfCareActivities = [
    {
      title: 'Breathing Exercises',
      description: 'Simple techniques to reduce anxiety and stress',
      icon: '🫁',
      activities: [
        '4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8',
        'Box breathing: Inhale 4, hold 4, exhale 4, hold 4',
        'Deep belly breathing for 5 minutes'
      ]
    },
    {
      title: 'Mindfulness & Meditation',
      description: 'Practices to center yourself and find peace',
      icon: '🧘',
      activities: [
        '5-minute guided meditation',
        'Body scan relaxation',
        'Mindful walking in nature',
        'Gratitude journaling'
      ]
    },
    {
      title: 'Physical Wellness',
      description: 'Movement and activities for mental health',
      icon: '💪',
      activities: [
        '10-minute walk outside',
        'Gentle stretching or yoga',
        'Dance to your favorite music',
        'Progressive muscle relaxation'
      ]
    },
    {
      title: 'Creative Expression',
      description: 'Outlets for emotions and stress relief',
      icon: '🎨',
      activities: [
        'Free writing or journaling',
        'Drawing or doodling',
        'Listening to calming music',
        'Crafting or DIY projects'
      ]
    }
  ]

  const professionalResources = [
    {
      title: 'Psychology Today',
      description: 'Find therapists and mental health professionals in your area',
      url: 'https://www.psychologytoday.com',
      icon: Book
    },
    {
      title: 'BetterHelp',
      description: 'Online therapy and counseling services',
      url: 'https://www.betterhelp.com',
      icon: Video
    },
    {
      title: 'Headspace',
      description: 'Meditation and mindfulness app',
      url: 'https://www.headspace.com',
      icon: Headphones
    },
    {
      title: 'NAMI (National Alliance on Mental Illness)',
      description: 'Mental health education, support, and advocacy',
      url: 'https://www.nami.org',
      icon: Heart
    }
  ]

  return (
    <div className="space-y-6">
      {/* Emergency Contacts */}
      <div className={`${
        isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
      } rounded-2xl p-6 border`}>
        <div className="flex items-center space-x-3 mb-6">
          <Phone className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-red-600">Emergency Support</h2>
        </div>
        <p className={`mb-6 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
          If you're in crisis or having thoughts of self-harm, please reach out immediately:
        </p>
        <div className="grid gap-4">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon
            return (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-red-900/30' : 'bg-white'
                } border ${isDarkMode ? 'border-red-800' : 'border-red-200'}`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-lg font-mono text-red-600">{contact.number}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                      {contact.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Self-Care Activities */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold">Self-Care Activities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {selfCareActivities.map((category, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {category.activities.map((activity, actIndex) => (
                  <li
                    key={actIndex}
                    className={`text-sm flex items-start space-x-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-purple-500 mt-1">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Resources */}
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
      } rounded-2xl p-6 shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      }`}>
        <div className="flex items-center space-x-3 mb-6">
          <Book className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Professional Resources</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {professionalResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md group ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-700/50 hover:bg-gray-700' 
                    : 'border-gray-200 bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-500 transition-colors`} />
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Helpful Tips */}
      <div className={`${
        isDarkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-100 to-purple-100'
      } rounded-2xl p-6 border ${
        isDarkMode ? 'border-blue-800' : 'border-blue-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Remember</h2>
        <div className="space-y-3">
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            • It's okay to not be okay. Your feelings are valid.
          </p>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            • Seeking help is a sign of strength, not weakness.
          </p>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            • Small steps forward are still progress.
          </p>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            • You are not alone in this journey.
          </p>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            • Professional help is available and can make a real difference.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Resources
