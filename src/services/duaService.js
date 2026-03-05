import { fetchSheetData } from './googleSheets';

const CACHE_KEY = 'dua_reminder_cache';
const CACHE_DEV_MODE = true; // Set to true to flush cache constantly during development testing

/**
 * Transforms the flat CSV JSON object into the nested, nested language shape expected by the frontend.
 */
function transformDuaData(rawRows) {
    return rawRows.map(row => {
        // Find all language keys dynamically
        const langKeys = Object.keys(row).filter(key => key.includes('_'));

        const dua = {
            id: row.id,
            // Split "Morning, Evening" into ["Morning", "Evening"] and clean up
            tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(t => t) : [],
            arabic: row.arabic || '',
            audio_url: row.audio_url || null,

            // Nested language buckets
            title: {},
            meaning: {},
            transliteration: {},
            benefits: {},
            story: {},
            instructions: {},
            reference: {}
        };

        // Dynamically nest languages based on _en, _bn, _ur suffixes
        langKeys.forEach(fullKey => {
            const [field, lang] = fullKey.split('_');
            if (dua[field] !== undefined) {
                dua[field][lang] = row[fullKey];
            }
        });

        return dua;
    });
}

export async function getAllDuas(csvUrl = undefined) {
    // Development mode: flush cache automatically to ensure fresh data while editing schema
    if (CACHE_DEV_MODE) {
        console.log("Dev Mode: Flushing cached Duas to force fresh fetch.");
        localStorage.removeItem(CACHE_KEY);
    }

    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            console.log("Serving from local cache");
            const parsedCache = JSON.parse(cached);

            // Trigger a background update asynchronously
            fetchAndCache(csvUrl).catch(console.error);

            return parsedCache;
        }

        // Cache miss (or flushed), fetch and await
        console.log("No cache found. Fetching from network.");
        return await fetchAndCache(csvUrl);
    } catch (e) {
        console.error("Error in getAllDuas:", e);
        return [];
    }
}

async function fetchAndCache(csvUrl) {
    const rawData = await fetchSheetData(csvUrl);

    if (!rawData || rawData.length === 0) {
        return [];
    }

    const transformedData = transformDuaData(rawData);

    // Save to local storage for offline use / fast next-load
    localStorage.setItem(CACHE_KEY, JSON.stringify(transformedData));

    return transformedData;
}
