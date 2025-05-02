// Function URLs configuration

const BASE_URL_EMULATOR = "http://127.0.0.1:5001/speechbuddy-30390/us-central1";
const BASE_URL_PRODUCTION =
  "https://us-central1-speechbuddy-30390.cloudfunctions.net";

const FUNCTION_URLS = {
  processURL: `${BASE_URL_PRODUCTION}/processURL`,
  submitSession: `${BASE_URL_PRODUCTION}/submitSession`,
  createCustomerSession: `${BASE_URL_PRODUCTION}/createCustomerSession`,
  sendInvitationEmail: `${BASE_URL_PRODUCTION}/sendInvitationEmail`,
  webhooks: `${BASE_URL_PRODUCTION}/webhooks`,
  createToken: `${BASE_URL_PRODUCTION}/createToken`,
  createCustomer: `${BASE_URL_PRODUCTION}/createCustomer`,
  getSubscriptions: `${BASE_URL_PRODUCTION}/getSubscriptions`,
};

// Export the URLs
window.FUNCTION_URLS = FUNCTION_URLS;
