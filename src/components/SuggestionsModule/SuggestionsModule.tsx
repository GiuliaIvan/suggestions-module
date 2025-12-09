import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suggestion, SuggestionsSettings, SuggestionAction } from '../../types';
import { PinnedList } from '../PinnedList';
import { SuggestedList } from '../SuggestedList';
import { ActionSheet } from '../ActionSheet';
import { Toast } from '../Toast';
import { SuggestionSettings } from '../SuggestionSettings';
import { 
  NewUserEmptyState, 
  SuggestionsDisabledState, 
  OnlyPinnedMessage 
} from '../EmptyStates';
import { mockSuggestions, mockHiddenSuggestions, defaultSettings } from '../../data/mockData';
import styles from './SuggestionsModule.module.css';

/**
 * Main Suggestions Module component
 * Manages state and orchestrates all child components
 */
export function SuggestionsModule() {
  // State
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [hiddenSuggestions, setHiddenSuggestions] = useState<Suggestion[]>(mockHiddenSuggestions);
  const [settings, setSettings] = useState<SuggestionsSettings>(defaultSettings);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [undoAction, setUndoAction] = useState<(() => void) | null>(null);

  // Derived state
  const pinnedSuggestions = useMemo(() => 
    suggestions
      .filter(s => s.isPinned)
      .sort((a, b) => (a.pinnedAt?.getTime() || 0) - (b.pinnedAt?.getTime() || 0)),
    [suggestions]
  );

  const algorithmSuggestions = useMemo(() => {
    let filtered = suggestions.filter(s => !s.isPinned && !s.isHidden);
    
    if (!settings.showPeople) {
      filtered = filtered.filter(s => s.type !== 'person');
    }
    if (!settings.showMerchants) {
      filtered = filtered.filter(s => s.type !== 'merchant');
    }
    if (settings.prioritizeRecent) {
      filtered.sort((a, b) => 
        (b.lastInteraction?.getTime() || 0) - (a.lastInteraction?.getTime() || 0)
      );
    }
    
    // If pinned should replace, limit algorithm suggestions
    if (settings.pinnedPosition === 'replace' && pinnedSuggestions.length > 0) {
      return [];
    }
    
    return filtered;
  }, [suggestions, settings, pinnedSuggestions.length]);

  const isNewUser = suggestions.length === 0;
  const hasOnlyPinned = pinnedSuggestions.length > 0 && algorithmSuggestions.length === 0;

  // Handlers
  const handleTap = useCallback((suggestion: Suggestion) => {
    // In a real app, this would navigate to send/request flow
    console.log('Tapped:', suggestion.name);
    setToastMessage(`Opening ${suggestion.name}...`);
  }, []);

  const handleLongPress = useCallback((suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowActionSheet(true);
  }, []);

  const handleAction = useCallback((action: SuggestionAction) => {
    if (!selectedSuggestion) return;
    
    const suggestion = selectedSuggestion;
    setShowActionSheet(false);
    setSelectedSuggestion(null);

    switch (action) {
      case 'pin':
        setSuggestions(prev => prev.map(s => 
          s.id === suggestion.id 
            ? { ...s, isPinned: true, pinnedAt: new Date() }
            : s
        ));
        setToastMessage(`${suggestion.name} added to your pinned favorites`);
        break;

      case 'unpin':
        setSuggestions(prev => prev.map(s => 
          s.id === suggestion.id 
            ? { ...s, isPinned: false, pinnedAt: undefined }
            : s
        ));
        setToastMessage(`${suggestion.name} removed from pinned`);
        break;

      case 'send':
        setToastMessage(`Opening send to ${suggestion.name}...`);
        break;

      case 'request':
        setToastMessage(`Opening request from ${suggestion.name}...`);
        break;

      case 'hide':
        const hiddenSuggestion = { ...suggestion, isHidden: true, hiddenAt: new Date() };
        setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
        setHiddenSuggestions(prev => [...prev, hiddenSuggestion]);
        setUndoAction(() => () => {
          setSuggestions(prev => [...prev, { ...suggestion, isHidden: false }]);
          setHiddenSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
        });
        setToastMessage(`${suggestion.name} hidden. You won't see them in suggestions.`);
        break;

      case 'seeLess':
        setToastMessage("We'll show fewer suggestions like this.");
        break;
    }
  }, [selectedSuggestion]);

  const handleUnpin = useCallback((suggestion: Suggestion) => {
    setSuggestions(prev => prev.map(s => 
      s.id === suggestion.id 
        ? { ...s, isPinned: false, pinnedAt: undefined }
        : s
    ));
    setToastMessage(`${suggestion.name} unpinned`);
  }, []);

  const handleReorder = useCallback((reorderedPins: Suggestion[]) => {
    setSuggestions(prev => {
      const nonPinned = prev.filter(s => !s.isPinned);
      return [...reorderedPins, ...nonPinned];
    });
  }, []);

  const handleAddPinned = useCallback(() => {
    // In a real app, this would open a search/contact picker
    setToastMessage('Opening contact picker...');
  }, []);

  const handleUpdateSettings = useCallback((updates: Partial<SuggestionsSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const handleUnhide = useCallback((suggestion: Suggestion) => {
    setHiddenSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    setSuggestions(prev => [...prev, { ...suggestion, isHidden: false, hiddenAt: undefined }]);
    setToastMessage(`${suggestion.name} will appear in suggestions again`);
  }, []);

  const handleUnhideAll = useCallback(() => {
    const unhidden = hiddenSuggestions.map(s => ({ ...s, isHidden: false, hiddenAt: undefined }));
    setSuggestions(prev => [...prev, ...unhidden]);
    setHiddenSuggestions([]);
    setToastMessage('All suggestions unhidden');
  }, [hiddenSuggestions]);

  const handleReset = useCallback(() => {
    setSuggestions(mockSuggestions.map(s => ({ ...s, isPinned: false, pinnedAt: undefined })));
    setHiddenSuggestions([]);
    setSettings(defaultSettings);
    setShowSettings(false);
    setToastMessage('Suggestions reset to defaults');
  }, []);

  const handleDismissToast = useCallback(() => {
    setToastMessage(null);
    setUndoAction(null);
  }, []);

  // Don't render if disabled and no pins
  if (!settings.isEnabled && pinnedSuggestions.length === 0) {
    return null;
  }

  return (
    <div className={styles.module}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {!settings.isEnabled ? 'Favorites' : 'Suggestions'}
        </h2>
        <button 
          className={styles.editButton}
          onClick={() => isEditMode ? setIsEditMode(false) : setIsEditMode(true)}
        >
          {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>

      {/* Edit Mode */}
      <AnimatePresence mode="wait">
        {isEditMode ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PinnedList
              suggestions={pinnedSuggestions}
              isEditMode={true}
              onUnpin={handleUnpin}
              onReorder={handleReorder}
              onAddPinned={handleAddPinned}
            />
            
            <button 
              className={styles.settingsButton}
              onClick={() => setShowSettings(true)}
            >
              <span>Suggestions settings</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* New user empty state */}
            {isNewUser && settings.isEnabled && (
              <NewUserEmptyState onAddPinned={handleAddPinned} />
            )}

            {/* Suggestions content */}
            {!isNewUser && (
              <div className={styles.scrollContainer}>
                <div className={styles.scrollContent}>
                  {/* Pinned items */}
                  {pinnedSuggestions.length > 0 && (
                    <PinnedList
                      suggestions={pinnedSuggestions}
                      onTap={handleTap}
                      onLongPress={handleLongPress}
                    />
                  )}

                  {/* Algorithm suggestions */}
                  {settings.isEnabled && algorithmSuggestions.length > 0 && (
                    <SuggestedList
                      suggestions={algorithmSuggestions}
                      onTap={handleTap}
                      onLongPress={handleLongPress}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Only pinned message */}
            {hasOnlyPinned && settings.isEnabled && <OnlyPinnedMessage />}

            {/* Suggestions disabled message */}
            {!settings.isEnabled && pinnedSuggestions.length > 0 && (
              <SuggestionsDisabledState 
                onEnableSuggestions={() => handleUpdateSettings({ isEnabled: true })} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Sheet */}
      <ActionSheet
        isOpen={showActionSheet}
        suggestion={selectedSuggestion}
        onClose={() => {
          setShowActionSheet(false);
          setSelectedSuggestion(null);
        }}
        onAction={handleAction}
      />

      {/* Settings */}
      <SuggestionSettings
        isOpen={showSettings}
        settings={settings}
        hiddenSuggestions={hiddenSuggestions}
        onClose={() => setShowSettings(false)}
        onUpdateSettings={handleUpdateSettings}
        onUnhide={handleUnhide}
        onUnhideAll={handleUnhideAll}
        onReset={handleReset}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        onDismiss={handleDismissToast}
        action={undoAction ? { label: 'Undo', onClick: () => {
          undoAction();
          handleDismissToast();
        }} : undefined}
      />
    </div>
  );
}

