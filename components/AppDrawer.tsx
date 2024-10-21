"use client";

import React from 'react';
import { X } from 'lucide-react';
import { desktopApps, AppData } from '@/lib/appData';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (appName: string) => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ isOpen, onClose, onAppClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-[90%] h-[90%] overflow-y-auto relative text-white border border-white/20 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <img 
              src="https://cloud.artopia.dev/storage/x-unscreen.gif" 
              alt="Wallet" 
              width={17} 
              height={17} 
            />
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {desktopApps.map((app: AppData) => (
            <div
              key={app.name}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white/10 cursor-pointer transition-all transform hover:scale-50"
              onClick={() => {
                onAppClick(app.name);
                onClose();
              }}
            >
              <img src={app.iconUrl} alt={app.name} className="w-10 h-10 mb-1" />
              <span className="text-sm text-center font-medium">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDrawer;