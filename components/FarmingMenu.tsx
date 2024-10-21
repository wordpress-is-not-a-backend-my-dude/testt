import React from 'react';

interface FarmingMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FarmingMenu: React.FC<FarmingMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="w-[80%] h-[80%] bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <img src="https://cloud.artopia.dev/storage/airdrops.png" alt="Farming" width={45} height={45} />
            &nbsp;Farming
          </h3>
          <div className="flex-grow overflow-hidden rounded-lg">
            <iframe
              src="https://airdrops.io"
              className="w-full h-full rounded-lg"
              style={{ border: 'none', padding: '4px' }}
              title="Farming"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingMenu;