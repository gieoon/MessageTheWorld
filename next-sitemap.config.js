/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.shotuquietly.xyz', //process.env.SITE_URL || 
    generateRobotsTxt: true,
    exclude: ['/login'],
}