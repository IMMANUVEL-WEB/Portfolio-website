import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, User, ChevronRight } from 'lucide-react';

const resumeQuestions = [
  {
    id: 1,
    question: "What is Immanuvel's current role and company?",
    answer: "Immanuvel S is currently working as a Full Stack Frappe & ERPNext Developer at Bosco Soft Technologies Pvt. Ltd in Yelagiri Hills, Tamil Nadu."
  },
  {
    id: 2,
    question: "What programming languages does Immanuvel specialize in?",
    answer: "Immanuvel specializes in Python for backend development and works extensively with Frappe Framework and ERPNext for business applications."
  },
  {
    id: 3,
    question: "What frontend technologies does Immanuvel work with?",
    answer: "Immanuvel works with React.js, Tailwind CSS, HTML, CSS, JavaScript, and Bootstrap for frontend development."
  },
  {
    id: 4,
    question: "What databases has Immanuvel worked with?",
    answer: "Immanuvel has experience working with PostgreSQL and MySQL databases."
  },
  {
    id: 5,
    question: "What is Immanuvel's educational background?",
    answer: "Immanuvel is currently pursuing BCA (Bachelor of Computer Applications) from 2022-2025."
  },
  {
    id: 6,
    question: "What internship experience does Immanuvel have?",
    answer: "Immanuvel completed a Frontend Web Developer internship at Virtunexa in Pune, Maharashtra (Remote), where he developed responsive UI components and worked with HTML, CSS, JavaScript, and React."
  },
  {
    id: 7,
    question: "What achievements has Immanuvel earned?",
    answer: "Immanuvel has won First Prize in College Science Expo (2024), completed Python Full Stack certification from Boscosoft Pvt. Ltd., and completed Frontend Web Development Internship certification from Virtunexa."
  },
  {
    id: 8,
    question: "What tools and technologies does Immanuvel use?",
    answer: "Immanuvel uses Git, GitHub, VS Code, Postman, Thunder Client, Frappe Bench, and ERPNext Desk as development tools."
  },
  {
    id: 9,
    question: "What type of projects has Immanuvel worked on?",
    answer: "Immanuvel has worked on Vehicle Rental System (React, Tailwind CSS, PostgreSQL), Internship Management System (PHP, MySQL), Gym Website (HTML, CSS), and Portfolio Website (HTML, CSS, JavaScript)."
  },
  {
    id: 10,
    question: "How can someone contact Immanuvel?",
    answer: "You can contact Immanuvel via email at immans358@gmail.com, phone at +91 93632 36043, LinkedIn (linkedin.com/in/immanuvel2004), or GitHub (github.com/IMMANUVEL-WEB)."
  }
];

function ImmansBot({ isLight }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'bot',
      content: "👋 Hi! I'm Imman's Bot. I can tell you about Immanuvel's background, experience, and skills. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process user input and generate responses
  const processMessage = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Keywords and their responses
    const responses = {
      // Basic info
      hello: "👋 Hello! How can I help you learn about Immanuvel's background and experience?",
      hi: "👋 Hi there! I'm here to tell you about Immanuvel's skills and experience. What would you like to know?",
      hey: "👋 Hey! Ready to learn about Immanuvel? Ask me anything about his background!",

      // Experience & Role
      experience: "Immanuvel is currently working as a Full Stack Frappe & ERPNext Developer at Bosco Soft Technologies Pvt. Ltd in Yelagiri Hills, Tamil Nadu. He also completed a Frontend Web Developer internship at Virtunexa.",
      role: "Immanuvel works as a Full Stack Software Developer specializing in Frappe Framework and ERPNext development.",
      job: "Immanuvel is currently employed as a Full Stack Frappe & ERPNext Developer at Bosco Soft Technologies Pvt. Ltd.",
      company: "Immanuvel works at Bosco Soft Technologies Pvt. Ltd in Yelagiri Hills, Tamil Nadu, and previously interned at Virtunexa.",

      // Skills & Technologies
      skills: "Immanuvel specializes in Python, Frappe Framework, ERPNext, React.js, Tailwind CSS, HTML, CSS, JavaScript, Django, PostgreSQL, and MySQL.",
      python: "Immanuvel is proficient in Python and uses it extensively for Frappe Framework and backend development.",
      react: "Immanuvel works with React.js for frontend development and has experience building responsive UI components.",
      javascript: "Immanuvel uses JavaScript for web development and has experience with React.js and vanilla JavaScript.",
      database: "Immanuvel has experience with PostgreSQL and MySQL databases.",
      tools: "Immanuvel uses Git, GitHub, VS Code, Postman, Thunder Client, Frappe Bench, and ERPNext Desk as development tools.",

      // Education
      education: "Immanuvel is currently pursuing BCA (Bachelor of Computer Applications) from 2022-2025.",
      degree: "Immanuvel is pursuing a BCA (Bachelor of Computer Applications) degree.",
      college: "Immanuvel is studying BCA at college.",

      // Projects
      projects: "Immanuvel has worked on Vehicle Rental System (React, Tailwind CSS, PostgreSQL), Internship Management System (PHP, MySQL), Gym Website (HTML, CSS), and Portfolio Website (HTML, CSS, JavaScript).",
      portfolio: "Immanuvel has built a personal portfolio website showcasing his skills and projects.",

      // Contact
      contact: "You can contact Immanuvel via email at immans358@gmail.com, phone at +91 93632 36043, LinkedIn (linkedin.com/in/immanuvel2004), or GitHub (github.com/IMMANUVEL-WEB).",
      email: "Immanuvel's email is immans358@gmail.com",
      phone: "Immanuvel's phone number is +91 93632 36043",
      linkedin: "Find Immanuvel on LinkedIn: linkedin.com/in/immanuvel2004",
      github: "Check out Immanuvel's GitHub: github.com/IMMANUVEL-WEB",

      // Achievements
      achievements: "Immanuvel won First Prize in College Science Expo (2024), completed Python Full Stack certification from Boscosoft Pvt. Ltd., and completed Frontend Web Development Internship certification from Virtunexa.",
      certifications: "Immanuvel has certifications in Python Full Stack from Boscosoft and Frontend Web Development from Virtunexa.",
      awards: "Immanuvel won First Prize in College Science Expo (2024).",

      // Location
      location: "Immanuvel is based in Tamil Nadu, India, and works remotely for his internship at Virtunexa in Pune, Maharashtra.",
      tamil: "Immanuvel is from Tamil Nadu, India.",
      india: "Immanuvel is based in Tamil Nadu, India.",

      // Default responses
      default: "I'd be happy to tell you about Immanuvel's background! You can ask me about his experience, skills, projects, education, or contact information. What would you like to know?"
    };

    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(responses)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // If no keywords match, return default response
    return responses.default;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Generate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: processMessage(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuestionClick = (question) => {
    // Add user question to messages
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question.question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion(question);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botAnswer = {
        id: Date.now() + 1,
        type: 'bot',
        content: question.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botAnswer]);
      setIsTyping(false);
      setCurrentQuestion(null);
    }, 1500);
  };

  const toggleBot = () => {
    setIsOpen(!isOpen);
  };

  const surfaceClasses = isLight
    ? 'border-light-subtle bg-light-surface text-light-text'
    : 'border-slate-800/80 bg-slate-900/95 text-slate-100';

  const accentClasses = isLight
    ? 'text-light-accent'
    : 'text-cyan-300';

  const buttonClasses = isLight
    ? 'bg-light-accent hover:bg-light-accent-soft text-light-text'
    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950';

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={toggleBot}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-105 ${buttonClasses} ${
          isLight ? 'border-light-surface' : 'border-slate-900'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Imman's Bot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border shadow-2xl ${surfaceClasses}`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b p-4 ${
              isLight ? 'border-light-subtle/40' : 'border-slate-800/60'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${buttonClasses}`}>
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${isLight ? 'text-light-text' : 'text-white'}`}>
                    Imman's Bot
                  </h3>
                  <p className={`text-xs ${accentClasses}`}>Resume Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleBot}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition hover:scale-105 ${
                  isLight ? 'hover:bg-light-background/60' : 'hover:bg-slate-800/60'
                }`}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="max-h-80 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${buttonClasses}`}>
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        message.type === 'user'
                          ? `${buttonClasses} text-right`
                          : `${isLight ? 'bg-light-background/60 text-light-text' : 'bg-slate-800/60 text-slate-100'}`
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.type === 'user' && (
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        isLight ? 'bg-light-background/60 text-light-text' : 'bg-slate-800/60 text-slate-100'
                      }`}>
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${buttonClasses}`}>
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      isLight ? 'bg-light-background/60' : 'bg-slate-800/60'
                    }`}>
                      <div className="flex gap-1">
                        <div className={`h-2 w-2 rounded-full ${accentClasses} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`h-2 w-2 rounded-full ${accentClasses} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`h-2 w-2 rounded-full ${accentClasses} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className={`border-t p-4 ${
              isLight ? 'border-light-subtle/40' : 'border-slate-800/60'
            }`}>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm outline-none transition ${
                    isLight
                      ? 'border border-light-subtle/40 bg-light-background text-light-text focus:border-light-accent placeholder:text-light-subtle/60'
                      : 'border border-slate-700 bg-slate-800/60 text-slate-100 focus:border-cyan-300/80 placeholder:text-slate-400'
                  } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <motion.button
                  type="submit"
                  disabled={isTyping || !userInput.trim()}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    isLight
                      ? 'bg-light-accent text-light-text hover:bg-light-accent-soft'
                      : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                  } ${(isTyping || !userInput.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={!isTyping && userInput.trim() ? { scale: 1.05 } : {}}
                  whileTap={!isTyping && userInput.trim() ? { scale: 0.95 } : {}}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </form>

              {/* Quick Questions */}
              <div className="mt-4">
                <p className={`mb-3 text-xs font-medium uppercase tracking-wider ${
                  isLight ? 'text-light-subtle' : 'text-slate-400'
                }`}>
                  Quick Questions
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {resumeQuestions.slice(0, 5).map((q) => (
                    <motion.button
                      key={q.id}
                      onClick={() => handleQuestionClick(q)}
                      disabled={isTyping}
                      className={`w-full text-left rounded-lg p-2 text-xs transition hover:scale-[1.02] ${
                        isLight
                          ? 'hover:bg-light-background/60 text-light-text'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="line-clamp-1">{q.question}</span>
                        <ChevronRight className={`h-3 w-3 flex-shrink-0 ${accentClasses}`} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImmansBot;
