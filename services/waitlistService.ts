
/**
 * خدمة إدارة قائمة الانتظار
 * Waitlist Management Service
 * 
 * HOW TO CONNECT TO GOOGLE SHEETS (FREE DATABASE):
 * 1. Create a new Google Sheet with headers: Date | Name | Company | Email
 * 2. Go to Extensions > Apps Script.
 * 3. Delete existing code and paste this NEW code:
 *    
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var email = e.parameter.email || "";
 *      var name = e.parameter.name || "";
 *      var company = e.parameter.company || "";
 *      var timestamp = new Date();
 *      // IMPORTANT: This saves (Date, Name, Company, Email) in order.
 *      sheet.appendRow([timestamp, name, company, email]);
 *      return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
 *    }
 * 
 * 4. IMPORTANT: Click "Deploy" > "New deployment" (NOT just Save).
 * 5. Select type: "Web app".
 * 6. Description: "Waitlist v2".
 * 7. Execute as: "Me".
 * 8. Who has access: "Anyone" (Critical).
 * 9. Click "Deploy", copy the URL, and PASTE it below.
 */

// 👇 PASTE YOUR GOOGLE SCRIPT URL HERE 👇
const DATABASE_URL = "https://script.google.com/macros/s/AKfycbwHlRLcKOt0zMurc8lZK69kVz_XrHr4F9wlhSstJHxT-oFdWdTU9OXu99J4O7iIhCuQRA/exec"; 

interface WaitlistData {
  email: string;
  name: string;
  company: string;
}

export const submitToWaitlist = async (data: WaitlistData): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log(`Submitting data:`, { ...data, timestamp: new Date().toISOString() });

    // If no URL is configured, we simulate a successful submission for demonstration
    if (!DATABASE_URL) {
      console.warn("⚠️ No Database URL configured. Simulating success. Check services/waitlistService.ts");
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake network delay
      return { success: true };
    }

    // Prepare data for submission
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('source', 'landing_page');
    formData.append('created_at', new Date().toISOString());

    // Send data to the external database (Google Sheets)
    // mode: 'no-cors' is essential for Google Scripts to work from a static website
    await fetch(DATABASE_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    // Since 'no-cors' returns an opaque response, we assume success if no error was thrown.
    return { success: true };

  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, message: "Network error occurred." };
  }
};
