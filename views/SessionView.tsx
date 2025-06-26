
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, ChatMode, Theme, Language, UIStrings } from '../types';
// Removed getAiChatResponse from here, will be passed as prop
import MessageBubble from '../components/MessageBubble';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorDisplay from '../components/ErrorDisplay';
import MicrophoneIcon from '../components/MicrophoneIcon';
import SendIcon from '../components/SendIcon';
import VolumeOnIcon from '../components/VolumeOnIcon';
import VolumeOffIcon from '../components/VolumeOffIcon';

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

interface SessionViewProps {
  initialMessages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onResetSession: () => void;
  theme: Theme;
  language: Language;
  currentStrings: UIStrings;
  getAiResponse: (userMessage: string, currentHistory: ChatMessage[], lang: Language) => Promise<string>;
}

const SessionView: React.FC<SessionViewProps> = ({ 
  initialMessages, setMessages, onResetSession, theme, language, currentStrings, getAiResponse 
}) => {
  const messages = initialMessages;

  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.TEXT);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [aiVoiceEnabled, setAiVoiceEnabled] = useState<boolean>(true);
  
  const speechRecognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speechLang = language === 'cze' ? 'cs-CZ' : 'en-US';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const speakText = useCallback((text: string) => {
    if (!aiVoiceEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLang;
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang === speechLang);
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis error:", e);
      setError(currentStrings.errorSpeechSynthesis as string);
    }
  }, [aiVoiceEnabled, speechLang, currentStrings]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() && !isRecording) return; 

    const userMessageText = text.trim();
    if (!userMessageText) return;

    const newUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponseText = await getAiResponse(userMessageText, messages, language); // Pass language
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      if (chatMode === ChatMode.VOICE || aiVoiceEnabled) {
        speakText(aiResponseText);
      }
    } catch (e: any) {
      console.error("Error processing message:", e);
      const errorMessageText = e.message || (currentStrings.errorAiResponse as string);
      let displayError = errorMessageText;
      if (errorMessageText.includes('API_KEY')) {
        displayError = currentStrings.errorApiKeyMissing as string;
      }
      setError(displayError);
       setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: `${currentStrings.appName}: ${displayError}`,
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isRecording, messages, chatMode, speakText, aiVoiceEnabled, setMessages, getAiResponse, language, currentStrings]);


  useEffect(() => {
    if (chatMode === ChatMode.VOICE) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        setError(currentStrings.errorSpeechRecognitionNotSupported as string);
        setChatMode(ChatMode.TEXT); 
        return;
      }
      speechRecognitionRef.current = new SpeechRecognitionAPI();
      speechRecognitionRef.current.continuous = false; // Stop after first final result
      speechRecognitionRef.current.interimResults = true;
      speechRecognitionRef.current.lang = speechLang;

      speechRecognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInputValue(finalTranscript || interimTranscript); // Show interim results for responsiveness
        if (finalTranscript) { // If we have a final transcript, stop recording and send
           // This logic might need adjustment if continuous mode is desired or if send is manual
        }
      };

      speechRecognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        let detailKey = 'errorSpeechGeneric';
        if (event.error === 'no-speech') detailKey = 'errorSpeechNoSpeech';
        if (event.error === 'audio-capture') detailKey = 'errorSpeechAudioCapture';
        if (event.error === 'not-allowed') detailKey = 'errorSpeechNotAllowed';
        
        setError((currentStrings[detailKey] as string).replace('{detail}', event.error));
        setIsRecording(false);
      };
      
      speechRecognitionRef.current.onend = () => {
         // This onend can be triggered by .stop() or naturally.
         // We only want to auto-send if it was a natural end with inputValue or if stopped by toggle
         const wasActuallyRecording = isRecording; // Capture state before setIsRecording
         setIsRecording(false);
         if (wasActuallyRecording && inputValue.trim()) {
            handleSendMessage(inputValue);
         }
      };

    } else { // Text mode or speech not available
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsRecording(false);
    }
    // Cleanup
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
        speechRecognitionRef.current.onresult = null;
        speechRecognitionRef.current.onerror = null;
        speechRecognitionRef.current.onend = null;
        speechRecognitionRef.current = null; // Important to release resources
      }
      window.speechSynthesis?.cancel(); // Stop any speaking on component unmount/mode change
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMode, speechLang, currentStrings]); // Removed isRecording, inputValue, handleSendMessage to avoid re-creating recognition instance too often. Control flow within toggleRecording/onend instead.


  const toggleRecording = () => {
    if (chatMode !== ChatMode.VOICE || !speechRecognitionRef.current) {
        if (chatMode === ChatMode.VOICE && !(window.SpeechRecognition || window.webkitSpeechRecognition)) {
             setError(currentStrings.errorSpeechRecognitionNotSupported as string);
        } else if (chatMode === ChatMode.VOICE && !speechRecognitionRef.current) {
            // This case should ideally not be hit if useEffect for chatMode works correctly.
            // But as a fallback:
            console.warn("Speech recognition not initialized. Attempting to re-init via chatMode effect.");
            setChatMode(ChatMode.TEXT); // Toggle to text
            setTimeout(() => setChatMode(ChatMode.VOICE), 50); // then back to voice to re-trigger useEffect
            return;
        }
        return;
    }

    if (isRecording) {
      speechRecognitionRef.current.stop(); // onend will handle setIsRecording(false) and send message if inputValue exists
    } else {
      try {
        setInputValue(''); 
        setError(null);
        speechRecognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Error starting speech recognition:", e);
        setError(currentStrings.errorMicStart as string);
        setIsRecording(false);
      }
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (chatMode === ChatMode.TEXT && inputValue.trim()) {
      handleSendMessage(inputValue);
    } else if (chatMode === ChatMode.VOICE) {
      if (isRecording) { // If recording, stop it; onend will handle the send
        speechRecognitionRef.current?.stop();
      } else if (inputValue.trim()){ // If not recording but input has text (e.g. from partial speech or typed)
        handleSendMessage(inputValue);
      }
    }
  };

  const containerBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const inputBg = theme === 'dark' ? 'bg-sky-800' : 'bg-slate-100';
  const inputTextClass = theme === 'dark' ? 'text-sky-100' : 'text-slate-800'; // Renamed to avoid conflict
  const placeholderTextClass = theme === 'dark' ? 'placeholder-sky-400' : 'placeholder-slate-500'; // Renamed
  const buttonTextColor = theme === 'dark' ? 'text-sky-300 hover:text-sky-100' : 'text-slate-500 hover:text-slate-700';
  const modeButtonActiveBg = theme === 'dark' ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white';
  const modeButtonInactiveBg = theme === 'dark' ? 'bg-sky-700 hover:bg-sky-600 text-sky-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-600';

  return (
    <div className={`flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] ${containerBg} shadow-xl rounded-xl p-4 md:p-6`}>
      <header className="mb-4 pb-3 border-b flex justify-between items-center"
        style={{ borderColor: theme === 'dark' ? 'var(--border-dark)' : 'var(--border-light)' }}
      >
        <h2 className={`text-xl font-semibold font-outfit ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
          {currentStrings.sessionTitle as string}
        </h2>
        <button
            onClick={onResetSession}
            className={`px-4 py-2 text-sm rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-400' : 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300'} font-inter`}
            title={currentStrings.newSessionButton as string}
          >
            {currentStrings.newSessionButton as string}
        </button>
      </header>

      <div className={`flex-grow overflow-y-auto mb-4 pr-2 chat-area ${theme === 'dark' ? 'dark-mode' : ''} bg-opacity-50 p-2 rounded-lg scroll-smooth`}
           style={{ backgroundColor: theme === 'dark' ? 'rgba(8, 47, 73, 0.5)' : 'rgba(240, 249, 255, 0.5)' }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} theme={theme} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4 ml-1">
             <div className={`px-4 py-3 shadow-md rounded-r-xl rounded-tl-xl ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-emerald-100 text-emerald-800'}`}>
              <LoadingIndicator theme={theme}/>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <ErrorDisplay message={`${currentStrings.errorPrefix}${error}`} theme={theme} />}


      <div className={`mb-3 flex items-center justify-between gap-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-sky-800' : 'bg-slate-100'}`}>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>{currentStrings.chatModeLabel as string}</span>
          <button
            onClick={() => { setChatMode(ChatMode.TEXT); setIsRecording(false); window.speechSynthesis?.cancel(); speechRecognitionRef.current?.stop(); }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${chatMode === ChatMode.TEXT ? modeButtonActiveBg : modeButtonInactiveBg} font-inter`}
          >
            {currentStrings.chatModeText as string}
          </button>
          <button
            onClick={() => { setChatMode(ChatMode.VOICE); }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${chatMode === ChatMode.VOICE ? modeButtonActiveBg : modeButtonInactiveBg} font-inter`}
          >
            {currentStrings.chatModeVoice as string}
          </button>
        </div>
        <button
          onClick={() => {
            setAiVoiceEnabled(prev => {
              const newVoiceState = !prev;
              if (!newVoiceState) { window.speechSynthesis?.cancel(); }
              return newVoiceState;
            });
          }}
          title={aiVoiceEnabled ? currentStrings.voiceToggleMute as string : currentStrings.voiceToggleUnmute as string}
          className={`p-2 rounded-full transition-colors duration-150 ${buttonTextColor} hover:bg-opacity-20 ${theme === 'dark' ? 'hover:bg-sky-600' : 'hover:bg-slate-300'}`}
        >
          {aiVoiceEnabled ? <VolumeOnIcon className="w-5 h-5" /> : <VolumeOffIcon className="w-5 h-5" />}
        </button>
      </div>
      
      <form onSubmit={handleFormSubmit} className={`flex items-center gap-2 p-3 rounded-lg shadow-md ${theme === 'dark' ? 'bg-sky-800' : 'bg-slate-100'}`}>
        {chatMode === ChatMode.VOICE && (
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${isRecording 
                            ? `bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 focus:ring-offset-${theme === 'dark' ? 'sky-800' : 'slate-100'} animate-pulse ring-4 ring-red-300 ring-opacity-50` 
                            : `${theme === 'dark' ? 'bg-teal-600 hover:bg-teal-500' : 'bg-teal-500 hover:bg-teal-600'} text-white focus:ring-teal-400 focus:ring-offset-${theme === 'dark' ? 'sky-800' : 'slate-100'}`}`}
            title={isRecording ? currentStrings.micStop as string : currentStrings.micRecord as string}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            chatMode === ChatMode.VOICE 
              ? (isRecording ? currentStrings.micPlaceholderListening as string : currentStrings.micPlaceholderDefaultVoice as string) 
              : currentStrings.textPlaceholder as string
          }
          className={`flex-grow p-3 ${inputBg} ${inputTextClass} ${placeholderTextClass} rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-sky-500' : 'focus:ring-sky-400'} transition-colors duration-150 font-inter`}
          disabled={(chatMode === ChatMode.VOICE && isRecording) || isLoading}
          aria-label="Vstup pro zprávu"
        />
        <button
          type="submit"
          className={`p-3 rounded-full transition-colors duration-150 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      ${theme === 'dark' 
                        ? 'bg-sky-600 hover:bg-sky-500 text-white focus:ring-sky-400 focus:ring-offset-sky-800 disabled:bg-sky-700' 
                        : 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-300 focus:ring-offset-slate-100 disabled:bg-sky-300'}`}
          disabled={isLoading || (!inputValue.trim() && !isRecording)}
          title={currentStrings.sendMessageButton as string}
          aria-label={currentStrings.sendMessageButton as string}
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default SessionView;
