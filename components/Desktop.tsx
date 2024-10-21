import React, { useState, useRef, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import DesktopContextMenu from './DesktopContextMenu';
import AboutWindow from './AboutWindow';
import { DApp } from '@/types/dapp';
import { desktopApps, AppData } from '@/lib/appData';
import PortfolioMenu from './PortfolioMenu';
import FarmingMenu from './FarmingMenu';
import MuradsList from './MuradsList';
import PerpMarketMenu from './PerpMarketMenu';
import BitcoinPerpMenu from './BitcoinPerpMenu';
import EthereumPerpMenu from './EthereumPerpMenu';
import SolanaPerpMenu from './SolanaPerpMenu';

interface DesktopProps {
  children: React.ReactNode;
  onAppClick: (app: AppData) => void;
  onRefresh: () => void;
  installedDApps: DApp[];
}

const Desktop: React.FC<DesktopProps> = ({ children, onAppClick }) => {
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [showAbout, setShowAbout] = useState(false);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showFarming, setShowFarming] = useState(false);
  const [showMuradsList, setShowMuradsList] = useState(false);
  const [activePerpMarket, setActivePerpMarket] = useState<string | null>(null);
  const [showBitcoinPerpMenu, setShowBitcoinPerpMenu] = useState(false);
  const [showEthereumPerpMenu, setShowEthereumPerpMenu] = useState(false);
  const [showSolanaPerpMenu, setShowSolanaPerpMenu] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const wallpapers = [
    "https://cloud.artopia.dev/storage/wallpapers/21.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/22.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/20.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/18.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/19.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/16.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/17.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/15.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/14.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/13.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/12.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/11.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/9.png",
    "https://cloud.artopia.dev/storage/wallpapers/10.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/8.png",
    "https://cloud.artopia.dev/storage/wallpapers/7.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/6.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/5.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/4.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/3.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/1.jpg",
    "https://cloud.artopia.dev/storage/wallpapers/2.jpg"
    
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const openPerpMarket = (market: string) => {
    setActivePerpMarket(market);
    closeContextMenu();
  };

  const handleDesktopClick = () => {
    setContextMenu({ ...contextMenu, visible: false });
    setSelectedIcons([]);
  };

  const handleIconSelect = (appName: string, selected: boolean) => {
    setSelectedIcons(prev => 
      selected ? [...prev, appName] : prev.filter(name => name !== appName)
    );
  };

  const handleNextWallpaper = () => {
    setCurrentWallpaperIndex((prevIndex) => (prevIndex + 1) % wallpapers.length);
  };

  // Limit the number of displayed apps to 15
  const displayedApps = desktopApps.slice(0, 17);

  // Create two columns: first with 10 icons, second with the remaining (up to 5)
  const firstColumn = displayedApps.slice(0, 10);
  const secondColumn = displayedApps.slice(10);

  const handleClickOutside = (event: MouseEvent) => {
    if (perpMenuRef.current && !perpMenuRef.current.contains(event.target as Node)) {
      setActivePerpMarket(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const perpMenuRef = useRef<HTMLDivElement>(null);

  const handleBitcoinPerpetuals = () => {
    setShowBitcoinPerpMenu(true);
    closeContextMenu();
  };

  const handleEthereumPerpetuals = () => {
    setShowEthereumPerpMenu(true);
    closeContextMenu();
  };

  const handleSolanaPerpetuals = () => {
    setShowSolanaPerpMenu(true);
    closeContextMenu();
  };

  return (
    <div
      ref={desktopRef}
      className="desktop absolute inset-0 overflow-hidden bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${wallpapers[currentWallpaperIndex]})` }}
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      <div className="absolute top-0 right-0 bottom-0 flex justify-end pt-16 pr-4">
        <div className="flex space-x-4">
          {/* Second column (shorter, on the left) */}
          {secondColumn.length > 0 && (
            <div className="flex flex-col items-end">
              {secondColumn.map((app) => (
                <DesktopIcon
                  key={app.name}
                  name={app.name}
                  iconUrl={app.iconUrl}
                  onClick={() => onAppClick(app)}
                  isSelected={selectedIcons.includes(app.name)}
                  onSelect={(selected) => handleIconSelect(app.name, selected)}
                />
              ))}
            </div>
          )}
          {/* First column (longer, on the right) */}
          <div className="flex flex-col items-end">
            {firstColumn.map((app) => (
              <DesktopIcon
                key={app.name}
                name={app.name}
                iconUrl={app.iconUrl}
                onClick={() => onAppClick(app)}
                isSelected={selectedIcons.includes(app.name)}
                onSelect={(selected) => handleIconSelect(app.name, selected)}
              />
            ))}
          </div>
        </div>
      </div>
      {children}
      {contextMenu.visible && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onOpenPerpMarket={openPerpMarket}
          onAbout={() => setShowAbout(true)}
          onNextWallpaper={handleNextWallpaper}
          onViewPortfolio={() => setShowPortfolio(true)}
          onFarming={() => setShowFarming(true)}
          onMuradsList={() => setShowMuradsList(true)}
          onBitcoinPerpetuals={handleBitcoinPerpetuals}
          onEthereumPerpetuals={handleEthereumPerpetuals}
          onSolanaPerpetuals={handleSolanaPerpetuals}
        />
      )}
      {showAbout && (
        <AboutWindow
          onClose={() => setShowAbout(false)}
          isActive={true}
          onFocus={() => {}}
        />
      )}
      <PortfolioMenu isOpen={showPortfolio} onClose={() => setShowPortfolio(false)} />
      <FarmingMenu isOpen={showFarming} onClose={() => setShowFarming(false)} />
      <MuradsList isOpen={showMuradsList} onClose={() => setShowMuradsList(false)} />
      {activePerpMarket && (
        <div ref={perpMenuRef}>
          <PerpMarketMenu
            market={activePerpMarket}
            onClose={() => setActivePerpMarket(null)}
          />
        </div>
      )}
      <BitcoinPerpMenu 
        isOpen={showBitcoinPerpMenu} 
        onClose={() => setShowBitcoinPerpMenu(false)} 
      />
      <EthereumPerpMenu 
        isOpen={showEthereumPerpMenu} 
        onClose={() => setShowEthereumPerpMenu(false)} 
      />
      <SolanaPerpMenu 
        isOpen={showSolanaPerpMenu} 
        onClose={() => setShowSolanaPerpMenu(false)} 
      />
    </div>
  );
};

export default Desktop;
