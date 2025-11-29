# ✅ READY TO DEPLOY - Your Sheet ID is Set!

## 🎉 Good News!

I've updated the `google-apps-script.js` file with your actual Sheet ID:
```javascript
const SHEET_ID = '1YgjKSK749TT32OXzOdnYemmgTTvfwoVg0K6efPAKNG0';
```

---

## 🚀 NEXT STEPS (Do This Now):

### Step 1: Copy the Updated Script

1. Open the file: **`google-apps-script.js`** in your editor
2. **Select ALL the code** (Ctrl+A)
3. **Copy it** (Ctrl+C)

---

### Step 2: Update Your Google Apps Script

1. Go to your Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/1YgjKSK749TT32OXzOdnYemmgTTvfwoVg0K6efPAKNG0/edit
   ```

2. Click **Extensions** → **Apps Script**

3. **Delete all existing code** in the editor

4. **Paste the new code** from `google-apps-script.js` (Ctrl+V)

5. **Save** (💾 icon or Ctrl+S)

---

### Step 3: Deploy the Script

**If this is your FIRST deployment:**
1. Click **Deploy** → **New deployment**
2. Click ⚙️ gear icon next to "Select type"
3. Choose **Web app**
4. Settings:
   - Description: "Form handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click "Advanced" → "Go to [Project] (unsafe)"
9. Click "Allow"
10. **COPY the Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`)

**If you've ALREADY deployed before:**
1. Click **Deploy** → **Manage deployments**
2. Click the **✏️ Edit** icon
3. Under "Version", select **New version**
4. Click **Deploy**
5. Your Web App URL stays the same!

---

### Step 4: Update Your Website (If First Time)

**Only if this is your FIRST deployment:**

1. Copy the Web App URL from Step 3
2. Open `index.js` in your editor
3. Find line 433:
   ```javascript
   const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycb...';
   ```
4. Replace with your new URL
5. Save the file

**If you already deployed before:** Skip this step - the URL doesn't change!

---

### Step 5: Test It!

1. **Open your website** (http://127.0.0.1:5500/index.html)

2. **Open Browser Console** (Press F12 → Console tab)

3. **Test Newsletter Form:**
   - Enter an email (e.g., test@example.com)
   - Click Subscribe
   - Check Console - should see:
     ```
     Newsletter form data being sent: {type: "email", email: "test@example.com"}
     Newsletter JSONP response: {success: true, message: "Thank you for subscribing!"}
     ```

4. **Check Your Google Sheet "Emails" Tab:**
   - You should see: `test@example.com` in Column A
   - Timestamp in Column B

5. **Test Contact Form:**
   - Fill in Name, Email, Phone, Message
   - Click Send Message
   - Check Console for success message
   - Check "Contacts" tab in your sheet

---

## ✅ Expected Results:

### Emails Tab (after newsletter submission):
```
| Email              | Timestamp           |
|--------------------|---------------------|
| test@example.com   | 11/29/2025 3:45 PM  |
```

### Contacts Tab (after contact form submission):
```
| Name | Email | Phone | Message | Timestamp |
|------|-------|-------|---------|-----------|
| John | j@... | +91...| Hello!  | 11/29/... |
```

---

## 🐛 Troubleshooting:

**If you still see errors:**

1. **Check Apps Script Execution Log:**
   - In Apps Script editor, click **⏱️ Executions** on the left
   - Look for recent executions
   - Check for error messages

2. **Check Console Output:**
   - What does it say after "Newsletter form data being sent"?
   - Copy any error messages

3. **Verify Sheet Tab Names:**
   - Tab 1 must be named: **"Emails"** (with capital E)
   - Tab 2 must be named: **"Contacts"** (with capital C)

4. **Check Authorization:**
   - The script must be authorized to access your sheets
   - You should have clicked "Allow" during deployment

---

## 📋 Quick Checklist:

- [ ] Copied all code from `google-apps-script.js`
- [ ] Opened Extensions → Apps Script in Google Sheets
- [ ] Pasted the code (replaced everything)
- [ ] Saved the script
- [ ] Deployed (New deployment OR New version)
- [ ] Authorized the app (if first time)
- [ ] (If first deployment) Updated WEBAPP_URL in index.js
- [ ] Tested newsletter form
- [ ] Checked "Emails" tab - data appeared! ✨
- [ ] Tested contact form
- [ ] Checked "Contacts" tab - data appeared! ✨

---

## 🎯 Summary:

Your Sheet ID: `1YgjKSK749TT32OXzOdnYemmgTTvfwoVg0K6efPAKNG0` ✅

The script is ready! Just copy-paste it into Google Apps Script, deploy it, and test! 🚀

Good luck! 🎉
