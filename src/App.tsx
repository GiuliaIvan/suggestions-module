import { SuggestionsModule } from './components';
import styles from './App.module.css';

/**
 * Demo App wrapper showing the Suggestions module in context
 * Simulates the Vipps MobilePay home screen layout
 */
function App() {
  return (
    <div className={styles.appContainer}>
      {/* Status bar placeholder */}
      <div className={styles.statusBar}>
        <span className={styles.time}>17:24</span>
        <div className={styles.statusIcons}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <path d="M1 4.5h2v7H1v-7zm4-2h2v9H5v-9zm4-2h2v11H9V.5zm4 4h2v7h-2v-7zm4-2h2v9h-2v-9z"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 0C5.2 0 2.7 1.1.8 2.9l1.4 1.4C3.7 2.8 5.7 2 8 2s4.3.8 5.8 2.2l1.4-1.4C13.3 1.1 10.8 0 8 0zM8 4c-1.8 0-3.4.7-4.6 1.9l1.4 1.4c.8-.8 1.9-1.3 3.2-1.3s2.4.5 3.2 1.3l1.4-1.4C11.4 4.7 9.8 4 8 4zm0 4c-.8 0-1.6.3-2.2.9l2.2 2.2 2.2-2.2c-.6-.6-1.4-.9-2.2-.9z"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" fill="none"/>
            <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor"/>
            <path d="M24 4v4a2 2 0 0 0 0-4z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Mock balance section */}
      <div className={styles.balanceSection}>
        <div className={styles.balanceCard}>
          <div className={styles.balanceIcon}>🏦</div>
          <div className={styles.balanceInfo}>
            <span className={styles.balanceAmount}>1 192 kr</span>
            <span className={styles.balanceLabel}>Spendings</span>
          </div>
        </div>
        <button className={styles.addButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Add</span>
        </button>
      </div>

      {/* Mock "Now" section */}
      <div className={styles.nowSection}>
        <h3 className={styles.sectionTitle}>Now</h3>
        <div className={styles.nowCards}>
          <div className={styles.nowCard}>
            <span className={styles.nowIcon}>👋</span>
            <div>
              <span className={styles.nowTitle}>Requests</span>
              <span className={styles.nowSubtitle}>0 new</span>
            </div>
          </div>
          <div className={styles.nowCard}>
            <span className={styles.nowIcon}>💰</span>
            <div>
              <span className={styles.nowTitle}>Box</span>
              <span className={styles.nowSubtitle}>Collect money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock "Latest" section */}
      <div className={styles.latestSection}>
        <h3 className={styles.sectionTitle}>Latest</h3>
        <div className={styles.latestCard}>
          <div className={styles.transactionRow}>
            <div className={styles.transactionAvatar}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                alt=""
              />
            </div>
            <div className={styles.transactionInfo}>
              <span className={styles.transactionName}>Martin Steen</span>
              <span className={styles.transactionMeta}>You received · Today</span>
            </div>
            <span className={styles.transactionAmount}>+80 kr</span>
          </div>
          <div className={styles.transactionRow}>
            <div className={styles.transactionAvatar} style={{ backgroundColor: '#fff3cd' }}>
              <span>🍔</span>
            </div>
            <div className={styles.transactionInfo}>
              <span className={styles.transactionName}>Burger Joint</span>
              <span className={styles.transactionMeta}>Paid · Yesterday</span>
            </div>
            <span className={styles.transactionAmountNeutral}>169 kr</span>
          </div>
        </div>
      </div>

      {/* SUGGESTIONS MODULE */}
      <SuggestionsModule />

      {/* Floating action bar */}
      <div className={styles.floatingBar}>
        <button className={styles.fabButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span>Send</span>
        </button>
        <button className={styles.fabButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
          <span>Request</span>
        </button>
        <button className={styles.fabButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          <span>QR</span>
        </button>
      </div>

      {/* Tab bar */}
      <div className={styles.tabBar}>
        <button className={`${styles.tabItem} ${styles.tabActive}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span>Home</span>
        </button>
        <button className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
          </svg>
          <span>Activities</span>
        </button>
        <button className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/>
          </svg>
          <span>Benefits</span>
        </button>
        <button className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5c0-2.3-4.7-3.5-7-3.5zm8 0c-.3 0-.6 0-1 .1 1.2.9 2 2.1 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z"/>
          </svg>
          <span>Groups</span>
        </button>
        <button className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/>
          </svg>
          <span>Me</span>
        </button>
      </div>
    </div>
  );
}

export default App;

