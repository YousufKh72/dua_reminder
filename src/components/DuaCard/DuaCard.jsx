// src/components/DuaCard/DuaCard.jsx
// Main prayer card — title strip + 2-pane fixed layout.

import { useState } from 'react';
import LanguageTab from './LanguageTab';
import MediaPlayer from './MediaPlayer';
import { useSwipe } from '../../hooks/useSwipe';

// Language-aware "data not yet uploaded" messages
const EMPTY_MSG = {
    story: {
        en: 'No story has been uploaded for this dua yet.',
        bn: 'এই দুয়ার জন্য কোনো গল্প এখনো যোগ করা হয়নি।',
        ur: 'اس دعا کے لیے ابھی تک کوئی کہانی شامل نہیں کی گئی۔'
    },
    instructions: {
        en: 'No instructions have been uploaded for this dua yet.',
        bn: 'এই দুয়ার জন্য কোনো নির্দেশনা এখনো যোগ করা হয়নি।',
        ur: 'اس دعا کے لیے ابھی تک کوئی ہدایات شامل نہیں کی گئیں۔'
    },
    benefits: {
        en: 'No benefits have been uploaded for this dua yet.',
        bn: 'এই দুয়ার জন্য কোনো উপকার এখনো যোগ করা হয়নি।',
        ur: 'اس دعا کے لیے ابھی تک کوئی فوائد شامل نہیں کیے گئے۔'
    },
    audio: {
        en: 'No audio has been uploaded for this dua yet.',
        bn: 'এই দুয়ার জন্য কোনো অডিও এখনো যোগ করা হয়নি।',
        ur: 'اس دعا کے لیے ابھی تک آڈیو شامل نہیں کیا گیا۔'
    }
};

function emptyMsg(field, langCode) {
    return EMPTY_MSG[field]?.[langCode] || EMPTY_MSG[field]?.['en'] || '';
}

// SVG Icons
const StoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);
const InstrIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);
const ArabicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
);
const AudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
);

export default function DuaCard({ dua, activeLanguage, onLanguageChange, languages, onNext, onPrev }) {
    const [playerOpen, setPlayerOpen] = useState(false);

    // Top pane view: 'arabic' | 'story' | 'instructions'
    const [topView, setTopView] = useState('arabic');

    // Bottom pane view: 'meaning' | 'benefits'
    const [bottomView, setBottomView] = useState('meaning');

    const swipeHandlers = useSwipe({
        onSwipedLeft: onNext,
        onSwipedRight: onPrev,
        onSwipedUp: onNext,
        onSwipedDown: onPrev,
        threshold: 60
    });

    if (!dua) return null;

    const hasAudio = !!dua.audio_url;
    const isThisPlaying = false;

    const langMap = { 'english': 'en', 'bangla': 'bn', 'urdu': 'ur' };
    const langCode = langMap[activeLanguage?.toLowerCase()] || activeLanguage || 'en';

    const title = dua.title?.[langCode] || dua.title?.['en'] || '';
    const meaning = dua.meaning?.[langCode] || dua.meaning?.['en'] || '';
    const transliteration = dua.transliteration?.[langCode] || dua.transliteration?.['en'] || '';
    const story = dua.story?.[langCode] || dua.story?.['en'] || '';
    const instructions = dua.instructions?.[langCode] || dua.instructions?.['en'] || '';
    const benefits = dua.benefits?.[langCode] || dua.benefits?.['en'] || '';
    const reference = dua.reference?.[langCode] || dua.reference?.['en'] || '';

    const isShowingOverlay = topView !== 'arabic';

    function handleTopView(view) {
        setTopView(prev => prev === view ? 'arabic' : view);
    }

    function handleAudioBtn() {
        if (hasAudio) {
            setPlayerOpen(o => !o);
        } else {
            setTopView('audio-empty');
        }
    }

    return (
        <article className="dua-card" {...swipeHandlers}>

            {/* --- TITLE STRIP (10% of card height, always at top) --- */}
            <div className="dua-title-strip">
                <span className="dua-title">{title}</span>
            </div>

            {/* --- TOP PANE: Arabic, Reference, Transliteration, Story, Instructions --- */}
            <div className="dua-pane dua-pane-top">
                {/* Controls row: Tags on left, icon buttons on right */}
                <div className="dua-card-header">
                    <div className="tag-badges">
                        {dua.tags && dua.tags.map(tag => (
                            <span key={tag} className="tag-badge">#{tag}</span>
                        ))}
                    </div>

                    <div className="top-pane-controls">
                        {/* Back-to-Arabic: only appears when an overlay is active */}
                        {isShowingOverlay && (
                            <button
                                className="icon-btn"
                                onClick={() => setTopView('arabic')}
                                aria-label="Back to Arabic text"
                                title="Show Arabic"
                            >
                                <ArabicIcon />
                            </button>
                        )}
                        {/* Audio — always shown */}
                        <button
                            className={`icon-btn ${topView === 'audio-empty' || playerOpen ? 'active' : ''}`}
                            onClick={handleAudioBtn}
                            aria-label="Play audio"
                            title={hasAudio ? 'Play recitation' : 'No audio available'}
                            style={{ opacity: hasAudio ? 1 : 0.4 }}
                        >
                            <AudioIcon />
                        </button>
                        {/* Story — always shown */}
                        <button
                            className={`icon-btn ${topView === 'story' ? 'active' : ''}`}
                            onClick={() => handleTopView('story')}
                            aria-label="Toggle story"
                            title={story ? 'Story / Context' : 'No story available'}
                            style={{ opacity: story ? 1 : 0.4 }}
                        >
                            <StoryIcon />
                        </button>
                        {/* Instructions — always shown */}
                        <button
                            className={`icon-btn ${topView === 'instructions' ? 'active' : ''}`}
                            onClick={() => handleTopView('instructions')}
                            aria-label="Toggle instructions"
                            title={instructions ? 'Instructions' : 'No instructions available'}
                            style={{ opacity: instructions ? 1 : 0.4 }}
                        >
                            <InstrIcon />
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="pane-content">
                    {topView === 'story' ? (
                        <div className="pane-section slide-in">
                            <h3 className="section-title">Story / Context</h3>
                            <p className="section-text">{story || emptyMsg('story', langCode)}</p>
                        </div>
                    ) : topView === 'instructions' ? (
                        <div className="pane-section slide-in">
                            <h3 className="section-title">Instructions</h3>
                            <p className="section-text">{instructions || emptyMsg('instructions', langCode)}</p>
                        </div>
                    ) : topView === 'audio-empty' ? (
                        <div className="pane-section slide-in">
                            <h3 className="section-title">Audio</h3>
                            <p className="section-text">{emptyMsg('audio', langCode)}</p>
                        </div>
                    ) : (
                        <div className="pane-section fade-in">
                            {/* Arabic + play button LEFT */}
                            <div className="dua-arabic-row">
                                <p className="dua-arabic" dir="rtl" lang="ar">{dua.arabic}</p>
                            </div>

                            {playerOpen && hasAudio && (
                                <MediaPlayer
                                    audioUrl={dua.audio_url}
                                    audio={{ play: () => { }, pause: () => { }, seek: () => { }, rewind: () => { }, isPlaying: false, currentTime: 0, duration: 100 }}
                                />
                            )}

                            {reference && <p className="dua-reference">— {reference}</p>}

                            {/* Spacer pushes transliteration to bottom */}
                            <div style={{ flex: 1 }} />

                            {transliteration && (
                                <p className="dua-transliteration dua-transliteration-bottom">{transliteration}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- DIVIDER --- */}
            <div className="pane-divider" />

            {/* --- BOTTOM PANE: Meaning / Benefits + Language Switch --- */}
            <div className="dua-pane dua-pane-bottom">

                {/* Controls row: Language on left, Benefits on right */}
                <div className="dua-card-header" style={{ justifyContent: 'space-between' }}>
                    {languages && languages.length > 1 && (
                        <LanguageTab
                            languages={languages}
                            active={activeLanguage}
                            onChange={onLanguageChange}
                        />
                    )}
                    {/* Benefits — always shown */}
                    <button
                        className={`pill-btn ${bottomView === 'benefits' ? 'active' : ''}`}
                        onClick={() => setBottomView(v => v === 'benefits' ? 'meaning' : 'benefits')}
                        style={{ opacity: benefits ? 1 : 0.4 }}
                    >
                        Benefits
                    </button>
                </div>

                {/* Content area */}
                <div className="pane-content">
                    {bottomView === 'benefits' ? (
                        <div className="pane-section slide-in">
                            <h3 className="section-title">Benefits</h3>
                            <p className="section-text">{benefits || emptyMsg('benefits', langCode)}</p>
                        </div>
                    ) : (
                        <div className="pane-section fade-in">
                            {meaning && <p className="dua-meaning">{meaning}</p>}
                        </div>
                    )}
                </div>

            </div>

        </article>
    );
}
