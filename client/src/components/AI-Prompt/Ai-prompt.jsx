import { useState, useRef, useEffect } from 'react';
import './AIPromptBar.css';

const AIPromptBar = () => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const promptRef = useRef(null);

  // Sample predefined questions related to fitness and nutrition
  const predefinedQuestions = [
    "What's a good post-workout meal?",
    "How can I build muscle effectively?",
    "What are some healthy breakfast options?",
    "How many calories should I eat to lose weight?",
    "What's the best workout for beginners?",
    "How important is protein intake for muscle growth?",
    "Can you suggest a vegetarian meal plan?",
    "What are some good pre-workout snacks?"
  ];

  // Mock AI response function (replace with actual API call)
  const getAIResponse = async (question) => {
    setIsLoading(true);
    setResponse('');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on common questions
    const mockResponses = {
      "What's a good post-workout meal?": "A good post-workout meal should include protein and carbs. Try grilled chicken with sweet potatoes and steamed vegetables, or a protein smoothie with banana, Greek yogurt, and almond butter.",
      "How can I build muscle effectively?": "To build muscle effectively: 1) Follow a progressive resistance training program 2) Consume 1.6-2.2g of protein per kg of body weight daily 3) Get adequate sleep (7-9 hours) 4) Maintain a slight calorie surplus 5) Allow proper recovery between workouts.",
      "How many calories should I eat to lose weight?": "To lose weight safely, aim for a 300-500 calorie deficit per day. First calculate your TDEE (Total Daily Energy Expenditure), then subtract the deficit. A good starting point is usually 1,500-1,800 calories for women and 1,800-2,200 for men, but this varies based on activity level and current weight."
    };
    
    // Return specific response if we have one, otherwise generic
    const response = mockResponses[question] || 
      `As FitNurish's AI assistant, I recommend ${question.includes('meal') ? 'focusing on balanced macros with lean proteins, complex carbs, and healthy fats' : 
      question.includes('workout') ? 'following a progressive training program tailored to your fitness level' : 
      'consulting with one of our nutrition experts for personalized advice'}. Would you like more specific recommendations?`;
    
    setResponse(response);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      getAIResponse(prompt);
      setPrompt('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
    promptRef.current.focus();
  };

  useEffect(() => {
    if (prompt.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [prompt]);

  return (
    <div className={`ai-prompt-container ${isExpanded ? 'expanded' : ''}`}>
      {isExpanded && (
        <div className="ai-response">
          {isLoading ? (
            <div className="loading">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p>FitNurish AI is thinking...</p>
            </div>
          ) : (
            response && <p>{response}</p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="ai-prompt-bar">
        <div className="input-container">
          <input
            ref={promptRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask FitNurish AI about fitness or nutrition..."
            onFocus={() => setIsExpanded(true)}
          />
          {showSuggestions && (
            <div className="suggestions">
              {predefinedQuestions
                .filter(q => q.toLowerCase().includes(prompt.toLowerCase()))
                .slice(0, 5)
                .map((question, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(question)}
                  >
                    {question}
                  </div>
                ))}
            </div>
          )}
        </div>
        <button type="submit" className="ai-prompt-submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
      
      <button 
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '×' : 'Ask FitNurish AI'}
      </button>
    </div>
  );
};

export default AIPromptBar;