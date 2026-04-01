// src/components/Header.jsx

import { useState, useEffect } from 'react';

const FilterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const PAGE_TITLES = {
    plan: 'Plan',
    favorites: 'Favorites',
    settings: 'Settings',
};

export default function Header({ activeTab, onTagsMenuOpen, onSearchOpen, hasActiveFilters, currentDuaTags = [] }) {
    const [tagIndex, setTagIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    // Reset cycling when the dua changes
    useEffect(() => {
        setTagIndex(0);
        setVisible(true);
    }, [currentDuaTags]);

    // Cycle through tags on Read tab
    useEffect(() => {
        if (activeTab !== 'read' || !currentDuaTags || currentDuaTags.length <= 1) return;
        const id = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setTagIndex(i => (i + 1) % currentDuaTags.length);
                setVisible(true);
            }, 350);
        }, 2500);
        return () => clearInterval(id);
    }, [currentDuaTags, activeTab]);

    const showFilter = activeTab === 'home' || activeTab === 'read';

    return (
        <header className="header">
            {/* LEFT: Filter */}
            <div className="header-slot header-slot-left">
                {showFilter && (
                    <button
                        className={`header-icon-btn${hasActiveFilters ? ' filter-active' : ''}`}
                        onClick={onTagsMenuOpen}
                        aria-label="Open filters"
                    >
                        <FilterIcon />
                    </button>
                )}
            </div>

            {/* CENTER: Dynamic */}
            <div className="header-center">
                {activeTab === 'read' && currentDuaTags.length > 0 ? (
                    <span className={`header-dua-tag${visible ? ' visible' : ''}`}>
                        {currentDuaTags[tagIndex]}
                    </span>
                ) : activeTab !== 'home' && PAGE_TITLES[activeTab] ? (
                    <span className="header-page-title">{PAGE_TITLES[activeTab]}</span>
                ) : null}
            </div>

            {/* RIGHT: Search */}
            <div className="header-slot header-slot-right">
                <button className="header-icon-btn" onClick={onSearchOpen} aria-label="Search">
                    <SearchIcon />
                </button>
            </div>
        </header>
    );
}
