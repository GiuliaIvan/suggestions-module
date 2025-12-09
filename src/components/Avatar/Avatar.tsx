import { memo } from 'react';
import { SuggestionType } from '../../types';
import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  initials: string;
  type: SuggestionType;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  showPinBadge?: boolean;
}

/** 
 * Avatar component matching Vipps MobilePay design
 * Displays user photo or initials with optional pin badge
 */
export const Avatar = memo(function Avatar({
  name,
  initials,
  type,
  imageUrl,
  size = 'lg',
  showPinBadge = false,
}: AvatarProps) {
  const sizeClass = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const typeClass = type === 'merchant' ? styles.merchant : styles.person;
  
  return (
    <div className={`${styles.container} ${sizeClass}`}>
      <div className={`${styles.avatar} ${typeClass}`}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
        <div className={styles.border} />
      </div>
      
      {showPinBadge && (
        <div className={styles.pinBadge} aria-label="Pinned">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
          </svg>
        </div>
      )}
    </div>
  );
});

