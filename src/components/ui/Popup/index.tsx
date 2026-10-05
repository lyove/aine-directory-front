'use client';

import { useState, useRef, createContext, useContext, useEffect } from 'react';
import { createPopper, Instance } from '@popperjs/core';

interface PopupContextType {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <PopupContext.Provider value={{ openMenuId, setOpenMenuId }}>
      {children}
    </PopupContext.Provider>
  );
}

interface PopupProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  menuId: string;
}

const BRIDGE_WIDTH = 16;

export default function Popup({ trigger, content, menuId }: PopupProps) {
  const { openMenuId, setOpenMenuId } = useContext(PopupContext)!;
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const [arrowTop, setArrowTop] = useState(18);

  const isOpen = openMenuId === menuId;

  useEffect(() => {
    if (isOpen && triggerRef.current && popupRef.current) {
      const updateArrowPosition = () => {
        if (!triggerRef.current || !popupRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        const triggerCenter = triggerRect.top + triggerRect.height / 2;
        const arrowY = triggerCenter - popupRect.top;
        setArrowTop(Math.max(8, Math.min(arrowY, popupRect.height - 24)));
      };

      popperInstance.current = createPopper(triggerRef.current, popupRef.current, {
        placement: 'right-start',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, BRIDGE_WIDTH],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              padding: 8,
            },
          },
          {
            name: 'arrowUpdate',
            enabled: true,
            phase: 'afterMain',
            fn: updateArrowPosition,
          },
        ],
      });

      requestAnimationFrame(updateArrowPosition);

      return () => {
        if (popperInstance.current) {
          popperInstance.current.destroy();
          popperInstance.current = null;
        }
      };
    } else {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    }
  }, [isOpen]);

  const isInsidePopupOrTrigger = (el: EventTarget | null): boolean => {
    if (!el || !(el instanceof Node)) return false;
    return (
      (triggerRef.current?.contains(el) as boolean) ||
      (popupRef.current?.contains(el) as boolean)
    );
  };

  const handleTriggerMouseEnter = () => {
    setOpenMenuId(menuId);
  };

  const handleTriggerMouseLeave = (e: React.MouseEvent) => {
    if (isInsidePopupOrTrigger(e.relatedTarget)) {
      return;
    }
    setOpenMenuId(null);
  };

  const handlePopupMouseEnter = () => {
  };

  const handlePopupMouseLeave = (e: React.MouseEvent) => {
    if (isInsidePopupOrTrigger(e.relatedTarget)) {
      return;
    }
    setOpenMenuId(null);
  };

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        className="trigger dark:bg-gray-800 dark:text-gray-200"
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          className="popup z-index-[100]"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: -BRIDGE_WIDTH,
              width: BRIDGE_WIDTH,
              height: '100%',
            }}
          />
          <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-3 px-2 min-w-[150px]" style={{ width: 'max-content' }}>
            <div
              className="absolute w-0 h-0 border-y-[8px] border-y-transparent border-r-[8px] border-r-white dark:border-r-[#1a1a1a]"
              style={{
                left: -8,
                top: arrowTop,
              }}
            />
            {content}
          </div>
        </div>
      )}
    </div>
  );
}