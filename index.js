const { google } = require('googleapis');
require('dotenv').config();  // Load environment variables

// Load the service account key from the path specified in the environment variable
const key = require(process.env.KEY_PATH);

// Define the scopes required for updating Gmail signatures
const scopes = [
    'https://www.googleapis.com/auth/gmail.settings.sharing',
    'https://www.googleapis.com/auth/gmail.settings.basic'
];

// Load email, image URL, and link from environment variables
const email = process.env.EMAIL;
const imageUrl = process.env.IMAGE_URL;
const imageLink = process.env.IMAGE_LINK;

// Authenticate as the service account
const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    scopes,
    email  // The email of the user whose signature you want to update
);

// Initialize the Gmail API client
const gmail = google.gmail({ version: 'v1', auth });

// Function to update Gmail signature
async function updateSignature() {
    try {
        const res = await gmail.users.settings.sendAs.update({
            userId: 'me',
            sendAsEmail: email,
            requestBody: {
                signature: `<div><a href="${imageLink}" target="_blank"><img src="${imageUrl}" alt="Signature Image" style="width: 382px;"></a></div>`
            }
        });
        console.log('Signature updated:', res.data);
    } catch (error) {
        console.error('Error updating signature:', error);
    }
}

// Call the function to update the signature
updateSignature();
