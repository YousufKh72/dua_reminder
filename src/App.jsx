// src/App.jsx
// Root component — owns all state, swipe navigation, data fetching, and theme logic.

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllDuas } from './services/duaService';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import TagsMenu from './components/TagsMenu';
import DuaCard from './components/DuaCard/DuaCard';
import Settings from './components/Settings/Settings';
import ProfilePage from './components/ProfilePage';

// Helper to wrap around arrays infinitely
function wrap(index, length) {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

// Load user preferences from localStorage
function loadPrefs() {
  try {
    const saved = localStorage.getItem('dua_prefs');
    if (saved) return JSON.parse(saved);
  } catch (_) { }
  return { theme: 'system', languages: ['english', 'bangla'] };
}

// Resolve theme accounting for system preference
function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export default function App() {
  const [prefs, setPrefs] = useState(loadPrefs);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tagsMenuOpen, setTagsMenuOpen] = useState(false);

  // activeTags is an object: { Category: 'TagName' } — one per category max
  const [activeTags, setActiveTags] = useState({});

  const [duaIndex, setDuaIndex] = useState(0);

  // Data state
  const [duas, setDuas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeLanguage, setActiveLanguage] = useState(prefs.languages[0] || 'english');

  // Load Data on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await getAllDuas();
      setDuas(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Compute universally unique tags from the Data
  const allTags = useMemo(() => {
    if (!duas.length) return [];
    const tagSet = new Set();
    duas.forEach(d => {
      if (d.tags) {
        d.tags.forEach(t => tagSet.add(t));
      }
    });
    return Array.from(tagSet).sort();
  }, [duas]);

  // Filtered dua list based on selected tags object
  const filteredDuas = useMemo(() => {
    const selectedValues = Object.values(activeTags);
    if (selectedValues.length === 0) return duas; // "All" state: no filters

    // Dua must match ALL selected category tags (intersection logic)
    return duas.filter(d => {
      if (!d.tags) return false;
      return selectedValues.every(tag => d.tags.includes(tag));
    });
  }, [duas, activeTags]);

  const currentDua = filteredDuas.length > 0 ? filteredDuas[wrap(duaIndex, filteredDuas.length)] : null;

  // Apply theme to <html>
  useEffect(() => {
    const resolved = resolveTheme(prefs.theme);
    document.documentElement.setAttribute('data-theme', resolved);

    if (prefs.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => document.documentElement.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [prefs.theme]);

  // Save prefs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dua_prefs', JSON.stringify(prefs));
    if (!prefs.languages.includes(activeLanguage) && prefs.languages.length > 0) {
      setActiveLanguage(prefs.languages[0]);
    }
  }, [prefs, activeLanguage]);

  // Handlers for Swiping from DuaCard
  const handleNextDua = useCallback(() => {
    setDuaIndex(i => wrap(i + 1, filteredDuas.length));
  }, [filteredDuas.length]);

  const handlePrevDua = useCallback(() => {
    setDuaIndex(i => wrap(i - 1, filteredDuas.length));
  }, [filteredDuas.length]);

  // We remove Up/Down swipe logic since "Category Jumping" makes less sense with multi-select filtering

  function handleTagsChange(newTags) {
    setActiveTags(newTags);
    setDuaIndex(0); // Reset dua position when changing filters
  }

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'search' | 'favorites' | 'plan' | 'profile'

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        onBack={() => setActiveTab('home')}
        onTagsMenuOpen={() => setTagsMenuOpen(true)}
      />

      {activeTab === 'home' && (
        <main className="card-stage" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
              <p>Loading Duas from Google Sheets...</p>
            </div>
          ) : filteredDuas.length > 0 ? (
            <DuaCard
              key={currentDua.id + "_" + activeLanguage} // Force full re-mount on lang change for anim
              dua={currentDua}
              activeLanguage={activeLanguage}
              onLanguageChange={setActiveLanguage}
              languages={prefs.languages}
              onNext={handleNextDua}    // Sweeping left invokes "next"
              onPrev={handlePrevDua}    // Sweeping right invokes "prev"
            />
          ) : (
            <div className="dua-card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 24px' }}>
              <p>No duas found for these tags.</p>
            </div>
          )}
        </main>
      )}

      {activeTab === 'profile' && (
        <ProfilePage onSettingsOpen={() => setSettingsOpen(true)} />
      )}

      {/* Search, Favorites, Plan placeholders */}
      {['search', 'favorites', 'plan'].includes(activeTab) && (
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon.</p>
        </main>
      )}

      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      <TagsMenu
        open={tagsMenuOpen}
        onClose={() => setTagsMenuOpen(false)}
        allTags={allTags}
        activeTags={activeTags}
        onChange={handleTagsChange}
      />

      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        prefs={prefs}
        onPrefsChange={setPrefs}
      />
    </div>
  );
}
