# TSUNAMI GAMESTUDIO — GitHub Pages starter with Google sign-in button

## Files
- `index.html` — homepage and sign-in section
- `style.css` — responsive design
- `script.js` — mobile navigation and Google Identity Services button setup

## Publish on GitHub Pages
1. Upload `index.html`, `style.css`, and `script.js` to the root of your public `tsunami-gamestudio` repository.
2. Commit changes.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## Configure Google sign-in
1. Open Google Cloud Console: https://console.cloud.google.com/
2. Select/create a project and configure the OAuth consent screen / Google Auth Platform branding.
3. Create an OAuth client with application type **Web application**.
4. Add the website origin under **Authorized JavaScript origins**. For a project site, this is like `https://YOUR-USERNAME.github.io` (no repository path).
5. Copy the Web client ID.
6. In `script.js`, replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` with your actual client ID.
7. Commit the change and reload the published site.

Official setup guide: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

## Security limitation
This is a static-site demo. It displays the Google profile after the Google button returns a credential, but the browser-only code does not verify the ID token on a server. Do not use it to protect an admin dashboard, upload games, or grant permissions. For real account authentication, use Firebase Authentication or a backend that verifies Google ID tokens. Admin access must be enforced server-side. Never place a client secret, password, or private code in static website files.
