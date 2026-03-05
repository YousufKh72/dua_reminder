// src/components/Settings/Settings.jsx
// Bottom drawer for app preferences.

import ThemeSetting from './ThemeSetting';
import LanguageSetting from './LanguageSetting';

export default function Settings({ open, onClose, prefs, onPrefsChange }) {
    function handleTheme(theme) {
        onPrefsChange({ ...prefs, theme });
    }

    function handleLanguages(languages) {
        onPrefsChange({ ...prefs, languages });
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`settings-backdrop${open ? ' open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={`settings-drawer${open ? ' open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Settings"
            >
                <div className="drawer-handle" />
                <h2 className="settings-title">Preferences</h2>
                <ThemeSetting value={prefs.theme} onChange={handleTheme} />
                <LanguageSetting languages={prefs.languages} onChange={handleLanguages} />
            </div>
        </>
    );
}
