import React from 'react';

interface PerpMarketMenuProps {
  market: string;
  onClose: () => void;
}

const PerpMarketMenu: React.FC<PerpMarketMenuProps> = ({ market, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-5/6 h-3/4 max-w-6xl max-h-4xl">
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-300"
          onClick={onClose}
        >
          
        </button>
        <div className="w-full h-full flex items-center justify-center">
          <iframe
            src={`https://app.drift.trade/${market}`}
            className="w-full h-full rounded-lg"
            style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '16 / 9' }}
            title={`Drift Trade - ${market}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PerpMarketMenu;
