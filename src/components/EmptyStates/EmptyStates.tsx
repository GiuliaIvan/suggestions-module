import { memo } from 'react';
import styles from './EmptyStates.module.css';

interface EmptyStateProps {
  onAddPinned?: () => void;
  onEnableSuggestions?: () => void;
}

/**
 * Empty state for new users with no data
 */
export const NewUserEmptyState = memo(function NewUserEmptyState({ 
  onAddPinned 
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#ff5b24" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M32 20v24M20 32h24" stroke="#ff5b24" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="3" fill="#ffe5db"/>
          <circle cx="48" cy="16" r="2" fill="#ffe5db"/>
          <circle cx="52" cy="40" r="3" fill="#ffe5db"/>
          <circle cx="12" cy="44" r="2" fill="#ffe5db"/>
        </svg>
      </div>
      <h3 className={styles.title}>Your suggestions will appear here</h3>
      <p className={styles.description}>
        As you use Vipps, we'll suggest people and merchants you might want to pay.
      </p>
      {onAddPinned && (
        <button className={styles.actionButton} onClick={onAddPinned}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add someone to pinned
        </button>
      )}
    </div>
  );
});

/**
 * Empty state when suggestions are disabled but user has pins
 */
export const SuggestionsDisabledState = memo(function SuggestionsDisabledState({ 
  onEnableSuggestions 
}: EmptyStateProps) {
  return (
    <div className={styles.infoBar}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span className={styles.infoText}>Suggestions are turned off</span>
      {onEnableSuggestions && (
        <button className={styles.infoAction} onClick={onEnableSuggestions}>
          Turn on
        </button>
      )}
    </div>
  );
});

/**
 * Message shown when only pinned items exist
 */
export const OnlyPinnedMessage = memo(function OnlyPinnedMessage() {
  return (
    <p className={styles.hintText}>
      Use Vipps more to get personalized suggestions
    </p>
  );
});

