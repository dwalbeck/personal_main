import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config/env';
import TalkingHead from './TalkingHead';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string, text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [talkingDuration, setTalkingDuration] = useState(0);
  const [showPromptText, setShowPromptText] = useState(true);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Blinking text effect - only when chat is closed
  useEffect(() => {
    if (!isOpen) {
      setShowPromptText(true);
      blinkIntervalRef.current = setInterval(() => {
        setShowPromptText((prev) => !prev);
      }, 5000);
    } else {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
      setShowPromptText(false);
    }

    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setLoading(true);
    setChatLog((prevLog) => [...prevLog, { sender: 'You', text: message }]);

    try {
      const response = await axios.post(`${config.apiUrl}/chat/`, {
        query: message,
      });

      if (response.data.response) {
        setChatLog((prevLog) => [...prevLog, { sender: 'Bot', text: response.data.response }]);

        const duration = response.data.response.length * 50;
        setTalkingDuration(duration);
        setIsTalking(true);
        setTimeout(() => setIsTalking(false), duration);
      }
    } catch (error) {
      setChatLog((prevLog) => [...prevLog, { sender: 'Bot', text: 'Something went wrong. Please try again later.' }]);

      const duration = 2000;
      setTalkingDuration(duration);
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), duration);
    }

    setMessage('');
    setLoading(false);
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex items-center gap-3">
        {/* Blinking prompt text */}
        {showPromptText && (
          <div className="text-purple-600 font-bold text-lg leading-tight text-right">
            Ask me<br />Anything
          </div>
        )}

        {/* Chat button with image */}
        <button
          onClick={toggleChat}
          className="shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none"
        >
          <img src="/chat.png" alt="Chat" className="w-20 h-20" />
        </button>
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-11/12 max-w-lg bg-white rounded-xl shadow-2xl flex flex-col p-4 border border-gray-300 md:max-w-xl lg:max-w-2xl z-50 overflow-visible">
          <TalkingHead isAnimating={isTalking} duration={talkingDuration} />

          {/* Chat Log */}
          <div ref={chatLogRef} className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[60vh] pr-4">
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${
                    msg.sender === 'You'
                      ? 'bg-gray-500 text-white ml-10'
                      : 'bg-gray-100 text-gray-800 mr-10'
                  } p-3 rounded-xl shadow-sm w-auto max-w-xs`}
                >
                  <p className="text-xs md:text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t border-gray-200 pt-2">
            <textarea
              className="flex-1 p-2 border border-gray-300 rounded-2xl text-xs md:text-sm focus:outline-none resize-none"
              rows={2}
              value={message}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              placeholder="Ready to answer your questions..."
            ></textarea>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm focus:outline-none hover:bg-gray-700 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;