// src/components/Settings/UiThemeSetting.jsx
// Picker for UI style: Classic | Glass

const UI_THEMES = [
    { value: 'classic', label: 'Classic' },
    { value: 'glass',   label: 'Glass'   },
];

export default function UiThemeSetting({ value, onChange }) {
    return (
        <div className="setting-row">
            <div>
                <p className="setting-label">Style</p>
                <p className="setting-sublabel">Glass adds a frosted backdrop effect</p>
            </div>
            <div className="theme-options">
                {UI_THEMES.map(t => (
                    <button
                        key={t.value}
                        className={`theme-btn${value === t.value ? ' active' : ''}`}
                        onClick={() => onChange(t.value)}
                        aria-pressed={value === t.value}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
