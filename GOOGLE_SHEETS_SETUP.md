# Google Sheets Form Integration - Setup Guide

## Problem
Forms show "success" messages but Google Sheets remains empty.

## Solution

### Step 1: Create/Prepare Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet or use an existing one
3. Name it something like "EditKaro Form Submissions"
4. Copy the **Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. **IMPORTANT:** Replace `'YOUR_GOOGLE_SHEET_ID_HERE'` with your actual Sheet ID (line 5)
6. Save the project (give it a name like "Form Handler")

### Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description:** "Form submission handler" (or any description)
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** (this is important!)
5. Click **Deploy**
6. **Authorize the app** when prompted
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
7. **Copy the Web app URL** - it should look like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 4: Update Your Website Code

1. Open `index.js`
2. Find the line that says:
   ```javascript
   const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycb...';
   ```
3. Replace the URL with your new Web app URL from Step 3

### Step 5: Test the Forms

1. Open your website
2. Open browser console (F12 → Console tab)
3. Submit the newsletter form
4. Check the console for logs like:
   ```
   Newsletter form data being sent: {type: "email", email: "test@example.com"}
   Newsletter JSONP response: {success: true, message: "..."}
   ```
5. Check your Google Sheet - you should see a new "Newsletter" tab with the submission

## Troubleshooting

### If you still don't see data in sheets:

1. **Check Apps Script Execution Log:**
   - In Apps Script editor, click "Executions" (clock icon) on the left
   - Look for recent executions and any errors

2. **Check Browser Console:**
   - Press F12 to open developer tools
   - Go to Console tab
   - Submit the form
   - Look for error messages in red

3. **Verify Sheet ID:**
   - Make sure you replaced `YOUR_GOOGLE_SHEET_ID_HERE` with the actual ID
   - The ID should be a long string like: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

4. **Check Deployment Settings:**
   - Make sure "Who has access" is set to **Anyone**
   - If it's set to "Only myself", external websites can't access it

5. **Redeploy if needed:**
   - After making changes to the script, create a **New deployment**
   - Or go to "Manage deployments" → Edit → Version: "New version"

## What Changed in index.js

✅ Now tries JSONP first (more reliable with Google Apps Script)
✅ Added detailed console logging to see exactly what's being sent
✅ Shows actual server responses
✅ Better error handling

## Expected Behavior

**Newsletter form sends:**
```javascript
{
  type: "email",
  email: "user@example.com"
}
```

**Contact form sends:**
```javascript
{
  type: "contact",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 12345 67890",
  message: "Your project details..."
}
```

## Sheet Structure

After submissions, your Google Sheet will have these tabs:

**Emails Tab:** (for newsletter subscriptions)
| Email | Timestamp |
|-------|-----------|
| user@example.com | 2025-11-29 10:30:45 |

**Contacts Tab:** (for contact form)
| Name | Email | Phone | Message | Timestamp |
|------|-------|-------|---------|-----------|
| John Doe | john@example.com | +91... | Project details | 2025-11-29 10:31:22 |

---

## Quick Checklist

- [ ] Created/opened Google Sheet
- [ ] Copied Sheet ID
- [ ] Created Apps Script with the provided code
- [ ] Replaced `YOUR_GOOGLE_SHEET_ID_HERE` with actual Sheet ID
- [ ] Deployed as Web app with "Anyone" access
- [ ] Authorized the app
- [ ] Copied the Web app URL
- [ ] Updated `WEBAPP_URL` in index.js with new URL
- [ ] Tested forms and checked console logs
- [ ] Verified data appears in Google Sheet

If you've completed all steps and it's still not working, check the browser console and Apps Script execution logs for specific error messages.
