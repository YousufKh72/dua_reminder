// src/components/DuaCard/DuaCard.jsx

import { useState, useEffect, useRef } from 'react';
import LanguageTab from './LanguageTab';
import MediaPlayer from './MediaPlayer';
import { useSwipe } from '../../hooks/useSwipe';

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

const AudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
);

const LANG_MAP = { english: 'en', bangla: 'bn', urdu: 'ur' };

const VIEW_LABELS = {
    arabic: 'Arabic Text',
    story: 'Context',
    instructions: 'Instruction',
    reference: 'Reference',
    'audio-empty': 'Arabic Text',
};

// All switchable views in order — active one is excluded from the dropdown
const ALL_VIEWS = [
    { key: 'arabic',       label: 'Arabic Text'   },
    { key: 'instructions', label: 'Instruction'   },
    { key: 'story',        label: 'Context'       },
    { key: 'reference',    label: 'Reference Book' },
];

const TRANSITION_MS = 180;

export default function DuaCard({ dua, activeLanguage, onLanguageChange, languages, onNext, onPrev }) {
    const [playerOpen, setPlayerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // topView = selected (drives menu label); displayView = what's rendered (lags for animation)
    const [topView, setTopView] = useState('arabic');
    const [displayView, setDisplayView] = useState('arabic');
    const [viewClass, setViewClass] = useState('content-enter');

    // bottomView
    const [bottomView, setBottomView] = useState('meaning');
    const [displayBottomView, setDisplayBottomView] = useState('meaning');
    const [bottomViewClass, setBottomViewClass] = useState('content-enter');

    // Language — displayLang lags behind for smooth swap
    const [displayLang, setDisplayLang] = useState(activeLanguage);
    const [langClass, setLangClass] = useState('');
    const langRef = useRef(activeLanguage);

    const swipeHandlers = useSwipe({
        onSwipedLeft: onNext,
        onSwipedRight: onPrev,
        onSwipedUp: onNext,
        onSwipedDown: onPrev,
        xThreshold: Math.round(window.innerWidth * 0.5),
        yThreshold: Math.round(window.innerHeight * 0.7),
    });

    // Language transition
    useEffect(() => {
        if (activeLanguage === langRef.current) return;
        langRef.current = activeLanguage;
        setLangClass('content-exit');
        const t = setTimeout(() => {
            setDisplayLang(activeLanguage);
            setLangClass('content-enter');
        }, TRANSITION_MS);
        return () => clearTimeout(t);
    }, [activeLanguage]);

    if (!dua) return null;

    const hasAudio = !!dua.audio_url;
    const langCode = LANG_MAP[displayLang?.toLowerCase()] || 'en';

    const title     = dua.title?.[langCode]          || dua.title?.['en']          || '';
    const meaning   = dua.meaning?.[langCode]         || dua.meaning?.['en']         || '';
    const translit  = dua.transliteration?.[langCode] || dua.transliteration?.['en'] || '';
    const story     = dua.story?.[langCode]           || dua.story?.['en']           || '';
    const instrText = dua.instructions?.[langCode]    || dua.instructions?.['en']    || '';
    const benefits  = dua.benefits?.[langCode]        || dua.benefits?.['en']        || '';
    const reference = dua.reference?.[langCode]       || dua.reference?.['en']       || '';

    function changeTopView(view) {
        if (view === topView) return;
        setTopView(view);
        setMenuOpen(false);
        setViewClass('content-exit');
        setTimeout(() => {
            setDisplayView(view);
            setViewClass('content-enter');
        }, TRANSITION_MS);
    }

    function changeBottomView(view) {
        if (view === bottomView) return;
        setBottomView(view);
        setBottomViewClass('content-exit');
        setTimeout(() => {
            setDisplayBottomView(view);
            setBottomViewClass('content-enter');
        }, TRANSITION_MS);
    }

    function handleAudioBtn() {
        if (hasAudio) {
            setPlayerOpen(o => !o);
        } else {
            changeTopView('audio-empty');
        }
    }

    return (
        <article className="dua-card dua-card-enter" {...swipeHandlers}>

            {/* TITLE STRIP */}
            <div className="dua-title-strip">
                <span className="dua-title">{title}</span>
            </div>

            {/* TOP PANE */}
            <div className="dua-pane dua-pane-top">
                <div className="dua-card-header">
                    {/* LEFT: Audio */}
                    <button
                        className={`audio-icon-btn${topView === 'audio-empty' || playerOpen ? ' active' : ''}`}
                        onClick={handleAudioBtn}
                        aria-label="Play audio"
                        style={{ opacity: hasAudio ? 1 : 0.4 }}
                    >
                        <AudioIcon />
                    </button>

                    {/* RIGHT: Floating view menu */}
                    <div className="view-menu">
                        <button
                            className={`view-menu-trigger${menuOpen ? ' open' : ''}`}
                            onClick={() => setMenuOpen(o => !o)}
                        >
                            {VIEW_LABELS[topView] || 'Arabic Text'}
                            <span className={`view-menu-chevron${menuOpen ? ' open' : ''}`}>›</span>
                        </button>

                        {menuOpen && (
                            <div className="view-menu-items">
                                {ALL_VIEWS
                                    .filter(v => v.key !== topView && !(topView === 'audio-empty' && v.key === 'arabic'))
                                    .map(v => (
                                        <button key={v.key} className="view-menu-item" onClick={() => changeTopView(v.key)}>
                                            {v.label}
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Animated content area */}
                <div className={`pane-content ${viewClass}`}>
                    {displayView === 'story' ? (
                        <div className="pane-section">
                            <h3 className="section-title">Context</h3>
                            <p className={`section-text ${langClass}`}>{story || emptyMsg('story', langCode)}</p>
                        </div>
                    ) : displayView === 'instructions' ? (
                        <div className="pane-section">
                            <h3 className="section-title">Instruction</h3>
                            <p className={`section-text ${langClass}`}>{instrText || emptyMsg('instructions', langCode)}</p>
                        </div>
                    ) : displayView === 'reference' ? (
                        <div className="pane-section">
                            <h3 className="section-title">Reference</h3>
                            <p className={`section-text ${langClass}`}>{reference || '—'}</p>
                        </div>
                    ) : displayView === 'audio-empty' ? (
                        <div className="pane-section">
                            <h3 className="section-title">Audio</h3>
                            <p className="section-text">{emptyMsg('audio', langCode)}</p>
                        </div>
                    ) : (
                        <div className="pane-section">
                            <div className="dua-arabic-row">
                                <p className="dua-arabic" dir="rtl" lang="ar">{dua.arabic}</p>
                            </div>

                            {playerOpen && hasAudio && (
                                <MediaPlayer
                                    audioUrl={dua.audio_url}
                                    audio={{ play: () => {}, pause: () => {}, seek: () => {}, rewind: () => {}, isPlaying: false, currentTime: 0, duration: 100 }}
                                />
                            )}

                            {reference && <p className="dua-reference">— {reference}</p>}

                            <div style={{ flex: 1 }} />

                            {translit && (
                                <p className={`dua-transliteration dua-transliteration-bottom ${langClass}`}>
                                    {translit}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* DIVIDER */}
            <div className="pane-divider" />

            {/* BOTTOM PANE */}
            <div className="dua-pane dua-pane-bottom">
                <div className="dua-card-header">
                    {languages && languages.length > 1 && (
                        <LanguageTab
                            languages={languages}
                            active={activeLanguage}
                            onChange={onLanguageChange}
                        />
                    )}
                    <button
                        className={`bottom-action-btn${bottomView === 'benefits' ? ' active' : ''}`}
                        onClick={() => changeBottomView(bottomView === 'benefits' ? 'meaning' : 'benefits')}
                        style={{ opacity: benefits ? 1 : 0.4 }}
                    >
                        {bottomView === 'benefits' ? 'Benefits' : 'Meaning'}
                        <span className="btn-arrow">›</span>
                    </button>
                </div>

                <div className={`pane-content ${bottomViewClass}`}>
                    {displayBottomView === 'benefits' ? (
                        <div className="pane-section">
                            <h3 className="section-title">Benefits</h3>
                            <p className={`section-text ${langClass}`}>{benefits || emptyMsg('benefits', langCode)}</p>
                        </div>
                    ) : (
                        <div className="pane-section">
                            <p className={`dua-meaning ${langClass}`}>{meaning}</p>
                        </div>
                    )}
                </div>
            </div>

        </article>
    );
}
