import React, { useState } from 'react';
import { Image as ImageIcon, ChevronRight, Wheat, List, TrendingUp, CandlestickChart } from 'lucide-react';
import BitcoinPerpMenu from './BitcoinPerpMenu';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAbout: () => void;
  onNextWallpaper: () => void;
  onViewPortfolio: () => void;
  onFarming: () => void;
  onMuradsList: () => void;
  onOpenPerpMarket: (market: string) => void;
  onBitcoinPerpetuals: () => void;
  onEthereumPerpetuals: () => void;
  onSolanaPerpetuals: () => void;
}

const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({ 
  x, 
  y, 
  onClose, 
  onNextWallpaper,
  onViewPortfolio,
  onFarming,
  onMuradsList,
  onOpenPerpMarket,
  onBitcoinPerpetuals,
  onEthereumPerpetuals,
  onSolanaPerpetuals
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const menuItems = [
    { icon: <ImageIcon size={14} />, label: 'Next Wallpaper', action: onNextWallpaper },
    { 
      icon: <ChevronRight size={14} />, 
      label: 'View', 
      submenu: [
        { icon: <ImageIcon size={14} />, label: 'JPEGs', action: onViewPortfolio },
      ]
    },
    { icon: <Wheat size={14} />, label: 'Farming', action: onFarming },
    { icon: <List size={14} />, label: "Meme List", action: onMuradsList },
  ];

  menuItems.push({
    icon: <img src="https://cloud.artopia.dev/storage/btc.png" alt="Bitcoin" width={14} height={14} />,
    label: "BTC Perpetuals",
    action: onBitcoinPerpetuals
  });

  menuItems.push({
    icon: <img src="https://cloud.artopia.dev/storage/eth.png" alt="Ethereum" width={14} height={14} />,
    label: "ETH Perpetuals",
    action: onEthereumPerpetuals
  });

  menuItems.push({
    icon: <img src="https://cloud.artopia.dev/storage/solana.png" alt="Solana" width={14} height={14} />,
    label: "SOL Perpetuals",
    action: onSolanaPerpetuals
  });

  const perpMarkets = [
    'MOODENG-PERP', 'DBR-PERP', 'WIF-PERP', 'BNB-PERP', 'XRP-PERP',
    'DOGE-PERP', 'TON-PERP', 'AVAX-PERP', 'LINK-PERP', 'SUI-PERP',
    'APT-PERP', 'TAO-PERP', '1MPEPE-PERP', 'OP-PERP', 'RENDER-PERP',
    'INJ-PERP', 'ARB-PERP', 'SEI-PERP', '1MBONK-PERP', 'POPCAT-PERP',
    'TIA-PERP', 'PYTH-PERP', 'JUP-PERP', 'HNT-PERP', 'MATIC-PERP',
    'W-PERP', 'DYM-PERP', 'JTO-PERP', 'IO-PERP', 'RLB-PERP',
    'KMNO-PERP', 'MOTHER-PERP', 'CLOUD-PERP', 'TNSR-PERP', 'ZEX-PERP',
    '1KWEN-PERP'
  ];

  menuItems.push({
    icon: <TrendingUp size={14} />,
    label: 'Perp Markets',
    submenu: perpMarkets.map(market => ({
      icon: (
        <img 
          src="https://cloud.artopia.dev/storage/line-chart-unscreen.gif" 
          alt="Line Chart" 
          width={14} 
          height={14} 
          style={{ display: 'block' }}
        />
      ),
      label: market,
      action: () => onOpenPerpMarket(market)
    }))
  });

  

  return (
    <div
      className="absolute bg-gray-800 shadow-lg rounded-md py-1 z-50 w-48 text-white text-sm"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) => (
        <div 
          key={index} 
          className="relative"
          onMouseEnter={() => setActiveSubmenu(item.label)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <button
            className="w-full text-left px-3 py-1.5 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
            onClick={() => {
              if (item.action) {
                item.action();
                onClose();
              }
            }}
          >
            <span className="flex items-center">
              <span className="mr-2 text-gray-400">{item.icon}</span>
              {item.label}
            </span>
            {item.submenu && <ChevronRight size={14} />}
          </button>
          {item.submenu && activeSubmenu === item.label && (
            <div className="absolute left-full top-0 bg-gray-800 shadow-lg rounded-md py-1 w-48 max-h-80 overflow-y-auto">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-700 transition-colors duration-200 flex items-center"
                  onClick={() => {
                    subItem.action();
                    onClose();
                  }}
                >
                  <span className="mr-2 text-gray-400">{subItem.icon}</span>
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopContextMenu;
