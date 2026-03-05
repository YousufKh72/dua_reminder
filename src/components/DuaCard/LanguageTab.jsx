// src/components/DuaCard/LanguageTab.jsx
// Slide tab to switch between up to 2 languages for the meaning.

export default function LanguageTab({ languages, active, onChange }) {
    if (!languages || languages.length < 2) return null;

    return (
        <div className="language-tab" role="tablist" aria-label="Meaning language">
            {languages.map((lang) => (
                <button
                    key={lang}
                    role="tab"
                    aria-selected={active === lang}
                    className={`language-tab-btn${active === lang ? ' language-tab-active' : ''}`}
                    onClick={() => onChange(lang)}
                >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
            ))}
        </div>
    );
}
