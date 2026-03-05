// src/components/DuaCard/InstructionSection.jsx
// Collapsible how-to / when-to-read instructions section.

import { useState } from 'react';

export default function InstructionSection({ instructions }) {
    const [open, setOpen] = useState(false);
    if (!instructions) return null;

    return (
        <div className="collapsible-section instructions-section">
            <button
                className="collapsible-toggle"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
            >
                <span>Instructions</span>
                <span className={`collapsible-chevron${open ? ' open' : ''}`}>▾</span>
            </button>
            <div className={`collapsible-body${open ? ' open' : ''}`}>
                <p className="collapsible-text">{instructions}</p>
            </div>
        </div>
    );
}
