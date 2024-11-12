const { google } = require('googleapis');
require('dotenv').config(); // Load environment variables

// Ensure required environment variables are present
if (!process.env.KEY_PATH || !process.env.IMAGE_LINK) {
    console.error("Error: Missing required environment variables (KEY_PATH, IMAGE_LINK).");
    process.exit(1); // Exit if environment variables are missing
}

// Load the service account key from the specified path
const key = require(process.env.KEY_PATH);

// Define the scopes required for updating Gmail signatures
const scopes = [
    'https://www.googleapis.com/auth/gmail.settings.sharing',
    'https://www.googleapis.com/auth/gmail.settings.basic'
];

// Load the clickable link from environment variables
const imageLink = process.env.IMAGE_LINK;

// Load users from an external JSON file (e.g., './users.json')
const usersFilePath = './users.json';
const users = require(usersFilePath);

// Function to create an authenticated Gmail client for each user
function getGmailClientForUser(userEmail) {
    const auth = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        scopes,
        userEmail // Act on behalf of this user
    );

    return google.gmail({ version: 'v1', auth });
}

// Function to update Gmail signature for a single user
async function updateSignature(email, imageUrl) {
    const gmail = getGmailClientForUser(email); // Create a client for each user

    try {
        const res = await gmail.users.settings.sendAs.update({
            userId: 'me',
            sendAsEmail: email,
            requestBody: {
                signature: `<div><a href="${imageLink}" target="_blank"><img src="${imageUrl}" alt="Signature Image" style="width: 382px;"></a></div>`
            }
        });
        console.log(`Signature updated for ${email}:`, res.data);
    } catch (error) {
        console.error(`Error updating signature for ${email}:`, error);
    }
}

// Loop through each user and update their signature
async function updateSignaturesForAllUsers() {
    for (const user of users) {
        const { email, image_url: imageUrl } = user;
        console.log(`Updating signature for ${email}...`);
        await updateSignature(email, imageUrl);
    }
}

// Start the update process
updateSignaturesForAllUsers();
