const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

/*
 * Google Identity Services setup:
 * 1) Replace GOOGLE_CLIENT_ID below with your OAuth 2.0 Web client ID.
 * 2) Add your published GitHub Pages origin to Authorized JavaScript origins.
 * 3) This static demo only displays the signed-in profile. It does NOT securely
 *    verify the ID token or grant admin access. Use a backend/Firebase Auth for that.
 */
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const googleButton = document.getElementById("googleButton");
const signinStatus = document.getElementById("signinStatus");

function decodeGoogleProfileForDisplay(jwt) {
  try {
    const payload = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(payload);
    const bytes = Uint8Array.from(decoded, c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) {
    return null;
  }
}

function handleGoogleCredentialResponse(response) {
  // For display only. Never use this client-side decode to authorize admin actions.
  const profile = decodeGoogleProfileForDisplay(response.credential);
  if (!profile) {
    signinStatus.textContent = "Google responded, but the profile could not be displayed.";
    return;
  }
  signinStatus.textContent = `Signed in as ${profile.name || "Google user"} (${profile.email || "email unavailable"}). Demo only — server verification is not configured.`;
}

window.addEventListener("load", () => {
  if (GOOGLE_CLIENT_ID.startsWith("YOUR_")) {
    googleButton.innerHTML = '<p class="signin-note">Google sign-in setup required: replace <code>YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com</code> in <code>script.js</code> with your real Web client ID.</p>';
    return;
  }
  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    googleButton.innerHTML = '<p class="signin-note">Google sign-in library did not load. Check your internet connection and reload.</p>';
    return;
  }
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredentialResponse
  });
  window.google.accounts.id.renderButton(googleButton, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "signin_with",
    shape: "pill",
    width: 280
  });
});
