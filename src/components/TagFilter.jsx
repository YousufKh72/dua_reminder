// src/components/TagFilter.jsx
// Horizontally scrollable tag pill filter.

export default function TagFilter({ tags, active, onChange }) {
    return (
        <nav className="tag-filter" aria-label="Filter by tag">
            {tags.map(tag => (
                <button
                    key={tag}
                    className={`tag-pill${active === tag ? ' tag-pill-active' : ''}`}
                    onClick={() => onChange(tag)}
                    aria-pressed={active === tag}
                >
                    {tag === 'all' ? 'All' : `#${tag}`}
                </button>
            ))}
        </nav>
    );
}
