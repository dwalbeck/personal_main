/**
 * Centralized configuration for environment variables
 * All environment variables should be accessed through this file
 */

export const config = {
  /**
   * API base URL - defaults to localhost:8000 for development
   */
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',

  /**
   * Social media URLs
   */
  social: {
    github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/dwalbeck/',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/daveywalbeck/',
  },

  contact: {
      email: import.meta.env.VITE_CONTACT_EMAIL || 'daveywalbeck@gmail.com',
  },

  files: {
      resume: import.meta.env.VITE_FILES_RESUME || './resume-davey_walbeck.docx'
  }
} as const;

export default config;
