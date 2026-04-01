// src/components/LibraryPage.jsx
// Home library — one horizontal row per category, tags scroll left/right.
// Uses static CATEGORIES (database not fully populated yet).

import { CATEGORIES } from './TagsMenu';

export default function LibraryPage({ onTagSelect }) {
    return (
        <main className="library-page">
            {Object.entries(CATEGORIES).map(([category, tags]) => (
                <section key={category} className="library-row">
                    <h2 className="library-row-title">{category}</h2>
                    <div className="library-row-scroll">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                className="library-tag-card"
                                onClick={() => onTagSelect(category, tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
}
