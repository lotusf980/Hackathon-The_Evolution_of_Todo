/**
 * Site Configuration
 * 
 * Central configuration for site-wide settings,
 * metadata, and feature flags.
 */

export const siteConfig = {
  name: 'The Evolution of Todo',
  description: 'A beautiful, simple way to stay organized',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Feature flags
  features: {
    enableRegistration: true,
    enableSocialAuth: false, // Phase III
    enableEmailConfirmation: false, // MVP
    enableDarkMode: false, // Phase III
  },
  
  // Links
  links: {
    privacy: '/privacy',
    terms: '/terms',
    contact: '/contact',
  },
  
  // Branding
  branding: {
    primaryColor: 'blue-600',
    logo: {
      text: 'Todo',
      showTagline: true,
      tagline: 'Stay organized',
    },
  },
};

export type SiteConfig = typeof siteConfig;
