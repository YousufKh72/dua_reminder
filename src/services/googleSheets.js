/**
 * googleSheets.js
 * Fetches the published Google Sheet CSV and parses it into a clean JSON array.
 * Note: CSV parsing assumes standard comma delimiter. We will use a lightweight parsing logic.
 */

// Read URL from Vite environment variables
const SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;

/**
 * Parses a simple CSV string into an array of objects.
 * Handles quoted fields that might contain line breaks or commas.
 */
function parseCSV(csvText) {
    const result = [];
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (inQuotes) {
            if (char === '"' && nextChar === '"') {
                currentCell += '"'; // Escaped quote
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                currentCell += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if (char === '\n' || char === '\r') {
                if (char === '\r' && nextChar === '\n') {
                    i++; // Skip \n
                }
                currentRow.push(currentCell.trim());
                if (currentRow.length > 0 && currentRow.some(c => c !== '')) {
                    rows.push(currentRow);
                }
                currentRow = [];
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
    }

    // Push the very last cell/row if file doesn't end with a newline
    if (currentCell !== '' || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        if (currentRow.some(c => c !== '')) rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            if (headers[j]) {
                obj[headers[j]] = row[j] || '';
            }
        }
        result.push(obj);
    }

    return result;
}

export async function fetchSheetData(url = SHEET_CSV_URL) {
    try {
        if (!url) {
            console.warn("Google Sheet CSV URL not provided. Returning empty array.");
            return [];
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        const rawData = parseCSV(csvText);

        // Filter out completely empty rows that might slip through
        return rawData.filter(row => row.id || row.arabic);

    } catch (error) {
        console.error("Error fetching sheet data:", error);
        return [];
    }
}
