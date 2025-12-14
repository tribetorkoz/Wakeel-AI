
/**
 * خدمة إرسال البريد الإلكتروني الحقيقي
 * Real Email Sending Service using EmailJS REST API
 * 
 * ⚠️ FIX FOR "To Email" ERROR ⚠️
 * In your EmailJS Dashboard (as seen in your screenshot):
 * 1. Click on the "To Email" input box (the one outlined in red).
 * 2. Type exactly: {{to_email}}
 * 3. Save the template.
 * 
 * This connects the 'toEmail' variable from this code to the recipient field in EmailJS.
 */

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

// 👇 KEYS (Make sure these match your EmailJS Dashboard) 👇
const SERVICE_ID = "service_gcgk9p8"; 
const TEMPLATE_ID = "template_wwn7zkr"; 
const PUBLIC_KEY = "85_gBFHZ2idaToX5k"; 

export interface EmailResult {
  success: boolean;
  email: string;
  error?: string;
}

export const sendRealEmail = async (
  toEmail: string, 
  subject: string, 
  message: string,
  senderName: string
): Promise<EmailResult> => {
  try {
    const data = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        // --- Critical for sending to the right person ---
        to_email: toEmail,      // REQUIRED: You must write {{to_email}} in the "To Email" field in EmailJS dashboard

        // --- Mapped to match your screenshot's default variables ---
        title: subject,         // Maps to {{title}} in your subject line
        name: senderName,       // Maps to {{name}} in your template
        email: "agent@wakeel.ai", // Maps to {{email}} in Reply-To
        
        // --- Standard keys (keep these for backup) ---
        subject: subject,
        message: message,
        from_name: senderName
      }
    };

    console.log(`[EmailService] Sending to: ${toEmail} | Subject: ${subject}`);

    const response = await fetch(EMAILJS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true, email: toEmail };
    } else {
      const text = await response.text();
      console.error("EmailJS Error Response:", text);
      
      let friendlyError = text;
      if (text.includes("service ID not found")) {
        friendlyError = "Error: Invalid Service ID. Check services/emailService.ts";
      } else if (text.includes("template ID not found")) {
        friendlyError = "Error: Invalid Template ID. Check services/emailService.ts";
      } else if (text.includes("user ID not found") || text.includes("public key")) {
        friendlyError = "Error: Invalid Public Key. Check services/emailService.ts";
      }

      return { success: false, email: toEmail, error: friendlyError };
    }

  } catch (error) {
    console.error("Network Error:", error);
    return { success: false, email: toEmail, error: "Network/Connection Error" };
  }
};
