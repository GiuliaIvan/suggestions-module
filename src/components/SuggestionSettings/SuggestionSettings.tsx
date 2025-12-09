import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SuggestionsSettings, Suggestion } from '../../types';
import { Avatar } from '../Avatar';
import styles from './SuggestionSettings.module.css';

interface SuggestionSettingsProps {
  isOpen: boolean;
  settings: SuggestionsSettings;
  hiddenSuggestions: Suggestion[];
  onClose: () => void;
  onUpdateSettings: (settings: Partial<SuggestionsSettings>) => void;
  onUnhide: (suggestion: Suggestion) => void;
  onUnhideAll: () => void;
  onReset: () => void;
}

/**
 * Full-screen settings panel for the suggestions module
 * Allows customization of algorithm behavior and managing hidden items
 */
export const SuggestionSettings = memo(function SuggestionSettings({
  isOpen,
  settings,
  hiddenSuggestions,
  onClose,
  onUpdateSettings,
  onUnhide,
  onUnhideAll,
  onReset,
}: SuggestionSettingsProps) {
  const [showHiddenList, setShowHiddenList] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggle = (key: keyof SuggestionsSettings) => {
    if (typeof settings[key] === 'boolean') {
      onUpdateSettings({ [key]: !settings[key] });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.container}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backButton} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <h1 className={styles.title}>Suggestions Settings</h1>
          </div>

          <div className={styles.content}>
            {/* Main Toggle */}
            <div className={styles.section}>
              <div className={styles.card}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Show Suggestions</span>
                    <span className={styles.toggleDescription}>
                      Display personalized suggestions on your home screen
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.isEnabled}
                      onChange={() => handleToggle('isEnabled')}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>
            </div>

            {settings.isEnabled && (
              <>
                {/* Display Options */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Display Options</h2>
                  <div className={styles.card}>
                    <div className={styles.radioGroup}>
                      <span className={styles.radioGroupLabel}>Pinned favorites position</span>
                      <label className={styles.radioRow}>
                        <input
                          type="radio"
                          name="pinnedPosition"
                          checked={settings.pinnedPosition === 'above'}
                          onChange={() => onUpdateSettings({ pinnedPosition: 'above' })}
                        />
                        <span className={styles.radioLabel}>Above suggestions (default)</span>
                      </label>
                      <label className={styles.radioRow}>
                        <input
                          type="radio"
                          name="pinnedPosition"
                          checked={settings.pinnedPosition === 'replace'}
                          onChange={() => onUpdateSettings({ pinnedPosition: 'replace' })}
                        />
                        <span className={styles.radioLabel}>Replace algorithm suggestions</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Filters</h2>
                  <div className={styles.card}>
                    <div className={styles.toggleRow}>
                      <span className={styles.toggleLabel}>Show people</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings.showPeople}
                          onChange={() => handleToggle('showPeople')}
                        />
                        <span className={styles.slider} />
                      </label>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.toggleRow}>
                      <span className={styles.toggleLabel}>Show merchants</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings.showMerchants}
                          onChange={() => handleToggle('showMerchants')}
                        />
                        <span className={styles.slider} />
                      </label>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.toggleRow}>
                      <span className={styles.toggleLabel}>Prioritize recent contacts</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings.prioritizeRecent}
                          onChange={() => handleToggle('prioritizeRecent')}
                        />
                        <span className={styles.slider} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Hidden Suggestions */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Hidden Suggestions</h2>
                  <div className={styles.card}>
                    <button 
                      className={styles.navRow}
                      onClick={() => setShowHiddenList(true)}
                    >
                      <div className={styles.navInfo}>
                        <span className={styles.navLabel}>Manage hidden suggestions</span>
                        <span className={styles.navDescription}>
                          {hiddenSuggestions.length} {hiddenSuggestions.length === 1 ? 'person/merchant' : 'people/merchants'} hidden
                        </span>
                      </div>
                      <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Reset */}
            <div className={styles.section}>
              <div className={styles.card}>
                <button 
                  className={styles.destructiveRow}
                  onClick={() => setShowResetConfirm(true)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                  </svg>
                  <div className={styles.destructiveInfo}>
                    <span className={styles.destructiveLabel}>Reset suggestions</span>
                    <span className={styles.destructiveDescription}>
                      Clear all preferences and start fresh
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Hidden List Modal */}
          <AnimatePresence>
            {showHiddenList && (
              <motion.div
                className={styles.modal}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                <div className={styles.header}>
                  <button className={styles.backButton} onClick={() => setShowHiddenList(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  <h1 className={styles.title}>Hidden Suggestions</h1>
                </div>

                <div className={styles.content}>
                  <p className={styles.helpText}>
                    These people and merchants won't appear in your suggestions. Tap to unhide.
                  </p>

                  {hiddenSuggestions.length > 0 ? (
                    <div className={styles.card}>
                      {hiddenSuggestions.map((suggestion, index) => (
                        <div key={suggestion.id}>
                          <div className={styles.hiddenRow}>
                            <Avatar
                              name={suggestion.name}
                              initials={suggestion.initials}
                              type={suggestion.type}
                              size="sm"
                            />
                            <div className={styles.hiddenInfo}>
                              <span className={styles.hiddenName}>{suggestion.name}</span>
                              <span className={styles.hiddenDate}>
                                Hidden on {suggestion.hiddenAt?.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <button
                              className={styles.unhideButton}
                              onClick={() => onUnhide(suggestion)}
                            >
                              Unhide
                            </button>
                          </div>
                          {index < hiddenSuggestions.length - 1 && (
                            <div className={styles.divider} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyText}>No hidden suggestions</p>
                  )}

                  {hiddenSuggestions.length > 1 && (
                    <button className={styles.unhideAllButton} onClick={onUnhideAll}>
                      Unhide all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Confirmation */}
          <AnimatePresence>
            {showResetConfirm && (
              <motion.div
                className={styles.confirmOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className={styles.confirmDialog}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <h3 className={styles.confirmTitle}>Reset Suggestions?</h3>
                  <p className={styles.confirmText}>
                    This will clear all your pinned favorites, hidden suggestions, and preferences. 
                    The algorithm will start learning your preferences again.
                  </p>
                  <div className={styles.confirmActions}>
                    <button 
                      className={styles.confirmCancel}
                      onClick={() => setShowResetConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className={styles.confirmReset}
                      onClick={() => {
                        onReset();
                        setShowResetConfirm(false);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

