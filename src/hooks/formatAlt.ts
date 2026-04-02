import { FieldHook } from 'payload';

export const formatAlt = (fallback: string = 'filename'): FieldHook => {
    return ({ value, originalDoc, data }) => {
        // 1. If a user manually typed alt text, use it
        if (typeof value === 'string' && value.trim() !== '') {
            return value;
        }

        // 2. Look for the fallback field (defaults to 'filename' for media)
        const fallbackData = data?.[fallback] || originalDoc?.[fallback];

        // 3. Format the fallback string into readable alt text
        if (fallbackData && typeof fallbackData === 'string') {
            return fallbackData
                .replace(/\.[^/.]+$/, '') // Remove the file extension
                .replace(/[-_]/g, ' ')    // Replace hyphens and underscores with spaces
                .trim();                  // Remove trailing/leading spaces
        }

        // 4. Return original value if nothing matches
        return value;
    };
};