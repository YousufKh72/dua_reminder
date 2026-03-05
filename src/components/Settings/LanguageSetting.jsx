// src/components/Settings/LanguageSetting.jsx
// Two dropdowns to select up to 2 meaning languages.

const AVAILABLE_LANGUAGES = [
    { value: 'english', label: 'English' },
    { value: 'bangla', label: 'বাংলা (Bangla)' },
];

export default function LanguageSetting({ languages, onChange }) {
    const [lang1, lang2] = languages;

    function handleChange(index, newLang) {
        const updated = [...languages];
        updated[index] = newLang || null;
        // Filter out nulls
        onChange(updated.filter(Boolean));
    }

    return (
        <>
            <div className="setting-row">
                <div>
                    <p className="setting-label">Primary Language</p>
                    <p className="setting-sublabel">Meaning shown by default</p>
                </div>
                <select
                    value={lang1 || 'english'}
                    onChange={e => handleChange(0, e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.85rem' }}
                >
                    {AVAILABLE_LANGUAGES.map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                </select>
            </div>

            <div className="setting-row">
                <div>
                    <p className="setting-label">Second Language</p>
                    <p className="setting-sublabel">Optional — shown via tab on card</p>
                </div>
                <select
                    value={lang2 || ''}
                    onChange={e => handleChange(1, e.target.value || null)}
                    style={{ padding: '6px 10px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.85rem' }}
                >
                    <option value="">None</option>
                    {AVAILABLE_LANGUAGES.filter(l => l.value !== lang1).map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
