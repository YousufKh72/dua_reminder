import { useState, useCallback } from 'react';

/**
 * A custom React hook for handling mobile swipe gestures.
 * 
 * @param {Object} callbacks - An object containing callback functions for different swipe directions.
 * @param {Function} callbacks.onSwipedLeft - Triggered when the user swipes left (indicating 'next item' generally).
 * @param {Function} callbacks.onSwipedRight - Triggered when the user swipes right (indicating 'previous item' generally).
 * @param {Function} callbacks.onSwipedUp - Triggered when the user swipes up (vertical scroll/next category).
 * @param {Function} callbacks.onSwipedDown - Triggered when the user swipes down (vertical scroll/prev category).
 * @param {number} threshold - Minimum distance in pixels to register as a swipe (default: 50).
 */
export function useSwipe({ onSwipedLeft, onSwipedRight, onSwipedUp, onSwipedDown, threshold = 50, xThreshold, yThreshold }) {
    const xThr = xThreshold ?? threshold;
    const yThr = yThreshold ?? threshold;

    const [touchStart, setTouchStart] = useState({ x: null, y: null });
    const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

    const handleTouchStart = useCallback((e) => {
        setTouchEnd({ x: null, y: null }); // Reset touch end
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    }, []);

    const handleTouchMove = useCallback((e) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStart.x || !touchStart.y || !touchEnd.x || !touchEnd.y) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        const isLeftSwipe = distanceX > xThr;
        const isRightSwipe = distanceX < -xThr;
        const isUpSwipe = distanceY > yThr;
        const isDownSwipe = distanceY < -yThr;

        // Determine if movement is mostly horizontal or vertical
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
            // Horizontal Swipe
            if (isLeftSwipe && onSwipedLeft) {
                onSwipedLeft();
            } else if (isRightSwipe && onSwipedRight) {
                onSwipedRight();
            }
        } else {
            // Vertical Swipe
            // NOTE: Only trigger array navigation if the user isn't just scrolling down a long story/text. 
            // So Vertical swipes might need to be carefully attached only to specific overlay areas.
            if (isUpSwipe && onSwipedUp) {
                onSwipedUp();
            } else if (isDownSwipe && onSwipedDown) {
                onSwipedDown();
            }
        }

        // Reset states
        setTouchStart({ x: null, y: null });
        setTouchEnd({ x: null, y: null });
    }, [touchStart, touchEnd, xThr, yThr, onSwipedLeft, onSwipedRight, onSwipedUp, onSwipedDown]);

    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd
    };
}
