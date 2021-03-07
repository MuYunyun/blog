/* eslint-disable no-empty */
// seo: perf inject logic only once
const inject = () => {
  // SEO for Google through https://search.google.com/search-console/welcome
  const meta = document.createElement('meta')
  meta.name = 'google-site-verification'
  meta.content = '7fyp1NuvXSRLM9KpMq5_YNE_0zFZkPnuV-SbVVFgWbI'
  document.head.appendChild(meta)
}

module.exports = { inject }
