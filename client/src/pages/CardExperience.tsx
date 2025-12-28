import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cardData, type CardPage } from '@/card-data';

/**
 * Card Experience - Botanical Reverie Design
 * 
 * Design Philosophy:
 * - Interactive page-turning experience mimicking opening a real letter
 * - Asymmetrical layout with organic flow
 * - Staggered text reveals for discovery and delight
 * - Botanical decorations frame each page
 * 
 * Features:
 * 1. Multiple card pages with customizable content
 * 2. Smooth page transitions with 3D perspective
 * 3. Mobile-optimized swipe gestures
 * 4. Decorative botanical elements on each page
 * 5. Triple-click to reset countdown
 */

interface CardExperienceProps {
  cards?: CardPage[];
  onClose?: () => void;
  onResetCountdown?: () => void;
}

export default function CardExperience({ cards = cardData, onClose, onResetCountdown }: CardExperienceProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const goToNextPage = () => {
    if (currentPage < cards.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  // Touch/swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextPage();
    }
    if (isRightSwipe) {
      goToPreviousPage();
    }
  };

  // Triple-click on card to reset countdown
  const handleCardClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    if (newCount === 3) {
      setClickCount(0);
      if (onResetCountdown) {
        onResetCountdown();
      }
    } else {
      const timeout = setTimeout(() => {
        setClickCount(0);
      }, 500);
      setClickTimeout(timeout);
    }
  };

  const currentCard = cards[currentPage];
  const progress = ((currentPage + 1) / cards.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/vintage-letter-texture.png)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes pageFlip {
          0% { opacity: 1; transform: rotateY(0deg) scale(1); }
          50% { opacity: 0.5; }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        .page-flip {
          animation: pageFlip 0.4s ease-out;
        }
        
        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .text-reveal {
          animation: textReveal 0.6s ease-out forwards;
        }
        
        .text-reveal-line-1 { animation-delay: 0.1s; }
        .text-reveal-line-2 { animation-delay: 0.3s; }
        .text-reveal-line-3 { animation-delay: 0.5s; }
        
        @keyframes closeButtonHover {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        .close-button-hover:hover {
          animation: closeButtonHover 0.4s ease-in-out;
        }
      `}</style>

      {/* Card container */}
      <div className="w-full max-w-2xl px-4 py-8 flex flex-col items-center">
        {/* Progress indicator */}
        <div className="w-full max-w-md mb-8">
          <div className="h-1 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-amber-700 mt-2 font-lora">
            Page {currentPage + 1} of {cards.length}
          </p>
        </div>

        {/* Card */}
        <div className={`w-full max-w-md ${currentCard.backgroundColor || 'bg-amber-50'} rounded-lg shadow-2xl p-12 min-h-96 relative border-2 border-amber-100 cursor-pointer ${isFlipping ? 'page-flip' : ''}`}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
          onClick={handleCardClick}
        >
          
          {/* Decorative border elements */}
          <div className="absolute top-4 left-4 opacity-20 w-16 h-16 pointer-events-none">
            <img src="/images/botanical-border.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20 w-16 h-16 transform rotate-180 pointer-events-none">
            <img src="/images/botanical-border.png" alt="" className="w-full h-full object-contain" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {currentCard.title && (
              <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-6 text-reveal text-reveal-line-1">
                {currentCard.title}
              </h2>
            )}
            
            {currentCard.image && (
              <div className="mb-6 flex justify-center text-reveal text-reveal-line-2">
                <img src={currentCard.image} alt="" className="w-32 h-32 object-contain" />
              </div>
            )}

            <p className="font-lora text-amber-900 text-lg leading-relaxed text-reveal text-reveal-line-3">
              {currentCard.content}
            </p>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between w-full max-w-md mt-8 gap-4">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 0 || isFlipping}
            variant="outline"
            size="icon"
            className="rounded-full border-amber-200 text-amber-700 hover:bg-amber-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Page indicators */}
          <div className="flex gap-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isFlipping && idx !== currentPage) {
                    setIsFlipping(true);
                    setTimeout(() => {
                      setCurrentPage(idx);
                      setIsFlipping(false);
                    }, 400);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentPage
                    ? 'bg-amber-500 w-6'
                    : 'bg-amber-200 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNextPage}
            disabled={currentPage === cards.length - 1 || isFlipping}
            variant="outline"
            size="icon"
            className="rounded-full border-amber-200 text-amber-700 hover:bg-amber-50 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile hint */}
        <p className="text-center text-xs text-amber-700 mt-6 font-lora">
          Swipe left or right to turn pages
        </p>

        {/* Close button - Aesthetic design */}
        {onClose && (
          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 border-2 border-amber-300 text-amber-700 rounded-full font-lora text-sm hover:bg-amber-50 transition-all close-button-hover"
            title="Close and reseal the card"
          >
            ✕ Close Card
          </button>
        )}
      </div>
    </div>
  );
}
