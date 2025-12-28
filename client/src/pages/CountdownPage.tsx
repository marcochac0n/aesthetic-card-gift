import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/assets';

/**
 * Countdown Page - Botanical Reverie Design
 * 
 * Design Philosophy:
 * - Romantic naturalism with organic, flowing forms
 * - Sealed wax card as the central visual metaphor
 * - Asymmetrical composition with generous whitespace
 * - Handcrafted, warm aesthetic
 * 
 * Key Elements:
 * 1. Sealed card with wax seal animation (dripping effect)
 * 2. Countdown timer with elegant typography
 * 3. Bypass mechanism (hidden but discoverable)
 * 4. Botanical imagery (bee, iris, flowers)
 */

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage({ onUnlock }: { onUnlock: () => void }) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showBypass, setShowBypass] = useState(false);
  const [bypassCode, setBypassCode] = useState('');
  const [bypassAttempts, setBypassAttempts] = useState(0);

  useEffect(() => {
    const calculateCountdown = () => {
      // Target: 11:00 PM December 31, 2025 Mexico City time (CST-6)
      const targetDate = new Date('2025-12-31T23:00:00').getTime();
      // Adjust for Mexico City timezone (CST-6 = UTC-6)
      const mexicoCityOffset = -6 * 60 * 60 * 1000;
      const now = Date.now();
      const adjustedTarget = targetDate + mexicoCityOffset;

      const difference = adjustedTarget - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        onUnlock();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [onUnlock]);

  const handleBypassAttempt = () => {
    // Simple bypass: "bee" or "iris" or "dance"
    if (
      bypassCode.toLowerCase() === 'bee' ||
      bypassCode.toLowerCase() === 'iris' ||
      bypassCode.toLowerCase() === 'dance'
    ) {
      setIsUnlocked(true);
      onUnlock();
    } else {
      setBypassAttempts(bypassAttempts + 1);
      setBypassCode('');
      if (bypassAttempts >= 2) {
        setShowBypass(false);
      }
    }
  };

  // Easter egg: triple-click on wax seal to reveal bypass
  const handleSealClick = (e: React.MouseEvent) => {
    if (e.detail === 3) {
      setShowBypass(true);
      setBypassAttempts(0);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      backgroundImage: `url(${getAssetPath('images/vintage-letter-texture.png')})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }}>
      <style>{`
        @keyframes drip {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(40px); }
        }
        .drip-particle {
          animation: drip 2s ease-in infinite;
        }
        .drip-1 { animation-delay: 0s; left: 30%; }
        .drip-2 { animation-delay: 0.4s; left: 50%; }
        .drip-3 { animation-delay: 0.8s; left: 70%; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-element {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative botanical elements */}
      <div className="absolute top-10 left-5 opacity-30 w-24 h-24 pointer-events-none float-element">
        <img src={getAssetPath('images/bee-watercolor.png')} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-25 w-32 h-32 pointer-events-none">
        <img src={getAssetPath('images/iris-botanical.png')} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Main card container - asymmetrical positioning */}
      <div className="relative w-full max-w-md px-4">
        {/* Sealed card */}
        <div className="relative">
          {/* Card body */}
          <div className="bg-card text-card-foreground rounded-lg shadow-2xl p-12 relative z-10 border-2 border-amber-100"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            }}>
            
            {/* Decorative header */}
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl font-bold text-amber-900 mb-2">
                A Gift for You
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 mx-auto rounded-full" />
            </div>

            {/* Countdown display */}
            <div className="text-center mb-8">
              <p className="font-cormorant text-sm tracking-widest text-amber-700 mb-6 uppercase">
                This card will open
              </p>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-amber-50 rounded-md p-3 border border-amber-200">
                  <div className="font-playfair text-2xl font-bold text-amber-900">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-amber-700 font-lora">Days</div>
                </div>
                <div className="bg-amber-50 rounded-md p-3 border border-amber-200">
                  <div className="font-playfair text-2xl font-bold text-amber-900">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-amber-700 font-lora">Hours</div>
                </div>
                <div className="bg-amber-50 rounded-md p-3 border border-amber-200">
                  <div className="font-playfair text-2xl font-bold text-amber-900">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-amber-700 font-lora">Mins</div>
                </div>
                <div className="bg-amber-50 rounded-md p-3 border border-amber-200">
                  <div className="font-playfair text-2xl font-bold text-amber-900">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-amber-700 font-lora">Secs</div>
                </div>
              </div>

              <p className="font-lora text-sm text-amber-800 italic">
                December 31, 2025 at 11:00 PM<br />
                <span className="text-xs text-amber-700">(Mexico City Time)</span>
              </p>
            </div>

            {/* Wax seal - clickable for bypass Easter egg */}
            <div className="flex justify-center mb-8">
              <div
                onClick={handleSealClick}
                className="relative cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
                style={{ perspective: '1000px' }}
              >
                <img
                  src={getAssetPath('images/antique-wax-seal.png')}
                  alt="Sealed with wax"
                  className="w-32 h-32 object-contain drop-shadow-lg"
                />
                {/* Animated drip effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="drip-particle drip-1 absolute w-2 h-2 bg-red-600 rounded-full opacity-60" />
                  <div className="drip-particle drip-2 absolute w-2 h-2 bg-red-600 rounded-full opacity-60" />
                  <div className="drip-particle drip-3 absolute w-2 h-2 bg-red-600 rounded-full opacity-60" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <p className="font-lora text-amber-800 text-sm leading-relaxed">
                This card is sealed and will open when the time arrives.<br />
                <span className="text-xs text-amber-700 italic">Handle with care.</span>
              </p>
            </div>
          </div>

          {/* Bypass input - hidden until Easter egg triggered */}
          {showBypass && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-20 backdrop-blur-sm">
              <div className="bg-card p-6 rounded-lg text-center">
                <p className="font-lora text-sm text-card-foreground mb-4">
                  What's the magic word?
                </p>
                <input
                  type="text"
                  value={bypassCode}
                  onChange={(e) => setBypassCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBypassAttempt()}
                  placeholder="Enter word..."
                  className="w-full px-3 py-2 border border-amber-200 rounded-md bg-amber-50 text-card-foreground placeholder-amber-400 text-center mb-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleBypassAttempt}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Try
                  </Button>
                  <Button
                    onClick={() => setShowBypass(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
                {bypassAttempts > 0 && (
                  <p className="text-xs text-amber-700 mt-3">
                    {3 - bypassAttempts} attempts remaining
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
