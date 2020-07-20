module.exports = {
  siteTitle: 'nact', // Site title.
  siteTitleAlt: {
    en_uk: 'nact ⇒ node.js + actors ⇒ your services have never been so µ ', // Alternative site title for SEO.
    ko_kr: '진정한 마이크로서비스가 되는 방법'
  },
  siteLogo: '/logos/logo.svg', // Logo used for SEO and manifest.
  siteUrl: 'https://nact.io', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'Site for the Nact project.',
  siteRss: '/rss.xml', // Path to the RSS file.
  postDefaultCategoryID: 'Nact', // Default category for posts.
  themeColor: '#FC5B5B', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffe8e8', // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: {
    en_uk: [undefined, 'Introduction', 'Core Concepts', 'Persistence', 'Production'],
    ko_kr: [undefined, '소개', '핵심 개념', '퍼시스턴스', '실무']
  },
  headers: {
    en_uk: { blog: 'Blog', language: 'Language', community: 'Community', github: 'Github' },
    ko_kr: { blog: '블로그', language: '언어', community: '커뮤니티', github: 'Github' }
  }
};
