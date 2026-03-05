// src/components/ProfilePage.jsx
// View for user settings and account access.

export default function ProfilePage({ onSettingsOpen }) {
    return (
        <div className="profile-page" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="profile-header" style={{ textAlign: 'center', margin: '20px 0' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--border)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    👤
                </div>
                <h2>Guest User</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Sign in to sync your favorites</p>
            </div>

            <div className="profile-menu" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                    className="profile-menu-item"
                    onClick={onSettingsOpen}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        transition: 'background var(--transition)'
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        ⚙️ Preferences
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                </button>

                <button
                    className="profile-menu-item"
                    disabled
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        fontWeight: '500',
                        opacity: '0.6'
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        ☁️ Cloud Sync
                    </span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--surface-3)', padding: '2px 8px', borderRadius: '10px' }}>Coming Soon</span>
                </button>
            </div>
        </div>
    );
}
