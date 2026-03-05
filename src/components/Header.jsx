// src/components/Header.jsx

export default function Header({ activeTab, onBack, onTagsMenuOpen }) {

    // Map tab IDs to Header Titles
    const titleMap = {
        'home': 'Dua Reminder',
        'search': 'Search',
        'favorites': 'Favorites',
        'plan': 'My Plan',
        'profile': 'Profile & Settings'
    };

    return (
        <header className="header" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
            {/* LEFT SLOT: Tags Menu */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {activeTab === 'home' && (
                    <button
                        className="icon-btn-text"
                        onClick={onTagsMenuOpen}
                        aria-label="Open Tags Menu"
                        style={{ fontSize: '1.4rem' }}
                    >
                        ☰
                    </button>
                )}
            </div>

            {/* CENTER SLOT: Title */}
            <h1 className="header-title" style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                {titleMap[activeTab] || 'Dua Reminder'}
            </h1>

            {/* RIGHT SLOT: Back Button (where Settings used to be) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeTab !== 'home' && (
                    <button
                        className="settings-icon-btn"
                        onClick={onBack}
                        aria-label="Go Back"
                        style={{ fontSize: '1.2rem' }}
                    >
                        ←
                    </button>
                )}
            </div>
        </header>
    );
}
