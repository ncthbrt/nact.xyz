module.exports = {
  siteTitle: 'nact', // Site title.
  siteTitleAlt: 'nact ⇒ node.js + actors ⇒ your services have never been so µ ', // Alternative site title for SEO.
  siteLogo: '/logos/logo.svg', // Logo used for SEO and manifest.
  siteUrl: 'https://nact.io', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'Site for the Nact project.',
  siteRss: '/rss.xml', // Path to the RSS file.
  postDefaultCategoryID: 'Nact', // Default category for posts.
  themeColor: '#FC5B5B', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffe8e8', // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: [undefined, 'Introduction', 'Core Concepts', 'Persistence', 'Production'] // Used to generate the Table Of Contents. Index 0 should be blank.
};
