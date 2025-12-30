import { init, send } from '@emailjs/browser';

const SERVICE_ID = import.meta?.env?.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta?.env?.VITE_EMAILJS_PUBLIC_KEY;

let initialized = false;

export const ensureEmailInit = () => {
  if (!initialized && PUBLIC_KEY) {
    try {
      init(PUBLIC_KEY);
      initialized = true;
    } catch (e) {
      console.error('EmailJS init error:', e);
    }
  }
};

/**
 * Send an email via EmailJS
 * @param {string} templateId - EmailJS template ID
 * @param {object} params - template params
 * @returns {Promise}
 */
export const sendEmail = async (templateId, params) => {
  ensureEmailInit();
  if (!SERVICE_ID || !templateId || !PUBLIC_KEY) {
    const missing = {
      SERVICE_ID: !!SERVICE_ID,
      PUBLIC_KEY: !!PUBLIC_KEY,
      TEMPLATE_ID: !!templateId,
    };
    const msg = `Email not configured (missing env vars). Missing: ${Object.entries(missing)
      .filter(([, ok]) => !ok)
      .map(([k]) => k)
      .join(', ')}`;
    console.warn(msg, { params });
    throw new Error(msg);
  }

  // Allow overriding destination by passing to_email; otherwise handled in template
  try {
    const result = await send(SERVICE_ID, templateId, params);
    return result;
  } catch (err) {
    console.error('EmailJS send error:', err);
    throw err;
  }
};
