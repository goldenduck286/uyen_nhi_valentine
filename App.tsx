
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Envelope from './components/Envelope';
import { AppState } from './types';

const FIXED_MESSAGE = "Cảm ơn em thật nhiều vì đã chọn anh và kiên nhẫn đồng hành cùng anh qua mọi chặng đường. Mong rằng mỗi ngày bên nhau của chúng mình đều sẽ trôi qua thật êm đềm và ngọt ngào. Anh yêu em.";
const MUSIC_URL = `/uyen_nhi_valentine/Cho-Em-Mot-Lan-Yeu-Hoang-Duyen.mp3`;

const HeartParticle: React.FC<{ delay: number; left: string; size: number; duration: number; angle: number }> = ({ delay, left, size, duration, angle }) => (
  <div 
    className="absolute bottom-1/2 left-1/2 text-pink-400 opacity-0 animate-heart-burst pointer-events-none"
    style={{ 
      fontSize: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      zIndex: 5,
      '--angle': `${angle}deg`,
      '--distance': `${150 + Math.random() * 200}px`
    } as React.CSSProperties}
  >
    ❤
  </div>
);

const App: React.FC = () => {
  const [status, setStatus] = useState<AppState>(AppState.CLOSED);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (status === AppState.CLOSED) {
      // Phát nhạc ngay khi click
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play blocked or failed", err));
      }
      
      setStatus(AppState.OPENING);
      setTimeout(() => {
        setStatus(AppState.OPENED);
      }, 700);
    }
  }, [status]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Danh sách tim bay bùng nổ
  const heartBursts = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      delay: Math.random() * 0.4,
      left: '50%',
      size: 12 + Math.random() * 20,
      duration: 2.5 + Math.random() * 2,
      angle: Math.random() * 360
    }));
  }, []);

  // Tim bay nền
  const floatingHearts = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: `float-${i}`,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 12
    }));
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-pink-200">
      {/* Nút điều khiển nhạc */}
      <button 
        onClick={toggleMute}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300 border border-pink-100 ${status === AppState.CLOSED ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label="Toggle Music"
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-pink-500 ${status === AppState.OPENED ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        )}
      </button>

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-pink-200 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-80 h-80 bg-rose-200 rounded-full blur-[100px] opacity-30"></div>
        
        {status === AppState.OPENED && floatingHearts.map(heart => (
          <div 
            key={heart.id}
            className="absolute bottom-[-20px] text-pink-300 opacity-0 animate-float-up"
            style={{ 
              left: heart.left, 
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      <main className="z-10 w-full h-screen flex flex-col items-center justify-center max-w-md mx-auto relative">
        {/* Hiệu ứng Pháo hoa trái tim */}
        {status === AppState.OPENED && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {heartBursts.map(heart => (
              <HeartParticle key={heart.id} {...heart} />
            ))}
          </div>
        )}

        <div className={`w-full flex flex-col items-center transition-all duration-1000 ease-in-out`}>
          
          {status === AppState.CLOSED && (
            <div className="absolute top-20 text-center animate-fade-in w-full px-4">
              <h1 className="text-pink-400 text-2xl font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-sm">
                Hồ Châu Uyển Nhi
              </h1>
              <div className="w-16 h-[1px] bg-pink-200 mx-auto mb-4"></div>
              <p className="text-pink-300 text-sm font-medium animate-pulse italic">
                - Chạm vào bức thư để mở -
              </p>
            </div>
          )}

          <div className="flex items-center justify-center w-full relative">
            <Envelope status={status} onClick={handleOpen} message={FIXED_MESSAGE} />
          </div>

          {status === AppState.OPENED && (
            <div className="absolute bottom-10 animate-fade-in flex flex-col items-center w-full px-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-pink-200"></div>
                <p className="text-pink-400 text-xs uppercase tracking-[0.4em] font-bold drop-shadow-sm">
                  Forever Yours
                </p>
                <div className="h-[1px] w-12 bg-pink-200"></div>
              </div>
              <p className="mt-3 text-pink-300 text-[10px] italic opacity-80">
                Gửi đến em ngàn lời yêu thương...
              </p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartBurst {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 1; 
          }
          100% { 
            transform: translate(calc(-50% + cos(var(--angle)) * var(--distance)), calc(-50% + sin(var(--angle)) * var(--distance))) scale(1); 
            opacity: 0; 
          }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-float-up {
          animation: floatUp 8s linear infinite;
        }
        .animate-heart-burst {
          animation: heartBurst 2.5s ease-out forwards;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
      `}</style>
    </div>
  );
};

export default App;
