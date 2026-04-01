// src/components/TagsMenu.jsx
// Sidebar drawer sliding in from the LEFT.
// One tag selected per category max; multiple categories can be combined.

export const CATEGORIES = {
    Source: ['Quran', 'Hadith', 'Sahaba', 'Tabeien', 'Personal'],
    Time: ['Early Morning', 'Sunrise', 'Morning', 'Noon', 'Evening', 'Sunset', 'Night', 'Midnight'],
    Prayer: ['Fazr', 'Duhr', 'Asr', 'Magrib', 'Isha', 'Tahajjud', 'Witr', 'Tarawi', 'Jummah', 'Eid', 'Zanazah'],
    Situation: [
        'Waking Up', 'Sleep', 'Before Eating', 'After Eating', 'Travel',
        'Sickness', 'Poverty', 'Wealth', 'Happiness', 'Death', 'Grief',
        'Anxiety', 'Protection', 'Forgiveness', 'Entering Home', 'Leaving Home',
        'Mosque', 'Bathroom'
    ]
};

export default function TagsMenu({ open, onClose, activeTags = {}, onChange }) {

    function selectTag(category, tag) {
        const current = activeTags[category];
        if (current === tag) {
            const next = { ...activeTags };
            delete next[category];
            onChange(next);
        } else {
            onChange({ ...activeTags, [category]: tag });
        }
    }

    function clearAll() {
        onChange({});
    }

    const hasAny = Object.keys(activeTags).length > 0;
    const activeEntries = Object.entries(activeTags);

    return (
        <>
            <div
                className={`tags-sidebar-backdrop${open ? ' open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={`tags-sidebar${open ? ' open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Filter Tags"
            >
                <div className="tags-sidebar-header">
                    <h2 className="settings-title" style={{ marginBottom: 0 }}>Filter</h2>
                    <button className="text-btn" onClick={clearAll} disabled={!hasAny}>
                        Clear All
                    </button>
                </div>

                {/* Active filter chips — quick-remove strip */}
                {hasAny && (
                    <div className="filter-active-strip">
                        {activeEntries.map(([cat, tag]) => (
                            <button
                                key={cat}
                                className="filter-active-chip"
                                onClick={() => selectTag(cat, tag)}
                            >
                                {tag} ×
                            </button>
                        ))}
                    </div>
                )}

                <div className="tags-sidebar-body">
                    {Object.entries(CATEGORIES).map(([category, tags]) => {
                        const selectedInCat = activeTags[category];

                        return (
                            <div key={category} className="tags-category-group">
                                <div className="tags-category-header">
                                    <h3 className="tags-category-title">{category}</h3>
                                    {selectedInCat && <span className="tags-category-badge">1</span>}
                                </div>
                                <div className="tag-badges">
                                    {tags.map(tag => {
                                        const isActive = selectedInCat === tag;
                                        return (
                                            <button
                                                key={tag}
                                                className={`tag-pill${isActive ? ' tag-pill-active' : ''}`}
                                                onClick={() => selectTag(category, tag)}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
