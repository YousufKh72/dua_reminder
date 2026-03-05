// src/hooks/useAudio.js
// Single shared audio instance across all cards.
// Only one dua can play at a time.

import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudio() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentUrl, setCurrentUrl] = useState(null);

    useEffect(() => {
        const audio = new Audio();
        audioRef.current = audio;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onDurationChange = () => setDuration(audio.duration || 0);
        const onEnded = () => setIsPlaying(false);
        const onPause = () => setIsPlaying(false);
        const onPlay = () => setIsPlaying(true);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('durationchange', onDurationChange);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('play', onPlay);

        return () => {
            audio.pause();
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('durationchange', onDurationChange);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('play', onPlay);
        };
    }, []);

    const play = useCallback((url) => {
        const audio = audioRef.current;
        if (!audio || !url) return;
        if (currentUrl !== url) {
            audio.src = url;
            setCurrentUrl(url);
            setCurrentTime(0);
            setDuration(0);
        }
        audio.play().catch(() => { }); // catch autoplay policy errors silently
    }, [currentUrl]);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const seek = useCallback((time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    const rewind = useCallback((seconds = 5) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - seconds);
        }
    }, []);

    return { play, pause, seek, rewind, isPlaying, currentTime, duration, currentUrl };
}
