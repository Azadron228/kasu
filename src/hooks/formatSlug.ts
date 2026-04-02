import { FieldHook } from 'payload';
import { slugify } from 'transliteration';

export const formatSlug = (fallback: string): FieldHook => {
    return ({ value, originalDoc, data }) => {
        // 1. If a user manually typed a slug, format and use that
        if (typeof value === 'string' && value.trim() !== '') {
            return slugify(value);
        }

        // 2. Otherwise, look for the fallback field (e.g., 'title')
        const fallbackData = data?.[fallback] || originalDoc?.[fallback];

        // 3. Transliterate and slugify the fallback field
        if (fallbackData && typeof fallbackData === 'string') {
            return slugify(fallbackData); // e.g., "Привет мир" -> "privet-mir"
        }

        // 4. Return the original value if nothing matches
        return value;
    };
};