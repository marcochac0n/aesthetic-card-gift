import { useState, useEffect } from 'react';
import CountdownPage from './CountdownPage';
import CardExperience from './CardExperience';

/**
 * Home Page - Main entry point
 * 
 * Manages the state between countdown and card experience.
 * The card unlocks when:
 * 1. The countdown reaches zero (11:00 PM Dec 31, 2025 Mexico City time)
 * 2. The user enters a bypass code (bee, iris, dance)
 * 3. The card is manually opened after unlock
 */

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);

  // Check if countdown has passed on mount
  useEffect(() => {
    const checkCountdown = () => {
      const targetDate = new Date('2025-12-31T23:00:00').getTime();
      const mexicoCityOffset = -6 * 60 * 60 * 1000;
      const now = Date.now();
      const adjustedTarget = targetDate + mexicoCityOffset;

      if (now >= adjustedTarget) {
        setIsUnlocked(true);
      }
    };

    checkCountdown();
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleOpenCard = () => {
    setCardOpened(true);
  };

  const handleCloseCard = () => {
    setCardOpened(false);
  };

  if (!isUnlocked) {
    return <CountdownPage onUnlock={handleUnlock} />;
  }

  if (!cardOpened) {
    // Show the sealed card state - user must click to open
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/vintage-letter-texture.png)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}>
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 20px 60px rgba(217, 119, 6, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5); }
            50% { box-shadow: 0 20px 60px rgba(217, 119, 6, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5); }
          }
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
        `}</style>

        <div className="w-full max-w-md px-4">
          <div className="bg-card text-card-foreground rounded-lg shadow-2xl p-12 relative z-10 border-2 border-amber-100 pulse-glow"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            }}>
            
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-amber-900 mb-2">
                Your Card is Ready
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 mx-auto rounded-full" />
            </div>

            <div className="flex justify-center mb-8">
              <img
                src="/images/antique-wax-seal.png"
                alt="Sealed card"
                className="w-32 h-32 object-contain drop-shadow-lg"
              />
            </div>

            <div className="text-center mb-8">
              <p className="font-lora text-amber-800 text-sm leading-relaxed mb-4">
                The moment has arrived. Your gift is waiting inside.
              </p>
              <p className="font-cormorant text-xs tracking-widest text-amber-700 uppercase">
                Click to open
              </p>
            </div>

            <button
              onClick={handleOpenCard}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-900 font-playfair font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Open Card
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <CardExperience onClose={handleCloseCard} />;
}
