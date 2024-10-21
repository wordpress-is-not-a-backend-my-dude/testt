import React from 'react';
import TopMemeCoins from './TopMemeCoins';

interface MuradsListProps {
  isOpen: boolean;
  onClose: () => void;
}

const MuradsList: React.FC<MuradsListProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="w-[90%] h-[90%] bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            Meme List
          </h3>
          <div className="flex-grow overflow-hidden rounded-lg">
            <TopMemeCoins />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuradsList;