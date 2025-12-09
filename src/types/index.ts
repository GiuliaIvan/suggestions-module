/** Type of suggestion - person or merchant */
export type SuggestionType = 'person' | 'merchant';

/** Reason why a suggestion appears */
export interface WhySuggested {
  reason: string;
  shortReason: string;
  timestamp?: Date;
}

/** Base suggestion interface */
export interface Suggestion {
  id: string;
  name: string;
  type: SuggestionType;
  avatar?: string; // URL to image
  initials: string;
  phoneNumber?: string;
  isPinned: boolean;
  isHidden: boolean;
  whySuggested?: WhySuggested;
  pinnedAt?: Date;
  hiddenAt?: Date;
  lastInteraction?: Date;
}

/** Settings for the suggestions module */
export interface SuggestionsSettings {
  isEnabled: boolean;
  pinnedPosition: 'above' | 'replace';
  showPeople: boolean;
  showMerchants: boolean;
  prioritizeRecent: boolean;
}

/** Action types for context menu */
export type SuggestionAction = 
  | 'pin'
  | 'unpin'
  | 'send'
  | 'request'
  | 'hide'
  | 'seeLess';

/** Props for action sheet options */
export interface ActionSheetOption {
  id: SuggestionAction;
  label: string;
  icon: string;
  destructive?: boolean;
}

/** State for the suggestions module */
export interface SuggestionsState {
  suggestions: Suggestion[];
  settings: SuggestionsSettings;
  isEditMode: boolean;
  isLoading: boolean;
  selectedSuggestion: Suggestion | null;
  showActionSheet: boolean;
  showSettings: boolean;
  toastMessage: string | null;
}

/** Event handlers for suggestion interactions */
export interface SuggestionHandlers {
  onTap: (suggestion: Suggestion) => void;
  onLongPress: (suggestion: Suggestion) => void;
  onPin: (suggestion: Suggestion) => void;
  onUnpin: (suggestion: Suggestion) => void;
  onHide: (suggestion: Suggestion) => void;
  onSeeLess: (suggestion: Suggestion) => void;
  onReorder: (pinnedIds: string[]) => void;
}

