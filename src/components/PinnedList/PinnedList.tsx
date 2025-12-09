import { memo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Suggestion } from '../../types';
import { SuggestionItem } from '../SuggestionItem';
import { Avatar } from '../Avatar';
import styles from './PinnedList.module.css';

interface PinnedListProps {
  suggestions: Suggestion[];
  isEditMode?: boolean;
  onTap?: (suggestion: Suggestion) => void;
  onLongPress?: (suggestion: Suggestion) => void;
  onUnpin?: (suggestion: Suggestion) => void;
  onReorder?: (suggestions: Suggestion[]) => void;
  onAddPinned?: () => void;
}

/**
 * Displays pinned favorites in a horizontal list or edit mode
 * Supports drag-to-reorder in edit mode
 */
export const PinnedList = memo(function PinnedList({
  suggestions,
  isEditMode = false,
  onTap,
  onLongPress,
  onUnpin,
  onReorder,
  onAddPinned,
}: PinnedListProps) {
  if (suggestions.length === 0 && !isEditMode) {
    return null;
  }

  // Edit mode: vertical list with reorder
  if (isEditMode) {
    return (
      <div className={styles.editContainer}>
        <h3 className={styles.sectionTitle}>Pinned Favorites</h3>
        
        <Reorder.Group
          axis="y"
          values={suggestions}
          onReorder={onReorder || (() => {})}
          className={styles.editList}
        >
          <AnimatePresence>
            {suggestions.map((suggestion) => (
              <Reorder.Item
                key={suggestion.id}
                value={suggestion}
                className={styles.editRow}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.dragHandle} aria-label="Drag to reorder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h2v2H9V8zm4 0h2v2h-2V8zM9 12h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                  </svg>
                </div>
                
                <Avatar
                  name={suggestion.name}
                  initials={suggestion.initials}
                  type={suggestion.type}
                  imageUrl={suggestion.avatar}
                  size="sm"
                />
                
                <div className={styles.editInfo}>
                  <span className={styles.editName}>{suggestion.name}</span>
                  <span className={styles.editLabel}>Pinned</span>
                </div>
                
                <button
                  className={styles.removeButton}
                  onClick={() => onUnpin?.(suggestion)}
                  aria-label={`Unpin ${suggestion.name}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#ff3b30"/>
                    <path d="M8 11h8v2H8z" fill="white"/>
                  </svg>
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
        
        <button className={styles.addButton} onClick={onAddPinned}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>Add pinned favorite</span>
        </button>
      </div>
    );
  }

  // Default mode: horizontal scroll list
  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <SuggestionItem
              suggestion={suggestion}
              showReason={false}
              onTap={onTap}
              onLongPress={onLongPress}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {suggestions.length > 0 && (
        <div className={styles.divider} aria-hidden="true" />
      )}
    </div>
  );
});

