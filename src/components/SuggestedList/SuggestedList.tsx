import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suggestion } from '../../types';
import { SuggestionItem } from '../SuggestionItem';
import styles from './SuggestedList.module.css';

interface SuggestedListProps {
  suggestions: Suggestion[];
  onTap?: (suggestion: Suggestion) => void;
  onLongPress?: (suggestion: Suggestion) => void;
}

/**
 * Displays algorithm-generated suggestions in a horizontal scroll list
 * Shows "why suggested" explanations
 */
export const SuggestedList = memo(function SuggestedList({
  suggestions,
  onTap,
  onLongPress,
}: SuggestedListProps) {
  if (suggestions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>
          Use Vipps more to get personalized suggestions
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <SuggestionItem
              suggestion={suggestion}
              showReason={true}
              onTap={onTap}
              onLongPress={onLongPress}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

