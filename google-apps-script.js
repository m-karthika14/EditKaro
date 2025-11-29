// Google Apps Script for handling form submissions
// Deploy this as a Web App with "Anyone" access

// Replace with your actual Google Sheet ID
const SHEET_ID = '1YgjKSK749TT32OXzOdnYemmgTTvfwoVg0K6efPAKNG0';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Log incoming request for debugging
    Logger.log('Request received');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    
    const params = e.parameter;
    const type = params.type || 'unknown';
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    
    let sheet;
    let row = [];
    let timestamp = new Date();
    
    if (type === 'email' || type === 'newsletter') {
      // Newsletter submission - using "Emails" sheet with your column order
      sheet = ss.getSheetByName('Emails');
      
      if (!sheet) {
        // If sheet doesn't exist, create it with your structure
        sheet = ss.insertSheet('Emails');
        sheet.appendRow(['Email', 'Timestamp']);
        sheet.getRange('A1:B1').setFontWeight('bold');
      }
      
      row = [
        params.email || '',
        timestamp
      ];
      
      sheet.appendRow(row);
      Logger.log('Newsletter email added: ' + params.email);
      
    } else if (type === 'contact') {
      // Contact form submission - using your existing "Contacts" sheet with your column order
      sheet = ss.getSheetByName('Contacts');
      
      if (!sheet) {
        // If sheet doesn't exist, create it with your structure
        sheet = ss.insertSheet('Contacts');
        sheet.appendRow(['Name', 'Email', 'Phone', 'Message', 'Timestamp']);
        sheet.getRange('A1:E1').setFontWeight('bold');
      }
      
      row = [
        params.name || '',
        params.email || '',
        params.phone || '',
        params.message || '',
        timestamp
      ];
      
      sheet.appendRow(row);
      Logger.log('Contact form added: ' + params.name);
    }
    
    // Handle JSONP callback
    const callback = params.callback || e.parameter.callback;
    const response = {
      success: true,
      message: type === 'email' ? 'Thank you for subscribing!' : 'Your message has been sent!',
      type: type
    };
    
    if (callback) {
      // JSONP response
      return ContentService
        .createTextOutput(callback + '(' + JSON.stringify(response) + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      // Regular JSON response
      return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    
    const callback = e.parameter.callback;
    const errorResponse = {
      success: false,
      message: 'An error occurred. Please try again.',
      error: error.toString()
    };
    
    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + JSON.stringify(errorResponse) + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify(errorResponse))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
}
