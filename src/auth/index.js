const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SPACE_DELIMITER = "%20";
const SCOPES = [
    "user-top-read",
    "user-read-private",
    "user-library-read",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
]

module.exports = { CLIENT_ID, CLIENT_SECRET, AUTHORIZE_URL, REDIRECT_URI, SPACE_DELIMITER, SCOPES };