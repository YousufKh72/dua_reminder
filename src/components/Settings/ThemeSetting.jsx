// src/components/Settings/ThemeSetting.jsx
// 3-way theme picker: Light | Dark | Follow System

const THEMES = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'Auto' },
];

export default function ThemeSetting({ value, onChange }) {
    return (
        <div className="setting-row">
            <div>
                <p className="setting-label">Theme</p>
                <p className="setting-sublabel">Auto follows your device setting</p>
            </div>
            <div className="theme-options">
                {THEMES.map(t => (
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
