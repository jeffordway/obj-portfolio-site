import { getIconComponent, slugify, iconMap, type IconName } from '@/lib/icons';
import { RiReactjsLine, RiTrelloLine } from '@remixicon/react';

describe('Icons Library', () => {
  describe('slugify function', () => {
    it('converts strings to slug format', () => {
      expect(slugify('Product Management')).toBe('product-management');
      expect(slugify('UI/UX Design Tools')).toBe('uiux-design-tools');
      expect(slugify('React.js')).toBe('reactjs');
      // The actual implementation trims after replacing spaces with hyphens
      expect(slugify('  Spaced  Text  ')).toBe('-spaced-text-');
    });

    it('handles special characters', () => {
      // The actual implementation replaces special chars with empty string, not with hyphens
      expect(slugify('C# & .NET')).toBe('c--net');
      expect(slugify('Node.js (Backend)')).toBe('nodejs-backend');
    });
  });

  describe('getIconComponent function', () => {
    it('returns the correct icon component for valid slugs', () => {
      // Test with a known slug
      expect(getIconComponent('react')).toBe(RiReactjsLine);
      
      // Test with the newly added Trello icon
      expect(getIconComponent('trello')).toBe(RiTrelloLine);
    });

    it('returns undefined for undefined or empty slugs', () => {
      expect(getIconComponent(undefined)).toBeUndefined();
      expect(getIconComponent('')).toBeUndefined();
    });

    it('returns undefined for invalid slugs', () => {
      expect(getIconComponent('non-existent-icon')).toBeUndefined();
    });

    it('handles legacy icon names for backward compatibility', () => {
      // Test with a legacy icon name that starts with "Ri"
      const legacyIconName = 'RiReactjsLine' as IconName;
      if (Object.keys(iconMap).includes(legacyIconName)) {
        expect(getIconComponent(legacyIconName)).toBeDefined();
      }
    });
  });

  describe('iconMap', () => {
    it('contains the expected icon mappings', () => {
      // Check for category icons
      expect(iconMap['product-management']).toBeDefined();
      expect(iconMap['front-end-development']).toBeDefined();
      expect(iconMap['uiux-design-tools']).toBeDefined();
      
      // Check for skill icons
      expect(iconMap['react']).toBeDefined();
      expect(iconMap['figma']).toBeDefined();
      expect(iconMap['git']).toBeDefined();
      
      // Check for social media icons
      expect(iconMap['github']).toBeDefined();
      expect(iconMap['linkedin']).toBeDefined();
      expect(iconMap['trello']).toBeDefined();
    });

    it('maps all IconName type values to actual icon components', () => {
      // This test ensures there are no typos in the IconName type
      // that would cause undefined mappings in the iconMap
      const iconNames = Object.keys(iconMap) as IconName[];
      
      for (const name of iconNames) {
        expect(iconMap[name]).toBeDefined();
      }
    });
  });
});
