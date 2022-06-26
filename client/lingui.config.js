module.exports = {
   locales: ["en", "ru"],
   sourceLocale: 'en',
   catalogs: [
      {
         path: '<rootDir>/locale/{locale}/messages',
         include: ['<rootDir>/'],
         exclude: ['**/node_modules/**'],
      },
   ],
}
