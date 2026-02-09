
import React from 'react';
import { AppState } from '../types';

interface EnvelopeProps {
  status: AppState;
  onClick: () => void;
  message: string;
}

const Envelope: React.FC<EnvelopeProps> = ({ status, onClick, message }) => {
  const isOpened = status === AppState.OPENED;
  const isOpening = status === AppState.OPENING;

  return (
    <div 
      className={`relative w-72 h-44 sm:w-80 sm:h-48 cursor-pointer transition-all duration-1000 ease-in-out 
        ${isOpened ? 'translate-y-48 sm:translate-y-52 scale-105' : 'floating'}`}
      onClick={status === AppState.CLOSED ? onClick : undefined}
    >
      {/* Shadow */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-pink-200 blur-md rounded-full transition-opacity duration-1000 ${isOpened ? 'opacity-10' : 'opacity-40'}`}></div>

      {/* Tờ giấy bên trong */}
      <div 
        className={`absolute left-3 right-3 bg-white shadow-2xl transition-all duration-1000 ease-in-out z-10 rounded-sm overflow-hidden
          ${isOpened ? '-translate-y-[300px] opacity-100 scale-100' : 'translate-y-0 opacity-0 scale-90'}`}
        style={{ height: '350px' }}
      >
        {/* Container nội dung có thể cuộn nếu text quá dài */}
        <div className="h-full w-full p-5 flex flex-col items-center text-center overflow-y-auto bg-[radial-gradient(#fff1f2_1px,transparent_1px)] [background-size:24px_24px] border border-pink-50">
          {/* Icon trái tim phía trên cùng */}
          <div className="mt-2 mb-4 shrink-0 opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          {/* Lời chúc: Sử dụng mt-auto/mb-auto để căn giữa nếu ngắn, nhưng bắt đầu từ đầu nếu dài */}
          <div className="my-auto w-full">
            <p className="font-handwriting text-xl sm:text-2xl text-pink-600 leading-relaxed drop-shadow-sm px-1 italic">
              "{message}"
            </p>
          </div>

          {/* Ba chấm nhấp nháy phía dưới cùng */}
          <div className="mt-6 mb-2 flex gap-2 shrink-0">
            <div className="w-1.5 h-1.5 bg-pink-200 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-pink-200 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>

      {/* Thân phong bì (Mặt sau) */}
      <div className="absolute inset-0 bg-pink-300 rounded-lg shadow-inner z-0 border-b-2 border-pink-400"></div>

      {/* Nắp trên (Top Flap) */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-pink-400 z-30 transition-all duration-700 ease-in-out origin-top shadow-md
          ${isOpened || isOpening ? 'rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0'}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 60%)' }}
      ></div>

      {/* Nắp dưới và hai bên */}
      <div 
        className="absolute inset-0 bg-pink-200 z-20 shadow-sm"
        style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }}
      ></div>
      <div 
        className="absolute inset-0 bg-pink-100 z-20 opacity-50"
        style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
      ></div>
      
      {/* Tem niêm phong hình trái tim */}
      {!isOpened && !isOpening && (
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-white rounded-full p-2.5 shadow-md hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Envelope;
