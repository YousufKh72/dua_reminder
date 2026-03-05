// src/components/DuaCard/StorySection.jsx
// Collapsible backstory / interesting facts section.

import { useState } from 'react';

export default function StorySection({ story }) {
    const [open, setOpen] = useState(false);
    if (!story) return null;

    return (
        <div className="collapsible-section story-section">
            <button
                className="collapsible-toggle"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
            >
                <span>Story</span>
                <span className={`collapsible-chevron${open ? ' open' : ''}`}>▾</span>
            </button>
            <div className={`collapsible-body${open ? ' open' : ''}`}>
                <p className="collapsible-text">{story}</p>
            </div>
        </div>
    );
}
