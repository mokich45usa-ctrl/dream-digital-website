import React, { useState, useEffect } from 'react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsCorrect(false);
    onVerify(false);
  };

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value);
    const correctAnswer = num1 + num2;
    const isValid = parseInt(value) === correctAnswer;
    setIsCorrect(isValid);
    onVerify(isValid);
  };

  return (
    <div style={{
      border: '2px solid #00FFFF',
      backgroundColor: '#000000',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <span style={{
          color: '#00FFFF',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>
          🤖 Anti-Bot Protection:
        </span>
        <span style={{
          color: '#FFFFFF',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          {num1} + {num2} = ?
        </span>
      </div>
      
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => handleAnswerChange(e.target.value)}
        placeholder="Enter answer"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#111111',
          border: isCorrect ? '2px solid #00FF00' : '2px solid #FF0033',
          borderRadius: '5px',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}
      />
      
      {userAnswer && (
        <div style={{
          marginTop: '10px',
          fontSize: '12px',
          fontFamily: 'monospace',
          color: isCorrect ? '#00FF00' : '#FF0033'
        }}>
          {isCorrect ? '✅ Correct! You can submit the form.' : '❌ Wrong answer. Try again.'}
        </div>
      )}
      
      <button
        type="button"
        onClick={generateNewQuestion}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: 'transparent',
          border: '1px solid #00FFFF',
          color: '#00FFFF',
          borderRadius: '3px',
          fontSize: '12px',
          fontFamily: 'monospace',
          cursor: 'pointer'
        }}
      >
        🔄 New Question
      </button>
    </div>
  );
}
