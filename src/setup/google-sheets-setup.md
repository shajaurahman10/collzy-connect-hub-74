
# Google Sheets Database Setup Guide

## Step 1: Create Google Sheets Database

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Collzy Colleges Database"
3. Set up these columns in Row 1:
   - A: id
   - B: name
   - C: location
   - D: state
   - E: type
   - F: rating
   - G: students
   - H: description
   - I: image
   - J: whatsapp
   - K: status
   - L: founded
   - M: website
   - N: email

## Step 2: Get Google API Access

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing one
3. Enable "Google Sheets API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key
6. Get your Spreadsheet ID from the URL (the long string between /d/ and /edit)

## Step 3: Configure Environment Variables

In Lovable, you'll need to set these environment variables:
- `VITE_GOOGLE_SPREADSHEET_ID`: Your spreadsheet ID
- `VITE_GOOGLE_API_KEY`: Your Google API key

## Step 4: Test the Integration

1. Add a few test colleges to your spreadsheet
2. The website will automatically fetch and display them
3. New colleges added to the sheet will appear on the website

## Sample Data Format

Here's an example row for your spreadsheet:

| id | name | location | state | type | rating | students | description | image | whatsapp | status | founded | website | email |
|----|------|----------|-------|------|--------|----------|-------------|-------|----------|--------|---------|---------|-------|
| 1001 | Harvard University | Cambridge, MA | Massachusetts | Private | 4.9 | 23000 | World-renowned Ivy League institution | /placeholder.svg | +1234567890 | approved | 1636 | https://harvard.edu | info@harvard.edu |

## Security Notes

- The API key should be restricted to Google Sheets API only
- Consider setting up domain restrictions for the API key
- The spreadsheet should be publicly readable for the API to access it
