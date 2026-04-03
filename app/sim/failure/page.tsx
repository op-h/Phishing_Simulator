'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FailureInterventionPage() {
  const [quizState, setQuizState] = useState<'pending' | 'passed' | 'failed'>('pending');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setQuizState('passed');
    } else {
      setQuizState('failed');
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#0b0c10',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: '#1f2833',
        padding: '40px',
        borderRadius: '8px',
        border: '1px solid #ff003c',
        boxShadow: '0 0 20px rgba(255, 0, 60, 0.2)',
        textAlign: 'center'
      }}>
        {quizState !== 'passed' ? (
          <>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
            <h1 style={{ color: '#ff003c', margin: '0 0 10px', fontSize: '28px' }}>
              SECURITY TEST FAILED
            </h1>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#c5c6c7', marginBottom: '20px' }}>
              You have successfully clicked a simulated malicious link and submitted an unsafe form. 
              No passwords were recorded during this test, but you must complete this brief training module.
            </p>

            {/* Video Training Module */}
            <div style={{ 
              backgroundColor: '#000', 
              width: '100%', 
              aspectRatio: '16/9', 
              marginBottom: '20px', 
              borderRadius: '8px', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #45a29e'
            }}>
               <iframe 
                 width="100%" 
                 height="100%" 
                 src="https://www.youtube.com/embed/5aYrtHnJ80U?si=1fKk-2bHqI3K-0J_" 
                 title="Cybersecurity Awareness Training" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
            </div>

            {!showQuiz ? (
              <button 
                onClick={() => setShowQuiz(true)}
                style={{
                  backgroundColor: 'var(--accent-neon, #66fcf1)',
                  color: '#0b0c10',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                I have finished the video
              </button>
            ) : (
              <div style={{ textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 15px', color: 'var(--accent-neon, #66fcf1)' }}>Knowledge Check</h3>
                <p style={{ margin: '0 0 15px' }}>What is the most important step to take when receiving a suspicious email demanding immediate login?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => handleAnswer(false)} style={quizButtonStyle}>Click the link to investigate immediately</button>
                  <button onClick={() => handleAnswer(false)} style={quizButtonStyle}>Forward it to all your colleagues</button>
                  <button onClick={() => handleAnswer(true)} style={quizButtonStyle}>Report it to the IT Security Team and do not click links</button>
                  <button onClick={() => handleAnswer(false)} style={quizButtonStyle}>Enter a fake password to see what happens</button>
                </div>
                {quizState === 'failed' && (
                  <p style={{ color: '#ff003c', marginTop: '15px' }}>Incorrect. Please review the video and try again.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={{ fontSize: '64px', marginBottom: '20px', color: 'var(--success-neon, #00ff88)' }}>✅</div>
            <h1 style={{ color: 'var(--success-neon, #00ff88)', margin: '0 0 20px', fontSize: '28px' }}>
              TRAINING COMPLETED
            </h1>
            <p style={{ fontSize: '18px', color: '#c5c6c7', marginBottom: '30px' }}>
              Thank you for completing the micro-training module. Your alert status has been cleared.
              Remember to stay vigilant and always report suspicious messages.
            </p>
            <Link href="https://google.com" style={{
              display: 'inline-block',
              backgroundColor: 'var(--success-neon, #00ff88)',
              color: '#0b0c10',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              Return to Work
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const quizButtonStyle = {
  backgroundColor: 'transparent',
  color: '#c5c6c7',
  border: '1px solid #45a29e',
  padding: '12px 20px',
  borderRadius: '4px',
  textAlign: 'left' as const,
  cursor: 'pointer',
  fontSize: '15px',
  transition: '0.2s background-color'
};
