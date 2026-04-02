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
import LibraryPage from './components/LibraryPage';

// Helper to wrap around arrays infinitely
function wrap(index, length) {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

// Load user preferences from localStorage
function loadPrefs() {
  const defaults = { theme: 'system', languages: ['english', 'bangla'], uiTheme: 'classic' };
  try {
    const saved = localStorage.getItem('dua_prefs');
    if (saved) return { ...defaults, ...JSON.parse(saved) };
  } catch (_) { }
  return defaults;
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

  const [activeTab, setActiveTab] = useState('home');

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
    if (selectedValues.length === 0) return duas;
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

  // Apply UI theme (classic / glass)
  useEffect(() => {
    document.documentElement.setAttribute('data-ui-theme', prefs.uiTheme || 'classic');
  }, [prefs.uiTheme]);

  // Save prefs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dua_prefs', JSON.stringify(prefs));
    if (!prefs.languages.includes(activeLanguage) && prefs.languages.length > 0) {
      setActiveLanguage(prefs.languages[0]);
    }
  }, [prefs, activeLanguage]);

  const handleNextDua = useCallback(() => {
    setDuaIndex(i => wrap(i + 1, filteredDuas.length));
  }, [filteredDuas.length]);

  const handlePrevDua = useCallback(() => {
    setDuaIndex(i => wrap(i - 1, filteredDuas.length));
  }, [filteredDuas.length]);

  function handleTagsChange(newTags) {
    setActiveTags(newTags);
    setDuaIndex(0);
  }

  // Tap a dua in the library → jump to it in Read tab
  function handleDuaSelect(duaId) {
    const idx = filteredDuas.findIndex(d => d.id === duaId);
    if (idx !== -1) {
      setDuaIndex(idx);
    } else {
      setActiveTags({});
      const allIdx = duas.findIndex(d => d.id === duaId);
      setDuaIndex(allIdx !== -1 ? allIdx : 0);
    }
    setActiveTab('read');
  }

  const currentDuaTags = activeTab === 'read' && currentDua ? currentDua.tags : [];

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        onTagsMenuOpen={() => setTagsMenuOpen(true)}
        onSearchOpen={() => { /* placeholder */ }}
        hasActiveFilters={Object.keys(activeTags).length > 0}
        currentDuaTags={currentDuaTags}
      />

      {activeTab === 'home' && (
        <LibraryPage
          onTagSelect={(category, tag) => {
            setActiveTags({ [category]: tag });
            setDuaIndex(0);
            setActiveTab('read');
          }}
        />
      )}

      {activeTab === 'read' && (
        <main className="card-stage">
          {isLoading ? (
            <div className="placeholder-view">
              <p className="placeholder-text">Loading duas…</p>
            </div>
          ) : filteredDuas.length > 0 ? (
            <DuaCard
              key={currentDua.id}
              dua={currentDua}
              activeLanguage={activeLanguage}
              onLanguageChange={setActiveLanguage}
              languages={prefs.languages}
              onNext={handleNextDua}
              onPrev={handlePrevDua}
            />
          ) : (
            <div className="dua-card placeholder-view">
              <p className="placeholder-text">No duas found for these filters.</p>
            </div>
          )}
        </main>
      )}

      {activeTab === 'settings' && (
        <ProfilePage onSettingsOpen={() => setSettingsOpen(true)} />
      )}

      {(activeTab === 'plan' || activeTab === 'favorites') && (
        <main className="placeholder-view">
          <p className="placeholder-text">
            {activeTab === 'plan' ? 'Plan' : 'Favorites'} coming soon.
          </p>
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
