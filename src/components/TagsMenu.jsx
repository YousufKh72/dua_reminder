// src/components/TagsMenu.jsx
// Sidebar drawer sliding in from the LEFT — 60% width, shows cards behind it.
// One tag selected per category max; multiple categories can be combined.

// STATIC full tag list from Docs.md — always shown even if no Dua exists for that tag.
const CATEGORIES = {
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

export default function TagsMenu({ open, onClose, activeTags = [], onChange }) {

    // activeTags shape: { Source: 'Quran', Time: 'Morning', ... }
    // We pass an object keyed by category so only 1 per category is enforced.

    function selectTag(category, tag) {
        const current = activeTags[category];
        if (current === tag) {
            // Deselect
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

    return (
        <>
            {/* Backdrop — clicking outside closes menu */}
            <div
                className={`tags-sidebar-backdrop${open ? ' open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Left-sliding sidebar panel */}
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

                <div className="tags-sidebar-body">
                    {Object.entries(CATEGORIES).map(([category, tags]) => {
                        const selectedInCat = activeTags[category];

                        return (
                            <div key={category} className="tags-category-group">
                                <h3 className="tags-category-title">{category}</h3>
                                <div className="tag-badges">
                                    {tags.map(tag => {
                                        const isActive = selectedInCat === tag;
                                        return (
                                            <button
                                                key={tag}
                                                className={`tag-pill${isActive ? ' tag-pill-active' : ''}`}
                                                onClick={() => selectTag(category, tag)}
                                            >
                                                #{tag}
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
