import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suggestion, SuggestionAction } from '../../types';
import { Avatar } from '../Avatar';
import styles from './ActionSheet.module.css';

interface ActionOption {
  id: SuggestionAction;
  label: string;
  icon: React.ReactNode;
  destructive?: boolean;
}

interface ActionSheetProps {
  isOpen: boolean;
  suggestion: Suggestion | null;
  onClose: () => void;
  onAction: (action: SuggestionAction) => void;
}

const icons = {
  pin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
    </svg>
  ),
  unpin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  send: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-11h-2v3H8l4 4 4-4h-3z"/>
    </svg>
  ),
  request: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-7h2v-3h3l-4-4-4 4h3z"/>
    </svg>
  ),
  hide: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7.305 4.5 3.23 7.465 1.5 12c1.73 4.535 5.805 7.5 10.5 7.5s8.77-2.965 10.5-7.5c-1.73-4.535-5.805-7.5-10.5-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  seeLess: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
};

/**
 * iOS-style action sheet for suggestion interactions
 * Appears from bottom with backdrop
 */
export const ActionSheet = memo(function ActionSheet({
  isOpen,
  suggestion,
  onClose,
  onAction,
}: ActionSheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!suggestion) return null;

  const primaryActions: ActionOption[] = suggestion.isPinned
    ? [
        { id: 'unpin', label: 'Unpin from favorites', icon: icons.unpin },
        { id: 'send', label: 'Send money', icon: icons.send },
        { id: 'request', label: 'Request money', icon: icons.request },
      ]
    : [
        { id: 'pin', label: 'Pin to favorites', icon: icons.pin },
        { id: 'send', label: 'Send money', icon: icons.send },
        { id: 'request', label: 'Request money', icon: icons.request },
      ];

  const secondaryActions: ActionOption[] = [
    { id: 'hide', label: 'Hide from suggestions', icon: icons.hide, destructive: true },
    { id: 'seeLess', label: 'See less like this', icon: icons.seeLess, destructive: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          <motion.div
            className={styles.sheet}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="action-sheet-title"
          >
            {/* Header */}
            <div className={styles.header}>
              <Avatar
                name={suggestion.name}
                initials={suggestion.initials}
                type={suggestion.type}
                imageUrl={suggestion.avatar}
                size="md"
              />
              <div className={styles.headerInfo}>
                <h2 id="action-sheet-title" className={styles.headerName}>
                  {suggestion.name}
                </h2>
                {suggestion.whySuggested && (
                  <p className={styles.headerReason}>
                    {suggestion.whySuggested.reason}
                  </p>
                )}
              </div>
            </div>

            {/* Primary actions */}
            <div className={styles.actionGroup}>
              {primaryActions.map((action) => (
                <button
                  key={action.id}
                  className={styles.actionButton}
                  onClick={() => onAction(action.id)}
                >
                  <span className={styles.actionIcon}>{action.icon}</span>
                  <span className={styles.actionLabel}>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Secondary actions (destructive) */}
            {!suggestion.isPinned && (
              <div className={styles.actionGroup}>
                {secondaryActions.map((action) => (
                  <button
                    key={action.id}
                    className={`${styles.actionButton} ${action.destructive ? styles.destructive : ''}`}
                    onClick={() => onAction(action.id)}
                  >
                    <span className={styles.actionIcon}>{action.icon}</span>
                    <span className={styles.actionLabel}>{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Cancel button */}
            <div className={styles.cancelGroup}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

