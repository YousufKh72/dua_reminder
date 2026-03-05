// src/components/DuaCard/MediaPlayer.jsx
// Inline audio player — slides in when the play button is tapped.

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

export default function MediaPlayer({ audioUrl, audio }) {
    const { play, pause, seek, rewind, isPlaying, currentTime, duration } = audio;
    const isOpen = !!audioUrl;

    function handleSeek(e) {
        seek(Number(e.target.value));
    }

    function handlePlayPause() {
        if (isPlaying) pause();
        else play(audioUrl);
    }

    function handleRewind() {
        rewind(5);
    }

    return (
        <div className={`media-player${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
            <div className="media-controls">
                <button
                    className="media-play-btn"
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button
                    className="media-rewind-btn"
                    onClick={handleRewind}
                    aria-label="Rewind 5 seconds"
                >
                    ↺ 5s
                </button>
                <span className="media-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
            <input
                type="range"
                className="media-seek-bar"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek"
            />
        </div>
    );
}
