
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

interface VisitorData {
  deviceType: string;
  os: string;
  browser: string;
}

// Helper to get public IP
const getPublicIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return "Unknown IP";
  }
};

export const submitToWaitlist = async (data: WaitlistData): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log(`Submitting data:`, { ...data, timestamp: new Date().toISOString() });

    if (!DATABASE_URL) {
      console.warn("⚠️ No Database URL configured. Simulating success.");
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      return { success: true };
    }

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('source', 'landing_page_form');

    await fetch(DATABASE_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    return { success: true };

  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, message: "Network error occurred." };
  }
};

/**
 * Logs visitor device info AND IP ADDRESS automatically without user input.
 * Maps device info to existing sheet columns:
 * Name -> "Visitor: [DeviceType]"
 * Company -> "IP: [IP_ADDRESS] | [OS]"
 * Email -> "Auto-Log"
 */
export const logVisitorEntry = async (data: VisitorData): Promise<void> => {
  try {
    if (!DATABASE_URL) return;

    // 1. Fetch IP Address
    const ipAddress = await getPublicIP();

    // 2. Prepare Data
    const formData = new FormData();
    
    // Mapping tech data to the existing sheet columns
    formData.append('name', `Visitor: ${data.deviceType}`); 
    // We add the IP to the Company column so it is easily visible in the sheet
    formData.append('company', `IP: ${ipAddress} | OS: ${data.os} | Browser: ${data.browser}`);
    formData.append('email', 'Auto-Log (Traffic)'); 
    
    // 3. Send silently
    await fetch(DATABASE_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    
    console.log("Visitor device & IP logged securely.");

  } catch (error) {
    // Fail silently for background logging
    console.warn("Could not log visitor:", error);
  }
};
