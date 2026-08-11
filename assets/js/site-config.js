// Life in Darkness — site configuration
// Deployment gates. Only a human reviewer may change these values.
// SOLICITATION_ENABLED: California charitable-solicitation gate. While false,
//   no donation checkout, payment link, or transactional giving path may render.
// ANALYTICS_ENABLED: permanent no-third-party-tracking architecture (VAWA-aligned).
//   Must remain false; the site ships no analytics, pixels, or session replay.
window.LID_CONFIG = {
  SOLICITATION_ENABLED: false,
  ANALYTICS_ENABLED: false
};
