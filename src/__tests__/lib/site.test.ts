/**
 * Tests for site configuration and content types
 */
import { 
  navLinks, 
  socialLinks, 
  siteConfig, 
  coreValues,
  type NavLink,
  type SocialLink,
  type ScriptureRef,
  type CoreValue,
  type SiteConfig
} from '@/lib/site';
import { type IconName } from '@/lib/icons';

describe('Site Configuration', () => {
  describe('navLinks', () => {
    it('should contain the expected navigation links', () => {
      // Check that navLinks is an array
      expect(Array.isArray(navLinks)).toBe(true);
      
      // Check that it contains the main navigation items
      const mainNavItems = navLinks.filter(link => link.showNavBar);
      expect(mainNavItems.length).toBe(3);
      
      // Check specific links
      expect(navLinks).toContainEqual({ href: "/", label: "Projects", showNavBar: true });
      expect(navLinks).toContainEqual({ href: "/about", label: "About", showNavBar: true });
      expect(navLinks).toContainEqual({ href: "/contact", label: "Contact", showNavBar: true });
      
      // Check footer links (those not shown in navbar)
      const footerLinks = navLinks.filter(link => !link.showNavBar);
      expect(footerLinks.length).toBeGreaterThan(0);
      expect(navLinks).toContainEqual({ href: "/privacy-policy", label: "Privacy Policy", showNavBar: false });
    });

    it('should have valid NavLink structure for each item', () => {
      // Check that each navLink has the correct structure
      navLinks.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('label');
        expect(link).toHaveProperty('showNavBar');
        expect(typeof link.href).toBe('string');
        expect(typeof link.label).toBe('string');
        expect(typeof link.showNavBar).toBe('boolean');
      });
    });
  });

  describe('socialLinks', () => {
    it('should contain the expected social links', () => {
      // Check that socialLinks is an array
      expect(Array.isArray(socialLinks)).toBe(true);
      
      // Check that it contains the expected social platforms
      const socialPlatforms = socialLinks.map(link => link.name);
      expect(socialPlatforms).toContain('GitHub');
      expect(socialPlatforms).toContain('LinkedIn');
      expect(socialPlatforms).toContain('X');
    });

    it('should have valid SocialLink structure for each item', () => {
      // Check that each socialLink has the correct structure
      socialLinks.forEach(link => {
        expect(link).toHaveProperty('name');
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('iconName');
        expect(typeof link.name).toBe('string');
        expect(typeof link.href).toBe('string');
        expect(typeof link.iconName).toBe('string');
        
        // Check that URLs are valid
        expect(link.href).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('siteConfig', () => {
    it('should have the expected properties', () => {
      // Check that siteConfig has the correct structure
      expect(siteConfig).toHaveProperty('name');
      expect(siteConfig).toHaveProperty('description');
      expect(siteConfig).toHaveProperty('url');
      expect(siteConfig).toHaveProperty('author');
      expect(siteConfig).toHaveProperty('copyrightYear');
      
      // Check types
      expect(typeof siteConfig.name).toBe('string');
      expect(typeof siteConfig.description).toBe('string');
      expect(typeof siteConfig.url).toBe('string');
      expect(typeof siteConfig.author).toBe('string');
      expect(typeof siteConfig.copyrightYear).toBe('number');
    });

    it('should have the correct site name and author', () => {
      expect(siteConfig.name).toBe('Jeff Ordway');
      expect(siteConfig.author).toBe('Jeff Ordway');
    });

    it('should have a valid URL', () => {
      expect(siteConfig.url).toMatch(/^https?:\/\//);
    });

    it('should have the current year as the copyright year', () => {
      const currentYear = new Date().getFullYear();
      expect(siteConfig.copyrightYear).toBe(currentYear);
    });
  });

  describe('coreValues', () => {
    it('should contain the expected core values', () => {
      // Check that coreValues is an array
      expect(Array.isArray(coreValues)).toBe(true);
      
      // Check that it contains the expected values
      const valueTitles = coreValues.map(value => value.title);
      expect(valueTitles).toContain('Live Boldly');
      expect(valueTitles).toContain('Serve Purposefully');
      expect(valueTitles).toContain('Pursue Excellence');
      expect(coreValues.length).toBe(3);
    });

    it('should have valid CoreValue structure for each item', () => {
      // Check that each coreValue has the correct structure
      coreValues.forEach(value => {
        expect(value).toHaveProperty('title');
        expect(value).toHaveProperty('description');
        expect(value).toHaveProperty('scriptureRefs');
        expect(typeof value.title).toBe('string');
        expect(typeof value.description).toBe('string');
        expect(Array.isArray(value.scriptureRefs)).toBe(true);
        
        // Check that each scriptureRef has the correct structure
        value.scriptureRefs.forEach(ref => {
          expect(ref).toHaveProperty('text');
          expect(ref).toHaveProperty('url');
          expect(typeof ref.text).toBe('string');
          expect(typeof ref.url).toBe('string');
          
          // Check that URLs are valid
          expect(ref.url).toMatch(/^https?:\/\//);
          // Check that URLs point to Bible.com
          expect(ref.url).toContain('bible.com/bible');
        });
      });
    });

    it('should have exactly 3 scripture references for each core value', () => {
      coreValues.forEach(value => {
        expect(value.scriptureRefs.length).toBe(3);
      });
    });
  });
});
