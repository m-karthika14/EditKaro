# 🎯 VISUAL GUIDE - Getting Your Sheet ID

## Step 1: Open Your Google Sheet

Go to the Google Sheet that has your "Emails" and "Contacts" tabs.

---

## Step 2: Look at the URL

Your browser's address bar shows something like:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ 🔒 https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMd.../edit#gid=0      │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

## Step 3: Identify the Parts

```
https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit

                                        ↓
                            THIS IS WHAT YOU NEED!
```

**Full Example:**
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
                                       │                                        │
                                       └────────── COPY THIS PART ──────────────┘
                                                      |
                                               YOUR SHEET ID
```

---

## Step 4: Copy the Sheet ID

Select and copy **ONLY** the part between `/d/` and `/edit`

**Examples of valid Sheet IDs:**
- `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
- `1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T`
- `15rP8KhTQvM9X2NfLbwGc3Yj1Hq7WoZd4Pn8Km5Vx`

**What NOT to copy:**
- ❌ `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMd.../edit` (whole URL)
- ❌ `/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/` (with slashes)
- ❌ `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0` (with /edit)

**What TO copy:**
- ✅ `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` (just the ID)

---

## Step 5: Paste in Apps Script

In your Google Apps Script editor, Line 5:

**BEFORE (Wrong):**
```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
```

**AFTER (Correct):**
```javascript
const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
                  ↑                                            ↑
            Keep the quotes!                            Your actual ID
```

---

## 🔍 How to Verify It's Correct:

Your Sheet ID should be:
- ✅ Between 40-50 characters long
- ✅ Contains letters (uppercase and lowercase)
- ✅ Contains numbers
- ✅ May contain underscores `_` and hyphens `-`
- ✅ No spaces
- ✅ No slashes `/`
- ✅ No question marks `?`
- ✅ No hashtags `#`

---

## 💡 Pro Tip:

If your Sheet ID looks like this: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0`

**You copied too much!** Remove everything after the ID:
- Remove `/edit`
- Remove `#gid=0`
- Remove `/` at the end

**Correct format:**
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

---

## 🎯 Final Check:

After updating Line 5 in Apps Script:

1. ✅ **Save** (Ctrl+S)
2. ✅ **Deploy → Manage deployments**
3. ✅ **Edit → New version → Deploy**
4. ✅ **Test your form!**

Done! 🎉
