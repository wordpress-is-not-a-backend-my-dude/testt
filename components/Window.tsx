"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';

interface WindowProps {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  isActive: boolean;
  onFocus: () => void;
  iframeUrl?: string;
  iconUrl: string;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, isActive, onFocus, iframeUrl, iconUrl }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [prevState, setPrevState] = useState({ position: { x: 100, y: 100 }, size: { width: 800, height: 600 } });
  const [showSplash, setShowSplash] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0 });
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (iframeUrl) {
      const timer = setTimeout(() => setShowSplash(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [iframeUrl]);

  const toggleMaximize = useCallback(() => {
    if (!isMaximized) {
      setPrevState({ position: { ...position }, size: { ...size } });
      setPosition({ x: 0, y: 24 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 24 });
    } else {
      setPosition(prevState.position);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  }, [isMaximized, position, size, prevState]);

  const updatePosition = useCallback((x: number, y: number) => {
    setPosition({
      x: Math.max(0, x),
      y: Math.max(24, y),
    });
  }, []);

  const updateSize = useCallback((width: number, height: number) => {
    setSize({
      width: Math.max(300, Math.min(width, window.innerWidth - position.x)),
      height: Math.max(200, Math.min(height, window.innerHeight - position.y)),
    });
  }, [position.x, position.y]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX - position.x, startY: e.clientY - position.y };

    const handleDrag = (e: MouseEvent) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        updatePosition(e.clientX - dragRef.current.startX, e.clientY - dragRef.current.startY);
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, [isMaximized, position.x, position.y, updatePosition]);

  const handleResizeStart = useCallback((direction: string) => (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };

    const handleResize = (e: MouseEvent) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        let newWidth = resizeRef.current.startWidth;
        let newHeight = resizeRef.current.startHeight;
        let newX = position.x;
        let newY = position.y;

        if (direction.includes('e')) newWidth = resizeRef.current.startWidth + (e.clientX - resizeRef.current.startX);
        if (direction.includes('s')) newHeight = resizeRef.current.startHeight + (e.clientY - resizeRef.current.startY);
        if (direction.includes('w')) {
          const deltaX = e.clientX - resizeRef.current.startX;
          newWidth = resizeRef.current.startWidth - deltaX;
          newX = position.x + deltaX;
        }
        if (direction.includes('n')) {
          const deltaY = e.clientY - resizeRef.current.startY;
          newHeight = resizeRef.current.startHeight - deltaY;
          newY = position.y + deltaY;
        }

        updateSize(newWidth, newHeight);
        updatePosition(newX, newY);
      });
    };

    const handleResizeEnd = () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [isMaximized, position.x, position.y, size.width, size.height, updateSize, updatePosition]);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  const debouncedSetPosition = useMemo(
    () => debounce(setPosition, 16),
    [setPosition]
  );

  const debouncedSetSize = useMemo(
    () => debounce(setSize, 16),
    [setSize]
  );

  return (
    <motion.div
      ref={windowRef}
      className={`window absolute rounded-lg overflow-hidden ${
        isActive ? 'z-10' : 'z-0'
      } bg-gray-100 shadow-lg`}
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onFocus}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Window controls */}
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-2 bg-transparent cursor-move"
          onMouseDown={handleDragStart}
        >
          <button
            onClick={handleRefresh}
          >
           <img 
              src="https://cloud.artopia.dev/storage/refresh.gif" 
              alt="refresh" 
              width={14} 
              height={14} 
            />
          </button>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700 drop-shadow-md">
            {title}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleMaximize}
            >
               <img 
              src="https://cloud.artopia.dev/storage/maximize.png" 
              alt="Wallet" 
              width={14} 
              height={14} 
            />
            </button>
            <button
              onClick={onClose}
            >
               <img 
              src="https://cloud.artopia.dev/storage/close.png" 
              alt="close" 
              width={14} 
              height={14} 
            />
            </button>
            &nbsp;
            &nbsp;
            
          </div>
        </div>
        
        {/* Content area with top padding */}
        <div className="flex-grow pt-8">
          {iframeUrl ? (
            <>
              <iframe 
                ref={iframeRef}
                src={iframeUrl} 
                className="w-full h-full border-none" 
                title={title} 
                style={{ display: showSplash ? 'none' : 'block' }}
              />
              {showSplash && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <img 
                    src={iconUrl} 
                    alt={`${title} Icon`} 
                    width={65} 
                    height={65}
                    className="object-contain"
                  />
                </div>
              )}
            </>
          ) : (
            children
          )}
        </div>
        
        {/* Resize handles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-1 cursor-nwse-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('nw')} />
          <div className="absolute top-0 right-0 w-4 h-1 cursor-nesw-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('ne')} />
          <div className="absolute bottom-0 left-0 w-4 h-1 cursor-nesw-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('sw')} />
          <div className="absolute bottom-0 right-0 w-4 h-1 cursor-nwse-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('se')} />
          <div className="absolute top-0 left-4 right-4 h-1 cursor-ns-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('n')} />
          <div className="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('s')} />
          <div className="absolute left-0 top-4 bottom-4 w-4 cursor-ew-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('w')} />
          <div className="absolute right-0 top-4 bottom-4 w-4 cursor-ew-resize bg-transparent pointer-events-auto" onMouseDown={handleResizeStart('e')} />
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
