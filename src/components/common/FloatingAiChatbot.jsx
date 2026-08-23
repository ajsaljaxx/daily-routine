import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Send, Trash2, Bot, RefreshCw, Settings, Key, Check } from 'lucide-react';

export default function FloatingAiChatbot() {
  const {
    aiChatMessages,
    sendAiMessage,
    isAiTyping,
    clearAiChat,
    isAiChatOpen,
    setIsAiChatOpen,
    userProfile,
    setUserProfile,
    showToast
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [provider, setProvider] = useState(userProfile?.aiProvider || 'gemini');
  const [apiKey, setApiKey] = useState(userProfile?.aiApiKey || '');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiChatOpen) {
      scrollToBottom();
    }
  }, [aiChatMessages, isAiTyping, isAiChatOpen]);

  const handleSaveApiKeys = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      aiProvider: provider,
      aiApiKey: apiKey.trim()
    }));
    setShowConfig(false);
    showToast('AI Chatbot API credentials updated! ⚡', 'success');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiTyping) return;
    const text = inputMessage;
    setInputMessage('');
    sendAiMessage(text);
  };

  if (!isAiChatOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '68px',
        right: '24px',
        width: '380px',
        maxWidth: 'calc(100vw - 32px)',
        height: '520px',
        maxHeight: 'calc(100vh - 90px)',
        zIndex: 9999,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: '20px',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--grad-royal)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bot size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>AURA AI Assistant</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>
              Engine: {userProfile?.aiApiKey ? (userProfile?.aiProvider === 'groq' ? 'Groq Llama-3' : 'Google Gemini AI') : 'Free AURA Gateway'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => setShowConfig(!showConfig)}
            title="Configure AI API & Key"
            style={{
              background: showConfig ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              borderRadius: '50%',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings size={16} />
          </button>
          <button
            onClick={clearAiChat}
            title="Clear Chat History"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              opacity: 0.8,
              padding: '6px'
            }}
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsAiChatOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              opacity: 0.8,
              padding: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Inline API Configuration Panel */}
      {showConfig && (
        <form
          onSubmit={handleSaveApiKeys}
          style={{
            padding: '14px',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Key size={14} color="var(--primary-royal)" />
            <span>AI Provider & API Key Setup</span>
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Select AI Engine:
            </label>
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
            >
              <option value="gemini">🔮 Google Gemini 2.0 (Recommended)</option>
              <option value="groq">⚡ Groq (Llama-3.3 70B Free)</option>
              <option value="openai">🤖 OpenAI (GPT-4o)</option>
              <option value="free">✨ Free Built-in AI Gateway</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              API Key:
            </label>
            <input
              type="password"
              placeholder="Paste Google AI Studio / Groq API Key"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.75rem', gap: '4px' }}
            >
              <Check size={14} />
              <span>Save & Connect</span>
            </button>
          </div>
        </form>
      )}

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            {aiChatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      backgroundColor: isUser ? 'var(--primary-royal)' : 'var(--bg-secondary)',
                      color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                      fontSize: '0.86rem',
                      lineHeight: 1.45,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.engine && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        marginTop: '3px',
                        padding: '0 4px'
                      }}
                    >
                      ⚡ {msg.engine}
                    </span>
                  )}
                </div>
              );
            })}

            {isAiTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: '12px', width: 'fit-content' }}>
                <RefreshCw size={14} className="spin" color="var(--primary-royal)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>AURA is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '10px 12px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask AURA anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isAiTyping}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: inputMessage.trim() ? 'var(--grad-royal)' : 'var(--bg-secondary)',
                color: inputMessage.trim() ? '#FFFFFF' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputMessage.trim() ? 'pointer' : 'default',
                transition: 'all 0.15s ease'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
  );
}
