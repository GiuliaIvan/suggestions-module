import { memo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Suggestion } from '../../types';
import { Avatar } from '../Avatar';
import styles from './SuggestionItem.module.css';

interface SuggestionItemProps {
  suggestion: Suggestion;
  showReason?: boolean;
  onTap?: (suggestion: Suggestion) => void;
  onLongPress?: (suggestion: Suggestion) => void;
}

/**
 * Individual suggestion item with avatar, name, and optional reason
 * Supports tap and long-press interactions
 */
export const SuggestionItem = memo(function SuggestionItem({
  suggestion,
  showReason = true,
  onTap,
  onLongPress,
}: SuggestionItemProps) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = useCallback(() => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress?.(suggestion);
    }, 500);
  }, [suggestion, onLongPress]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!isLongPress.current) {
      onTap?.(suggestion);
    }
  }, [suggestion, onTap]);

  const handleTouchCancel = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTap?.(suggestion);
    }
  }, [suggestion, onTap]);

  return (
    <motion.button
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchCancel}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      role="button"
      tabIndex={0}
      aria-label={`${suggestion.name}${suggestion.isPinned ? ', pinned' : ''}${suggestion.whySuggested ? `. ${suggestion.whySuggested.reason}` : ''}`}
    >
      <Avatar
        name={suggestion.name}
        initials={suggestion.initials}
        type={suggestion.type}
        imageUrl={suggestion.avatar}
        showPinBadge={suggestion.isPinned}
      />
      
      <span className={styles.name}>
        {suggestion.name}
      </span>
      
      {showReason && suggestion.whySuggested && !suggestion.isPinned && (
        <span className={styles.reason}>
          {suggestion.whySuggested.shortReason}
        </span>
      )}
    </motion.button>
  );
});

