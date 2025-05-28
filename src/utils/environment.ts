
// Environment configuration helper
export const config = {
  googleSheets: {
    spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID,
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  },
  app: {
    name: 'Collzy',
    description: 'Your trusted college discovery platform',
    version: '1.0.0'
  }
};

export const isGoogleSheetsConfigured = () => {
  return !!(config.googleSheets.spreadsheetId && 
           config.googleSheets.apiKey && 
           config.googleSheets.spreadsheetId !== 'your-spreadsheet-id-here' &&
           config.googleSheets.apiKey !== 'your-google-api-key-here');
};
