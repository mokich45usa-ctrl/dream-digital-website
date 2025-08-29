import { useState, useEffect } from 'react';
import { trackAdminAccess } from '../utils/analytics';

export function useAdminPanel() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Secret key combination for admin mode activation
  const ADMIN_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add pressed key to sequence
      setKeySequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Limit sequence length
        if (newSequence.length > ADMIN_SEQUENCE.length) {
          newSequence.shift();
        }

        // Check if sequence matches admin sequence
        if (newSequence.length === ADMIN_SEQUENCE.length) {
          const isCorrect = newSequence.every((key, index) => key === ADMIN_SEQUENCE[index]);
          if (isCorrect && !isAdminMode) {
            setIsAdminMode(true);
            console.log('🔓 Admin mode activated! Press Ctrl+Alt+D to open panel');
            trackAdminAccess();
            console.log('🔓 Admin mode activated! Press Ctrl+Alt+A to open analytics');
            return [];
          }
        }

        return newSequence;
      });

      // Open admin panel in admin mode
      if (isAdminMode && event.ctrlKey && event.altKey && event.code === 'KeyD') {
        event.preventDefault();
        setIsAdminPanelOpen(true);
      }

      // Open analytics panel in admin mode - ONLY Ctrl+Alt+A
      if (isAdminMode && event.ctrlKey && event.altKey && event.code === 'KeyA') {
        event.preventDefault();
        console.log('🔍 Debug - Opening analytics panel (Ctrl+Alt+A)');
        setIsAnalyticsPanelOpen(true);
      }

      // Exit admin mode
      if (isAdminMode && event.ctrlKey && event.altKey && event.code === 'KeyX') {
        event.preventDefault();
        setIsAdminMode(false);
        setIsAdminPanelOpen(false);
        setIsAnalyticsPanelOpen(false);
        console.log('🔒 Admin mode deactivated');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminMode]);

  const openAdminPanel = () => {
    if (isAdminMode) {
      setIsAdminPanelOpen(true);
    }
  };

  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
  };

  const closeAnalyticsPanel = () => {
    setIsAnalyticsPanelOpen(false);
  };

  return {
    isAdminPanelOpen,
    isAnalyticsPanelOpen,
    isAdminMode,
    openAdminPanel,
    closeAdminPanel,
    closeAnalyticsPanel
  };
}
