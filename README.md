# Teus Group Email Footer Manager
A Node.js-based tool for managing and updating personalized email footers in Gmail accounts for multiple users. The application leverages the Gmail API to programmatically update email signatures, ensuring consistency and branding across all users in the organization.

## Features:
- Dynamic Email Signatures: Create and update HTML-based email footers for users with custom branding, clickable QR codes, and personalized details.
- Batch Updates: Manage multiple user accounts and update their email signatures in bulk using a JSON configuration file.
- Customizable Design: Use HTML and inline CSS to implement unique footer designs, including background images, QR codes, logos, and more.
- Google API Integration: Securely authenticate and interact with Gmail accounts using a Google Service Account and OAuth 2.0.
- Retry Mechanism: Automatically retries failed updates for improved reliability.
- Environment-Based Configuration: Securely store API keys, email addresses, and image URLs using environment variables.
## Requirements:
- Node.js and npm installed on your system.
- Gmail API enabled with a Google Service Account.
- A JSON key file for the service account.
- User list stored in a users.json file with email addresses and personalized image links.
## License:
This project is licensed under the MIT License.
