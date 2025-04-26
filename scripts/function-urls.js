// Function URLs configuration

const BASE_URL = "http://127.0.0.1:5001/speechbuddy-30390/us-central1";

const FUNCTION_URLS = {
  processURL: `${BASE_URL}/processURL`,
  submitSession: `${BASE_URL}/submitSession`,
  createCustomerSession: `${BASE_URL}/createCustomerSession`,
  sendInvitationEmail: `${BASE_URL}/sendInvitationEmail`,
  webhooks: `${BASE_URL}/webhooks`,
  createToken: `${BASE_URL}/createToken`,
  createCustomer: `${BASE_URL}/createCustomer`,
  getSubscriptions: `${BASE_URL}/getSubscriptions`,
};

// Export the URLs
window.FUNCTION_URLS = FUNCTION_URLS;
